'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WAFTester, WAFTestResult } from '@/lib/waf-tester';

export default function InjectionPage() {
  const [sqlPayload, setSqlPayload] = useState('');
  const [sqlResult, setSqlResult] = useState<WAFTestResult | null>(null);
  const [xssPayload, setXssPayload] = useState('');
  const [xssResult, setXssResult] = useState<WAFTestResult | null>(null);
  const [isTestingSQL, setIsTestingSQL] = useState(false);
  const [isTestingXSS, setIsTestingXSS] = useState(false);

  const wafTester = new WAFTester();

  const handleSQLTest = async () => {
    if (!sqlPayload.trim()) {
      alert('Please enter a SQL injection payload to test');
      return;
    }

    setIsTestingSQL(true);
    try {
      const result = await wafTester.testPayload({
        method: 'POST',
        endpoint: '/api/test/sql-injection',
        data: { username: sqlPayload, password: 'test123' }
      });
      setSqlResult(result);
    } catch (error) {
      setSqlResult({
        success: false,
        blocked: true,
        statusCode: 0,
        message: 'Request failed - likely blocked by WAF',
        timestamp: new Date().toISOString(),
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsTestingSQL(false);
    }
  };

  const handleXSSTest = async () => {
    if (!xssPayload.trim()) {
      alert('Please enter an XSS payload to test');
      return;
    }

    setIsTestingXSS(true);
    try {
      const result = await wafTester.testPayload({
        method: 'POST',
        endpoint: '/api/test/xss',
        data: { comment: xssPayload }
      });
      setXssResult(result);
    } catch (error) {
      setXssResult({
        success: false,
        blocked: true,
        statusCode: 0,
        message: 'Request failed - likely blocked by WAF',
        timestamp: new Date().toISOString(),
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsTestingXSS(false);
    }
  };

  const runQuickTests = async () => {
    // Test common SQL injection
    setSqlPayload("admin' OR '1'='1' --");
    await new Promise(resolve => setTimeout(resolve, 100));
    await handleSQLTest();
    
    // Test common XSS
    setXssPayload("<script>alert('XSS')</script>");
    await new Promise(resolve => setTimeout(resolve, 100));
    await handleXSSTest();
  };

  const renderTestResult = (result: WAFTestResult | null, testType: string) => {
    if (!result) return null;

    const isBlocked = result.blocked || result.statusCode === 403 || result.statusCode === 406;
    
    return (
      <div className={`border-2 rounded-md p-4 mt-4 ${
        isBlocked ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`font-semibold ${isBlocked ? 'text-green-800' : 'text-red-800'}`}>
            {isBlocked ? '✅ WAF PROTECTION WORKING' : '⚠️ WAF PROTECTION FAILED'}
          </span>
          <span className="text-sm text-gray-600">
            {result.responseTime}ms | Status: {result.statusCode}
          </span>
        </div>
        
        <div className="text-sm space-y-2">
          <div><strong>Result:</strong> {result.message}</div>
          {result.cloudflareRay && (
            <div><strong>Cloudflare Ray ID:</strong> {result.cloudflareRay}</div>
          )}
          <div><strong>Timestamp:</strong> {new Date(result.timestamp).toLocaleString()}</div>
          
          {!isBlocked && (
            <div className="bg-yellow-50 border border-yellow-300 rounded p-3 mt-3">
              <strong className="text-yellow-800">⚠️ Security Risk:</strong>
              <p className="text-yellow-700 text-sm mt-1">
                This {testType} payload was NOT blocked by your WAF. In a real application, this could lead to:
              </p>
              <ul className="text-yellow-700 text-sm mt-2 list-disc list-inside">
                {testType === 'SQL Injection' ? (
                  <>
                    <li>Database compromise and data theft</li>
                    <li>Authentication bypass</li>
                    <li>Administrative access</li>
                    <li>Data manipulation or deletion</li>
                  </>
                ) : (
                  <>
                    <li>User session hijacking</li>
                    <li>Cookie theft and impersonation</li>
                    <li>Website defacement</li>
                    <li>Malicious redirects</li>
                  </>
                )}
              </ul>
            </div>
          )}
          
          {isBlocked && (
            <div className="bg-green-50 border border-green-300 rounded p-3 mt-3">
              <strong className="text-green-800">✅ Protection Active:</strong>
              <p className="text-green-700 text-sm mt-1">
                Your Cloudflare WAF successfully blocked this {testType} attempt. This indicates your security rules are working properly.
              </p>
            </div>
          )}
        </div>
      </div>
    );
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
          A03:2021 - Injection Vulnerabilities
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-red-900 mb-2">
            🚨 Critical Risk Vulnerability - Live WAF Testing
          </h2>
          <p className="text-red-800">
            This page sends REAL HTTP requests with injection payloads to test your Cloudflare WAF configuration. 
            A properly configured WAF should block these requests before they reach the server.
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-blue-900 font-semibold">🧪 Quick WAF Test</h3>
              <p className="text-blue-800 text-sm">Test common injection payloads against your WAF</p>
            </div>
            <button
              onClick={runQuickTests}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
              disabled={isTestingSQL || isTestingXSS}
            >
              Run Quick Tests
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            💉 SQL Injection WAF Test
          </h3>
          <p className="text-gray-600 mb-4">
            Test if your WAF blocks SQL injection attempts:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SQL Injection Payload
              </label>
              <input
                type="text"
                value={sqlPayload}
                onChange={(e) => setSqlPayload(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin' OR '1'='1' --"
              />
            </div>
            <div className="text-xs text-gray-500">
              <p className="font-semibold">Common SQL injection payloads:</p>
              <ul className="mt-1 space-y-1 font-mono">
                <li>• admin' OR '1'='1' --</li>
                <li>• ' UNION SELECT * FROM users --</li>
                <li>• '; DROP TABLE users; --</li>
                <li>• ' OR 1=1 LIMIT 1 --</li>
              </ul>
            </div>
            <button
              onClick={handleSQLTest}
              disabled={isTestingSQL}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium"
            >
              {isTestingSQL ? 'Testing WAF...' : 'Test SQL Injection'}
            </button>
            {renderTestResult(sqlResult, 'SQL Injection')}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🌐 Cross-Site Scripting (XSS) WAF Test
          </h3>
          <p className="text-gray-600 mb-4">
            Test if your WAF blocks XSS attempts:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                XSS Payload
              </label>
              <textarea
                value={xssPayload}
                onChange={(e) => setXssPayload(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="<script>alert('XSS')</script>"
              />
            </div>
            <div className="text-xs text-gray-500">
              <p className="font-semibold">Common XSS payloads:</p>
              <ul className="mt-1 space-y-1 font-mono text-xs">
                <li>• &lt;script&gt;alert('XSS')&lt;/script&gt;</li>
                <li>• &lt;img src=x onerror=alert('XSS')&gt;</li>
                <li>• javascript:alert('XSS')</li>
                <li>• &lt;svg onload=alert('XSS')&gt;</li>
              </ul>
            </div>
            <button
              onClick={handleXSSTest}
              disabled={isTestingXSS}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium"
            >
              {isTestingXSS ? 'Testing WAF...' : 'Test XSS Attack'}
            </button>
            {renderTestResult(xssResult, 'XSS')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 How Injection Attacks Work
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">1. SQL Injection</h4>
              <p>Malicious SQL code is inserted into application queries, allowing attackers to:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Bypass authentication</li>
                <li>Extract sensitive data</li>
                <li>Modify or delete database records</li>
                <li>Execute administrative operations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">2. Cross-Site Scripting (XSS)</h4>
              <p>Malicious scripts are injected into web pages viewed by other users:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Steal session cookies</li>
                <li>Redirect users to malicious sites</li>
                <li>Deface web pages</li>
                <li>Perform actions on behalf of users</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            🛡️ Prevention & Mitigation
          </h3>
          <div className="space-y-4 text-sm text-green-800">
            <div>
              <h4 className="font-semibold text-green-900">SQL Injection Prevention:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Use parameterized queries/prepared statements</li>
                <li>Implement input validation and sanitization</li>
                <li>Use stored procedures (when properly implemented)</li>
                <li>Escape all user-supplied input</li>
                <li>Implement least-privilege database access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">XSS Prevention:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Validate and sanitize all user input</li>
                <li>Encode output data</li>
                <li>Use Content Security Policy (CSP)</li>
                <li>Implement proper session management</li>
                <li>Use secure development frameworks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🔍 WAF Testing Tips
        </h3>
        <p className="text-blue-800 mb-4">
          Use these payloads to test your Web Application Firewall:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900">SQL Injection Payloads:</h4>
            <ul className="font-mono text-blue-700 mt-2 space-y-1">
              <li>' OR '1'='1' --</li>
              <li>' UNION SELECT * FROM users --</li>
              <li>'; DROP TABLE users; --</li>
              <li>' OR 1=1 LIMIT 1 --</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">XSS Payloads:</h4>
            <ul className="font-mono text-blue-700 mt-2 space-y-1">
              <li>&lt;script&gt;alert('XSS')&lt;/script&gt;</li>
              <li>&lt;img src=x onerror=alert('XSS')&gt;</li>
              <li>javascript:alert('XSS')</li>
              <li>&lt;svg onload=alert('XSS')&gt;</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}