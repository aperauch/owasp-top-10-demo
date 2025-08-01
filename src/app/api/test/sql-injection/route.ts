import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, username, password } = body;

    // Log the attempt for educational purposes
    console.log(`SQL Injection test attempt:`, { query, username, password, ip: request.headers.get('x-forwarded-for') || 'unknown' });

    // This endpoint is designed to be vulnerable to SQL injection
    // The Cloudflare WAF should block malicious SQL injection attempts
    
    // Return success if request gets through (WAF not blocking)
    return NextResponse.json({
      success: true,
      message: "Request processed successfully",
      warning: "⚠️ This request was NOT blocked by WAF - Check your Cloudflare security settings!",
      timestamp: new Date().toISOString(),
      requestData: {
        query: query || username,
        method: "POST",
        endpoint: "/api/test/sql-injection"
      },
      expectedBehavior: "Cloudflare WAF should have blocked this request if it contained SQL injection patterns",
      cloudflareRules: [
        "OWASP CRS - SQL Injection Attacks",
        "Cloudflare Managed Ruleset - SQL Injection",
        "Rate limiting rules for suspicious patterns"
      ]
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Request processing failed",
      message: "This could indicate WAF is working or there was a server error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || searchParams.get('search') || searchParams.get('id');
  
  console.log(`SQL Injection GET test:`, { query, ip: request.headers.get('x-forwarded-for') || 'unknown' });

  return NextResponse.json({
    success: true,
    message: "GET request processed",
    warning: "⚠️ GET request with potential SQL injection was NOT blocked by WAF",
    query: query,
    timestamp: new Date().toISOString(),
    expectedBehavior: "Cloudflare WAF should block GET requests with SQL injection patterns in query parameters"
  });
}