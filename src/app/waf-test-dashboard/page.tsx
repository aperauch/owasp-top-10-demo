'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WAFTester, WAFTestResult, WAFTestPayload } from '@/lib/waf-tester';

interface TestSuite {
  name: string;
  tests: Array<{
    name: string;
    payload: WAFTestPayload;
    category: string;
  }>;
}

export default function WAFTestDashboard() {
  const [testResults, setTestResults] = useState<Record<string, WAFTestResult>>({});
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Determine the correct base URL for WAF testing
  const getBaseUrl = () => {
    if (typeof window === 'undefined') return ''; // SSR
    
    // If we're on the production domain, use HTTPS explicitly
    if (window.location.hostname === 'owasp.aperauch.com') {
      return 'https://owasp.aperauch.com';
    }
    
    // For local development, use relative URLs (empty string)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return '';
    }
    
    // For any other domain, use the current protocol and host
    return `${window.location.protocol}//${window.location.host}`;
  };
  
  const wafTester = new WAFTester(getBaseUrl());

  const testSuites: TestSuite[] = [
    {
      name: 'SQL Injection Tests',
      tests: WAFTester.getTestPayloads().sqlInjection.map(test => ({
        name: test.name,
        payload: test,
        category: 'sql-injection'
      }))
    },
    {
      name: 'XSS Tests',
      tests: WAFTester.getTestPayloads().xss.map(test => ({
        name: test.name,
        payload: test,
        category: 'xss'
      }))
    },
    {
      name: 'SSRF Tests',
      tests: WAFTester.getTestPayloads().ssrf.map(test => ({
        name: test.name,
        payload: test,
        category: 'ssrf'
      }))
    },
    {
      name: 'Path Traversal Tests',
      tests: WAFTester.getTestPayloads().pathTraversal.map(test => ({
        name: test.name,
        payload: test,
        category: 'path-traversal'
      }))
    },
    {
      name: 'Command Injection Tests',
      tests: WAFTester.getTestPayloads().commandInjection.map(test => ({
        name: test.name,
        payload: test,
        category: 'command-injection'
      }))
    }
  ];

  const runAllTests = async () => {
    setIsRunningTests(true);
    setTestResults({});

    for (const suite of testSuites) {
      for (const test of suite.tests) {
        try {
          const result = await wafTester.testPayload(test.payload);
          setTestResults(prev => ({
            ...prev,
            [test.name]: result
          }));
          
          // Small delay between tests to avoid overwhelming the server
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          setTestResults(prev => ({
            ...prev,
            [test.name]: {
              success: false,
              blocked: true,
              statusCode: 0,
              message: 'Test failed - likely blocked by WAF',
              timestamp: new Date().toISOString(),
              responseTime: 0,
              error: error instanceof Error ? error.message : 'Unknown error'
            }
          }));
        }
      }
    }

    setIsRunningTests(false);
  };

  const runCategoryTests = async (category: string) => {
    setIsRunningTests(true);
    
    const categoryTests = testSuites
      .flatMap(suite => suite.tests)
      .filter(test => test.category === category);

    for (const test of categoryTests) {
      try {
        const result = await wafTester.testPayload(test.payload);
        setTestResults(prev => ({
          ...prev,
          [test.name]: result
        }));
        
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          [test.name]: {
            success: false,
            blocked: true,
            statusCode: 0,
            message: 'Test failed - likely blocked by WAF',
            timestamp: new Date().toISOString(),
            responseTime: 0,
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        }));
      }
    }

    setIsRunningTests(false);
  };

  const getTestStats = () => {
    const results = Object.values(testResults);
    const total = results.length;
    // Simple logic: if status code is 200, the WAF failed to block (bad)
    // Any other status code or network error means WAF blocked it (good)
    const failed = results.filter(r => r.statusCode === 200).length;
    const blocked = results.filter(r => r.statusCode !== 200).length;
    
    return { total, blocked, failed, percentage: total > 0 ? Math.round((blocked / total) * 100) : 0 };
  };

  const stats = getTestStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          ← Back to OWASP Top 10
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Cloudflare WAF Test Dashboard
        </h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            🛡️ Comprehensive WAF Testing Suite
          </h2>
          <p className="text-blue-800 mb-3">
            This dashboard runs real HTTP requests with OWASP Top 10 attack payloads to validate your Cloudflare WAF configuration. 
            Blocked requests indicate your WAF is working properly.
          </p>
          <div className="text-sm text-blue-700 bg-blue-100 rounded px-3 py-2">
            <strong>Testing Target:</strong> {getBaseUrl() || 'Current Domain (Relative URLs)'}
          </div>
        </div>
      </div>

      {/* Test Statistics */}
      {Object.keys(testResults).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Tests</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-800">{stats.blocked}</div>
            <div className="text-sm text-green-600">Blocked by WAF</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-800">{stats.failed}</div>
            <div className="text-sm text-red-600">Failed (Not Blocked)</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-800">{stats.percentage}%</div>
            <div className="text-sm text-blue-600">Protection Rate</div>
          </div>
        </div>
      )}

      {/* Test Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Controls</h3>
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                disabled={isRunningTests}
              >
                <option value="all">All Categories</option>
                <option value="sql-injection">SQL Injection</option>
                <option value="xss">Cross-Site Scripting</option>
                <option value="ssrf">Server-Side Request Forgery</option>
                <option value="path-traversal">Path Traversal</option>
                <option value="command-injection">Command Injection</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => selectedCategory === 'all' ? runAllTests() : runCategoryTests(selectedCategory)}
              disabled={isRunningTests}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium"
            >
              {isRunningTests ? 'Running Tests...' : `Test ${selectedCategory === 'all' ? 'All' : selectedCategory.replace('-', ' ')}`}
            </button>
            
            <button
              onClick={() => setTestResults({})}
              disabled={isRunningTests}
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium"
            >
              Clear Results
            </button>
          </div>
        </div>
      </div>

      {/* Test Results */}
      <div className="space-y-6">
        {testSuites.map((suite) => {
          const suiteTests = suite.tests.filter(test => 
            selectedCategory === 'all' || test.category === selectedCategory
          );
          
          if (suiteTests.length === 0) return null;

          return (
            <div key={suite.name} className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{suite.name}</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suiteTests.map((test) => {
                    const result = testResults[test.name];
                    // Simple logic: if status code is 200, the WAF failed to block (bad)
                    // Any other status code means WAF blocked it (good)
                    const isBlocked = result && result.statusCode !== 200;
                    
                    return (
                      <div
                        key={test.name}
                        className={`border-2 rounded-lg p-4 ${
                          !result 
                            ? 'border-gray-200 bg-gray-50' 
                            : isBlocked
                            ? 'border-green-300 bg-green-50'
                            : 'border-red-300 bg-red-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">{test.name}</h4>
                          {result && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              isBlocked 
                                ? 'bg-green-200 text-green-800' 
                                : 'bg-red-200 text-red-800'
                            }`}>
                              {isBlocked ? 'BLOCKED' : 'FAILED'}
                            </span>
                          )}
                        </div>
                        
                        {result && (
                          <div className="text-xs space-y-1">
                            <div>Status: {result.statusCode}</div>
                            <div>Time: {result.responseTime}ms</div>
                            {result.cloudflareRay && (
                              <div>Ray: {result.cloudflareRay}</div>
                            )}
                          </div>
                        )}
                        
                        {!result && isRunningTests && (
                          <div className="text-xs text-gray-500">Waiting to test...</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Documentation */}
      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📚 Understanding the Results
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-green-800 mb-2">✅ Blocked Requests (Good)</h4>
            <ul className="space-y-1 text-green-700">
              <li>• HTTP 403 - Forbidden by WAF rules</li>
              <li>• HTTP 406 - Not acceptable content</li>
              <li>• Request failed/timeout - Likely blocked</li>
              <li>• Cloudflare Ray ID present - CF processed request</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-800 mb-2">❌ Failed Tests (WAF Bypass)</h4>
            <ul className="space-y-1 text-red-700">
              <li>• HTTP 200 - Attack payload reached your server</li>
              <li>• WAF failed to block malicious request</li>
              <li>• Indicates WAF rules need adjustment</li>
              <li>• Consider enabling stricter security settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}