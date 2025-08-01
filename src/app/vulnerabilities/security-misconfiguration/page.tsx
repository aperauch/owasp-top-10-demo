'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SecurityMisconfigurationPage() {
  const [configFile, setConfigFile] = useState('');
  const [configResult, setConfigResult] = useState('');
  const [debugMode, setDebugMode] = useState(false);
  const [debugResult, setDebugResult] = useState('');

  const handleConfigCheck = () => {
    if (!configFile) {
      setConfigResult('Please enter a configuration file path');
      return;
    }

    let result = '';
    const lowerPath = configFile.toLowerCase();

    if (lowerPath.includes('admin') || lowerPath.includes('config') || 
        lowerPath.includes('settings') || lowerPath.includes('env') ||
        lowerPath.includes('.xml') || lowerPath.includes('.json') ||
        lowerPath.includes('web.config') || lowerPath.includes('wp-config')) {
      
      result = `⚠️ SECURITY MISCONFIGURATION DETECTED!

Attempting to access: ${configFile}

CONFIGURATION EXPOSURE RISKS:
${lowerPath.includes('admin') ? '- Administrative interface accessible\n' : ''}${lowerPath.includes('config') || lowerPath.includes('web.config') ? '- Configuration files exposed\n' : ''}${lowerPath.includes('env') ? '- Environment variables exposed\n' : ''}${lowerPath.includes('wp-config') ? '- WordPress configuration exposed\n' : ''}${lowerPath.includes('.xml') || lowerPath.includes('.json') ? '- Structured config data accessible\n' : ''}
SIMULATED EXPOSED CONTENT:
{
  "database": {
    "host": "localhost",
    "username": "admin",
    "password": "password123",
    "name": "production_db"
  },
  "api_keys": {
    "stripe": "sk_live_abcd1234...",
    "aws_access_key": "AKIAIOSFODNN7EXAMPLE",
    "aws_secret": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
  },
  "debug": true,
  "admin_email": "admin@company.com"
}

ATTACK VECTORS:
- Database credential theft
- API key compromise
- Infrastructure access
- Administrative account discovery
- Internal system information disclosure

SECURE CONFIGURATION:
- Store sensitive config outside web root
- Use environment variables for secrets
- Implement proper access controls
- Regular security configuration reviews`;

    } else {
      result = `Configuration file path appears safe: ${configFile}

Best practices for secure configuration:
- Keep configuration files outside web-accessible directories
- Use environment variables for sensitive data
- Implement proper file permissions
- Regular security audits of configurations`;
    }

    setConfigResult(result);
  };

  const handleDebugToggle = () => {
    const newDebugMode = !debugMode;
    setDebugMode(newDebugMode);

    if (newDebugMode) {
      setDebugResult(`⚠️ DEBUG MODE ENABLED - INFORMATION DISCLOSURE RISK!

Debug Information Exposed:
=============================
Application: OWASP Demo App v2.1.5
Environment: PRODUCTION (Should be development!)
Server: nginx/1.18.0 (Ubuntu)
PHP Version: 8.1.2
Database: MySQL 8.0.28 (localhost:3306)

Error Details:
- Full stack traces visible to users
- Database query details exposed
- File paths and directory structure revealed
- Internal API endpoints disclosed
- Memory usage and performance metrics shown

Recent Errors:
[2024-01-15 14:32:17] SQLSTATE[42S02]: Base table 'users' doesn't exist
[2024-01-15 14:31:45] Failed to connect to Redis at 127.0.0.1:6379
[2024-01-15 14:30:12] Undefined variable: $secret_key in /var/www/app/auth.php

Loaded Modules:
- mod_rewrite (enabled)
- mod_ssl (enabled) 
- mod_security (DISABLED - HIGH RISK!)

Environment Variables:
DB_PASSWORD=prod_secret_123
API_KEY=sk_live_abcdef123456
AWS_SECRET=very_secret_key_here

SECURITY IMPACT:
- Internal architecture disclosure
- Credential exposure in error messages
- Attack surface enumeration
- Technology stack fingerprinting

IMMEDIATE ACTIONS REQUIRED:
- Disable debug mode in production
- Implement custom error pages
- Remove verbose error reporting
- Enable security modules`);
    } else {
      setDebugResult('Debug mode disabled. Error details are now hidden from users.');
    }
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
          A05:2021 - Security Misconfiguration
        </h1>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-orange-900 mb-2">
            🚨 Medium-High Risk Vulnerability
          </h2>
          <p className="text-orange-800">
            Security misconfiguration occurs when security settings are not properly implemented, maintained, or are left at insecure defaults. 
            This includes improper permissions, unnecessary features, default accounts, and verbose error handling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📁 Configuration File Exposure
          </h3>
          <p className="text-gray-600 mb-4">
            Try accessing configuration files that should be protected:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Path (try: /admin/config.json, .env, web.config)
              </label>
              <input
                type="text"
                value={configFile}
                onChange={(e) => setConfigFile(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/path/to/config/file"
              />
            </div>
            <div className="text-xs text-gray-500">
              <p className="font-semibold">Common exposed files:</p>
              <ul className="mt-1 space-y-1">
                <li>• /admin/settings.xml</li>
                <li>• /.env</li>
                <li>• /config/database.json</li>
                <li>• /web.config</li>
                <li>• /wp-config.php</li>
              </ul>
            </div>
            <button
              onClick={handleConfigCheck}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Access Configuration
            </button>
            {configResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{configResult}</pre>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🐛 Debug Mode Information Disclosure
          </h3>
          <p className="text-gray-600 mb-4">
            See how debug mode exposes sensitive information:
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={debugMode}
                  onChange={handleDebugToggle}
                  className="sr-only"
                />
                <div className={`relative w-11 h-6 bg-gray-200 rounded-full transition-colors ${debugMode ? 'bg-red-600' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${debugMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Debug Mode {debugMode ? '(ON - DANGEROUS!)' : '(OFF)'}
                </span>
              </label>
            </div>
            <div className="text-xs text-gray-500">
              <p>Debug mode reveals sensitive system information that attackers can use to understand your infrastructure and find additional attack vectors.</p>
            </div>
            {debugResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{debugResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Common Misconfigurations
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">1. Default Credentials</h4>
              <p>Using default usernames and passwords (admin/admin, root/root).</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">2. Unnecessary Features Enabled</h4>
              <p>Leaving unused services, ports, and features active.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">3. Verbose Error Messages</h4>
              <p>Detailed error messages exposing system information.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">4. Directory Listing</h4>
              <p>Web server showing directory contents when index files are missing.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">5. Missing Security Headers</h4>
              <p>Absence of security headers like HSTS, CSP, X-Frame-Options.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">6. Outdated Software</h4>
              <p>Running software versions with known security vulnerabilities.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">7. Improper File Permissions</h4>
              <p>Configuration files readable by unauthorized users.</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            🛡️ Secure Configuration Practices
          </h3>
          <div className="space-y-4 text-sm text-green-800">
            <div>
              <h4 className="font-semibold text-green-900">Server Hardening:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Change all default passwords and usernames</li>
                <li>Disable unnecessary services and features</li>
                <li>Regular security updates and patches</li>
                <li>Implement proper file and directory permissions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Application Security:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Custom error pages without sensitive details</li>
                <li>Disable debug mode in production</li>
                <li>Implement security headers</li>
                <li>Use secure communication protocols</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Configuration Management:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Regular security configuration reviews</li>
                <li>Environment-specific configurations</li>
                <li>Secrets management systems</li>
                <li>Configuration as code practices</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Monitoring:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Regular vulnerability scanning</li>
                <li>Configuration drift detection</li>
                <li>Security baseline compliance checks</li>
                <li>Automated security testing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🔍 WAF Protection Against Misconfigurations
        </h3>
        <p className="text-blue-800 mb-4">
          WAFs can help protect against some misconfiguration exploits:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900">WAF Detection Rules:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• Block access to common config files (.env, web.config)</li>
              <li>• Detect directory traversal attempts (../, ..\)</li>
              <li>• Rate limiting for admin endpoints</li>
              <li>• Block requests to development/debug URLs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">File Patterns to Block:</h4>
            <ul className="font-mono text-blue-700 mt-2 space-y-1">
              <li>• /.env, /.git/, /admin/</li>
              <li>• web.config, wp-config.php</li>
              <li>• /config/, /settings/</li>
              <li>• Backup files (.bak, .old, .backup)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}