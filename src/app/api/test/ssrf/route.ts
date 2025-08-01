import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, webhook, callback, redirect } = body;
    const targetUrl = url || webhook || callback || redirect;

    console.log(`SSRF test attempt:`, { targetUrl, ip: request.headers.get('x-forwarded-for') || 'unknown' });

    // This endpoint would make outbound requests based on user input
    // Cloudflare WAF should detect and block SSRF attempts
    
    return NextResponse.json({
      success: true,
      message: "URL request processed successfully",
      warning: "⚠️ Potential SSRF request was NOT blocked by WAF!",
      timestamp: new Date().toISOString(),
      targetUrl: targetUrl,
      requestInfo: {
        method: "POST",
        endpoint: "/api/test/ssrf",
        userAgent: request.headers.get('user-agent')
      },
      expectedBehavior: "Cloudflare WAF should block requests targeting internal/private IP addresses",
      dangerousPatterns: [
        "localhost", "127.0.0.1", "0.0.0.0",
        "192.168.", "10.", "172.16-31.",
        "169.254.169.254", // AWS metadata
        "metadata.google.internal", // GCP metadata
        "::1", "[::1]" // IPv6 localhost
      ],
      cloudflareRules: [
        "OWASP CRS - Server-Side Request Forgery (SSRF)",
        "Cloudflare Managed Ruleset - SSRF Protection",
        "Custom rules blocking internal IP ranges"
      ]
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Request processing failed",
      message: "WAF may have blocked this request or server error occurred"
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const targetUrl = searchParams.get('url') || searchParams.get('callback') || searchParams.get('redirect');
  
  console.log(`SSRF GET test:`, { targetUrl, ip: request.headers.get('x-forwarded-for') || 'unknown' });

  return NextResponse.json({
    success: true,
    message: "GET request with potential SSRF processed",
    warning: "⚠️ SSRF payload in URL parameters was NOT blocked by WAF",
    targetUrl: targetUrl,
    timestamp: new Date().toISOString(),
    expectedBehavior: "Cloudflare WAF should block requests with internal URLs in parameters"
  });
}