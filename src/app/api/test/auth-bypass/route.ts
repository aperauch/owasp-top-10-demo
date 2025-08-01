import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, token, role, admin } = body;

    console.log(`Auth Bypass test:`, { username, role, admin, ip: request.headers.get('x-forwarded-for') || 'unknown' });

    // Simulate authentication bypass attempts
    // WAF should detect suspicious authentication patterns
    
    return NextResponse.json({
      success: true,
      message: "Authentication request processed",
      warning: "⚠️ Potential authentication bypass was NOT blocked by WAF!",
      timestamp: new Date().toISOString(),
      authData: { username, role, admin },
      requestInfo: {
        method: "POST",
        endpoint: "/api/test/auth-bypass"
      },
      expectedBehavior: "Cloudflare WAF should detect suspicious authentication patterns",
      suspiciousPatterns: [
        "SQL injection in auth fields",
        "Role manipulation attempts",
        "Token tampering",
        "Admin privilege escalation",
        "Authentication bypass strings"
      ],
      cloudflareRules: [
        "OWASP CRS - Authentication Bypass",
        "Cloudflare Rate Limiting - Login attempts",
        "Bot Management - Credential stuffing"
      ],
      testScenarios: [
        "username: admin' OR '1'='1' --",
        "role: administrator",
        "admin: true",
        "bypass: authentication"
      ]
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Authentication failed"
    }, { status: 401 });
  }
}

// Simulate brute force login attempts
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const attempts = parseInt(searchParams.get('attempts') || '1');
  
  console.log(`Brute Force test:`, { attempts, ip: request.headers.get('x-forwarded-for') || 'unknown' });

  return NextResponse.json({
    success: true,
    message: `Login attempt ${attempts} processed`,
    warning: attempts > 5 ? "⚠️ Brute force attack pattern NOT blocked by WAF!" : "Login attempt logged",
    attempts: attempts,
    timestamp: new Date().toISOString(),
    expectedBehavior: "Cloudflare WAF should rate limit excessive login attempts from same IP"
  });
}