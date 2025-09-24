export interface WAFTestResult {
  success: boolean;
  blocked: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  responseTime: number;
  cloudflareRay?: string;
  error?: string;
  response?: any;
  blockingIndicators?: {
    statusCodeBlocked: boolean;
    cloudflareServerHeader: boolean;
    cloudflareRayHeader: boolean;
    networkError: boolean;
    statusCodes?: number[];
  };
}

export interface WAFTestPayload {
  method: 'GET' | 'POST';
  endpoint: string;
  data?: any;
  params?: Record<string, string | undefined>;
  headers?: Record<string, string>;
}

export class WAFTester {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async testPayload(payload: WAFTestPayload): Promise<WAFTestResult> {
    const startTime = Date.now();
    
    try {
      let url = `${this.baseUrl}${payload.endpoint}`;
      
      // Add query parameters for GET requests
      if (payload.method === 'GET' && payload.params) {
        const filteredParams = Object.fromEntries(
          Object.entries(payload.params).filter(([_, value]) => value !== undefined)
        ) as Record<string, string>;
        const searchParams = new URLSearchParams(filteredParams);
        url += `?${searchParams.toString()}`;
      }

      const requestOptions: RequestInit = {
        method: payload.method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'OWASP-Top-10-WAF-Tester/1.0',
          ...payload.headers
        }
      };

      if (payload.method === 'POST' && payload.data) {
        requestOptions.body = JSON.stringify(payload.data);
      }

      const response = await fetch(url, requestOptions);
      const responseTime = Date.now() - startTime;
      
      // Check if request was blocked by Cloudflare WAF
      const blockingDetails = this.getBlockingDetails(response);
      
      let responseData;
      try {
        responseData = await response.json();
      } catch {
        responseData = await response.text();
      }

      return {
        success: response.ok,
        blocked: blockingDetails.isBlocked,
        statusCode: response.status,
        message: blockingDetails.isBlocked ? 'Request blocked by WAF' : 'Request processed by server',
        timestamp: new Date().toISOString(),
        responseTime,
        cloudflareRay: response.headers.get('cf-ray') || undefined,
        response: responseData,
        blockingIndicators: blockingDetails.indicators
      };

    } catch (error) {
      const responseTime = Date.now() - startTime;
      const isNetworkError = this.isNetworkError(error);
      
      return {
        success: false,
        blocked: isNetworkError,
        statusCode: 0,
        message: 'Request failed - possibly blocked by WAF',
        timestamp: new Date().toISOString(),
        responseTime,
        error: error instanceof Error ? error.message : 'Unknown error',
        blockingIndicators: {
          statusCodeBlocked: false,
          cloudflareServerHeader: false,
          cloudflareRayHeader: false,
          networkError: isNetworkError
        }
      };
    }
  }

  private getBlockingDetails(response: Response): { isBlocked: boolean; indicators: any } {
    const statusCodeBlocked = response.status === 403 || response.status === 406 || response.status === 429;
    const cloudflareServerHeader = response.headers.get('server')?.includes('cloudflare') === true;
    const cloudflareRayHeader = response.headers.get('cf-ray') !== null;
    
    const blockedStatusCodes = [];
    if (response.status === 403) blockedStatusCodes.push(403);
    if (response.status === 406) blockedStatusCodes.push(406);
    if (response.status === 429) blockedStatusCodes.push(429);
    
    // Only consider a request blocked if it has a blocking status code
    // Cloudflare headers alone don't indicate blocking - they're present on all CF responses
    const isBlocked = statusCodeBlocked;
    
    return {
      isBlocked,
      indicators: {
        statusCodeBlocked,
        cloudflareServerHeader,
        cloudflareRayHeader,
        networkError: false,
        statusCodes: blockedStatusCodes.length > 0 ? blockedStatusCodes : undefined
      }
    };
  }

  private isNetworkError(error: any): boolean {
    // Network errors might indicate WAF blocking
    return (
      error instanceof TypeError ||
      (error instanceof Error && (
        error.message?.includes('fetch') ||
        error.message?.includes('network') ||
        error.message?.includes('CORS')
      ))
    );
  }

  // Pre-built test payloads for different vulnerability types
  static getTestPayloads() {
    return {
      sqlInjection: [
        {
          name: "Classic SQL Injection",
          method: 'POST' as const,
          endpoint: '/api/test/sql-injection',
          data: { username: "admin' OR '1'='1' --", password: "test" }
        },
        {
          name: "UNION-based SQL Injection",
          method: 'POST' as const,
          endpoint: '/api/test/sql-injection',
          data: { query: "1' UNION SELECT username,password FROM users--" }
        },
        {
          name: "SQL Injection via GET",
          method: 'GET' as const,
          endpoint: '/api/test/sql-injection',
          params: { id: "1' OR '1'='1' --" }
        }
      ],
      xss: [
        {
          name: "Script Tag XSS",
          method: 'POST' as const,
          endpoint: '/api/test/xss',
          data: { comment: "<script>alert('XSS')</script>" }
        },
        {
          name: "Event Handler XSS",
          method: 'POST' as const,
          endpoint: '/api/test/xss',
          data: { content: "<img src=x onerror=alert('XSS')>" }
        },
        {
          name: "JavaScript URL XSS",
          method: 'GET' as const,
          endpoint: '/api/test/xss',
          params: { q: "javascript:alert('XSS')" }
        }
      ],
      ssrf: [
        {
          name: "Localhost SSRF",
          method: 'POST' as const,
          endpoint: '/api/test/ssrf',
          data: { url: "http://localhost:22" }
        },
        {
          name: "Private IP SSRF",
          method: 'POST' as const,
          endpoint: '/api/test/ssrf',
          data: { webhook: "http://192.168.1.1/admin" }
        },
        {
          name: "Cloud Metadata SSRF",
          method: 'GET' as const,
          endpoint: '/api/test/ssrf',
          params: { callback: "http://169.254.169.254/latest/meta-data/" }
        }
      ],
      pathTraversal: [
        {
          name: "Directory Traversal",
          method: 'GET' as const,
          endpoint: '/api/test/path-traversal',
          params: { file: "../../../../etc/passwd" }
        },
        {
          name: "Windows Path Traversal",
          method: 'GET' as const,
          endpoint: '/api/test/path-traversal',
          params: { path: "..\\..\\..\\windows\\system32\\drivers\\etc\\hosts" }
        },
        {
          name: "Config File Access",
          method: 'POST' as const,
          endpoint: '/api/test/path-traversal',
          data: { include: "../../../.env" }
        }
      ],
      commandInjection: [
        {
          name: "Shell Command Injection",
          method: 'POST' as const,
          endpoint: '/api/test/command-injection',
          data: { command: "ls -la; cat /etc/passwd" }
        },
        {
          name: "Pipe Command Injection",
          method: 'POST' as const,
          endpoint: '/api/test/command-injection',
          data: { input: "test | whoami" }
        },
        {
          name: "Backtick Command Injection",
          method: 'GET' as const,
          endpoint: '/api/test/command-injection',
          params: { cmd: "`id`" }
        }
      ]
    };
  }
}