'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SSRFPage() {
  const [url, setUrl] = useState('');
  const [ssrfResult, setSSRFResult] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookResult, setWebhookResult] = useState('');

  const handleSSRFDemo = () => {
    if (!url) {
      setSSRFResult('Please enter a URL');
      return;
    }

    let result = '';
    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes('localhost') || lowerUrl.includes('127.0.0.1') || 
        lowerUrl.includes('192.168.') || lowerUrl.includes('10.') || 
        lowerUrl.includes('172.') || lowerUrl.includes('169.254.') ||
        lowerUrl.includes('metadata') || lowerUrl.includes('internal')) {
      
      result = `⚠️ POTENTIAL SSRF ATTACK DETECTED!

Target URL: ${url}

SECURITY RISKS IDENTIFIED:
${lowerUrl.includes('localhost') || lowerUrl.includes('127.0.0.1') ? '- Localhost/Loopback access attempt' : ''}
${lowerUrl.includes('192.168.') || lowerUrl.includes('10.') || lowerUrl.includes('172.') ? '- Private network access attempt' : ''}
${lowerUrl.includes('169.254.') ? '- Link-local/APIPA address access attempt' : ''}
${lowerUrl.includes('metadata') ? '- Cloud metadata service access attempt' : ''}
${lowerUrl.includes('internal') ? '- Internal service access attempt' : ''}

POTENTIAL IMPACT:
- Access to internal services and APIs
- Cloud metadata service exploitation (AWS, Azure, GCP)
- Internal network reconnaissance
- Bypass of firewall restrictions
- Access to sensitive configuration data
- Potential code execution on internal systems

SIMULATED RESPONSE:
HTTP/1.1 200 OK
Content-Type: text/plain

Internal server data that should not be accessible...
Database connection strings, API keys, etc.`;

    } else if (lowerUrl.startsWith('file://') || lowerUrl.startsWith('ftp://') || 
               lowerUrl.startsWith('gopher://') || lowerUrl.startsWith('dict://')) {
      
      result = `⚠️ DANGEROUS PROTOCOL DETECTED!

URL: ${url}
Protocol: ${lowerUrl.split('://')[0]}

RISKS:
- File system access (file://)
- Legacy protocol exploitation
- Potential for reading local files
- Bypass of HTTP-only restrictions

This could allow access to:
- /etc/passwd
- Configuration files
- Application source code
- Database files`;

    } else {
      result = `URL appears safe for external requests: ${url}

In a real application, this would:
1. Validate the URL against an allowlist
2. Restrict access to internal networks
3. Implement proper timeout and rate limiting
4. Log all outbound requests for monitoring`;
    }

    setSSRFResult(result);
  };

  const handleWebhookDemo = () => {
    if (!webhookUrl) {
      setWebhookResult('Please enter a webhook URL');
      return;
    }

    const lowerUrl = webhookUrl.toLowerCase();
    let result = '';

    if (lowerUrl.includes('localhost') || lowerUrl.includes('127.0.0.1') || 
        lowerUrl.includes('192.168.') || lowerUrl.includes('10.') || 
        lowerUrl.includes('172.') || lowerUrl.includes('169.254.')) {
      
      result = `⚠️ SSRF VIA WEBHOOK DETECTED!

Webhook URL: ${webhookUrl}

ATTACK VECTOR:
- Webhook functionality abused for SSRF
- Internal network access via webhook callback
- Potential for blind SSRF attacks

PAYLOAD BEING SENT:
POST ${webhookUrl}
Content-Type: application/json

{
  "event": "user_registration",
  "user_id": "12345",
  "timestamp": "${new Date().toISOString()}",
  "sensitive_data": "This could contain internal system information"
}

RISKS:
- Internal service enumeration
- Data exfiltration via webhook callbacks
- Triggering internal processes
- Information disclosure about internal systems`;

    } else {
      result = `Webhook URL: ${webhookUrl}

This appears to be an external URL. In a secure implementation:
- Validate webhook URLs against allowlist
- Restrict to HTTPS only
- Implement proper authentication
- Rate limit webhook calls
- Monitor and log all webhook activities`;
    }

    setWebhookResult(result);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          ← Back to OWASP Top 10
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          A10:2021 - Server-Side Request Forgery (SSRF)
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-red-900 mb-2">
            🚨 Medium-High Risk Vulnerability
          </h2>
          <p className="text-red-800">
            SSRF flaws occur when a web application fetches a remote resource without validating the user-supplied URL. 
            This allows attackers to force the application to send crafted requests to unexpected destinations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🌐 URL Fetch SSRF Demo
          </h3>
          <p className="text-gray-600 mb-4">
            Try entering internal URLs to see how SSRF attacks work:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL to Fetch (try: http://localhost:8080/admin)
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com or http://localhost:8080"
              />
            </div>
            <div className="text-xs text-gray-500">
              <p className="font-semibold">Try these payloads:</p>
              <ul className="mt-1 space-y-1">
                <li>• http://localhost:22 (SSH)</li>
                <li>• http://127.0.0.1:3306 (MySQL)</li>
                <li>• http://192.168.1.1/admin</li>
                <li>• http://169.254.169.254/metadata (AWS)</li>
                <li>• file:///etc/passwd</li>
              </ul>
            </div>
            <button
              onClick={handleSSRFDemo}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Fetch URL
            </button>
            {ssrfResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{ssrfResult}</pre>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🪝 Webhook SSRF Demo
          </h3>
          <p className="text-gray-600 mb-4">
            Webhooks can be abused for SSRF attacks:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL (try: http://localhost:9200/_cluster/health)
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://your-webhook.com/callback"
              />
            </div>
            <div className="text-xs text-gray-500">
              <p className="font-semibold">Internal service examples:</p>
              <ul className="mt-1 space-y-1">
                <li>• http://localhost:9200 (Elasticsearch)</li>
                <li>• http://127.0.0.1:6379 (Redis)</li>
                <li>• http://10.0.0.1:8080/metrics</li>
                <li>• http://192.168.1.100/api/status</li>
              </ul>
            </div>
            <button
              onClick={handleWebhookDemo}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Register Webhook
            </button>
            {webhookResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{webhookResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 SSRF Attack Scenarios
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">1. Internal Network Scanning</h4>
              <p>Scan internal IP ranges to discover services and applications.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">2. Cloud Metadata Access</h4>
              <p>Access cloud provider metadata services (AWS, Azure, GCP) for credentials.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">3. Local File Access</h4>
              <p>Use file:// protocol to read sensitive local files.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">4. Protocol Smuggling</h4>
              <p>Use protocols like gopher:// to interact with internal services.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">5. Bypass Security Controls</h4>
              <p>Access internal APIs that are protected by network-level security.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">6. Data Exfiltration</h4>
              <p>Send sensitive data to attacker-controlled external servers.</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            🛡️ SSRF Prevention Strategies
          </h3>
          <div className="space-y-4 text-sm text-green-800">
            <div>
              <h4 className="font-semibold text-green-900">Input Validation:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Whitelist allowed domains and protocols</li>
                <li>Validate and sanitize all user-supplied URLs</li>
                <li>Reject private IP addresses and localhost</li>
                <li>Block dangerous protocols (file://, gopher://)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Network-Level Controls:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Implement egress filtering and firewall rules</li>
                <li>Use separate network segments for application servers</li>
                <li>Disable unused protocols and services</li>
                <li>Monitor and log all outbound requests</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Application Security:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Use allow-lists for destination URLs</li>
                <li>Implement request timeouts and rate limiting</li>
                <li>Disable HTTP redirects or validate redirect destinations</li>
                <li>Use dedicated proxy servers for external requests</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🔍 WAF SSRF Detection Rules
        </h3>
        <p className="text-blue-800 mb-4">
          Configure your WAF to detect these SSRF attack patterns:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900">URL Pattern Detection:</h4>
            <ul className="font-mono text-blue-700 mt-2 space-y-1">
              <li>localhost, 127.0.0.1</li>
              <li>192.168.x.x, 10.x.x.x, 172.16-31.x.x</li>
              <li>169.254.169.254 (metadata)</li>
              <li>file://, gopher://, dict://</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">Parameter Analysis:</h4>
            <ul className="font-mono text-blue-700 mt-2 space-y-1">
              <li>url=, callback=, webhook=</li>
              <li>fetch=, proxy=, redirect=</li>
              <li>load=, import=, include=</li>
              <li>Any parameter containing URLs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}