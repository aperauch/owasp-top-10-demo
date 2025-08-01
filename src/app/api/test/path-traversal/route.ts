import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const file = searchParams.get('file') || searchParams.get('path') || searchParams.get('include');
  
  console.log(`Path Traversal test:`, { file, ip: request.headers.get('x-forwarded-for') || 'unknown' });

  return NextResponse.json({
    success: true,
    message: "File access request processed",
    warning: "⚠️ Path traversal attempt was NOT blocked by WAF!",
    timestamp: new Date().toISOString(),
    requestedFile: file,
    requestInfo: {
      method: "GET",
      endpoint: "/api/test/path-traversal",
      referer: request.headers.get('referer')
    },
    expectedBehavior: "Cloudflare WAF should block requests with directory traversal patterns",
    dangerousPatterns: [
      "../", "..\\", "....//", "....\\\\",
      "%2e%2e%2f", "%2e%2e%5c", // URL encoded
      "/etc/passwd", "/etc/shadow", "/etc/hosts",
      "C:\\Windows\\System32\\", "C:/Windows/System32/",
      ".env", "web.config", "wp-config.php"
    ],
    cloudflareRules: [
      "OWASP CRS - Path Traversal",
      "Cloudflare Managed Ruleset - Directory Traversal",
      "File inclusion attack patterns"
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filename, filepath, include, require } = body;
    const path = filename || filepath || include || require;

    console.log(`Path Traversal POST test:`, { path, ip: request.headers.get('x-forwarded-for') || 'unknown' });

    return NextResponse.json({
      success: true,
      message: "File operation request processed",
      warning: "⚠️ POST request with path traversal was NOT blocked by WAF!",
      requestedPath: path,
      timestamp: new Date().toISOString(),
      expectedBehavior: "Cloudflare WAF should block POST requests containing directory traversal patterns"
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Request processing failed"
    }, { status: 500 });
  }
}