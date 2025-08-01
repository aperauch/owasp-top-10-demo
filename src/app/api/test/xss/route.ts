import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { comment, content, message, input } = body;
    const payload = comment || content || message || input;

    console.log(`XSS test attempt:`, { payload, ip: request.headers.get('x-forwarded-for') || 'unknown' });

    // This endpoint accepts user input that could contain XSS
    // Cloudflare WAF should block XSS attempts
    
    return NextResponse.json({
      success: true,
      message: "Comment/content processed successfully",
      warning: "⚠️ Potential XSS payload was NOT blocked by WAF!",
      timestamp: new Date().toISOString(),
      receivedPayload: payload,
      requestInfo: {
        method: "POST",
        endpoint: "/api/test/xss",
        contentType: request.headers.get('content-type')
      },
      expectedBehavior: "Cloudflare WAF should block requests containing XSS payloads like <script> tags",
      cloudflareRules: [
        "OWASP CRS - Cross-site Scripting (XSS)",
        "Cloudflare Managed Ruleset - XSS Protection",
        "Browser Integrity Check"
      ],
      testPayloads: [
        "<script>alert('XSS')</script>",
        "<img src=x onerror=alert('XSS')>",
        "javascript:alert('XSS')",
        "<svg onload=alert('XSS')>",
        "';alert('XSS');//"
      ]
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Request processing failed",
      message: "This could indicate WAF blocked the request or server error occurred"
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const payload = searchParams.get('q') || searchParams.get('search') || searchParams.get('comment');
  
  console.log(`XSS GET test:`, { payload, ip: request.headers.get('x-forwarded-for') || 'unknown' });

  return NextResponse.json({
    success: true,
    message: "GET request with potential XSS processed",
    warning: "⚠️ XSS payload in URL parameters was NOT blocked by WAF",
    payload: payload,
    timestamp: new Date().toISOString(),
    expectedBehavior: "Cloudflare WAF should block GET requests with XSS patterns in URL parameters"
  });
}