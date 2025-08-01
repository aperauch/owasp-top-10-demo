'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VulnerableComponentsPage() {
  const [componentName, setComponentName] = useState('');
  const [componentResult, setComponentResult] = useState('');
  const [dependencyCheck, setDependencyCheck] = useState(false);
  const [dependencyResult, setDependencyResult] = useState('');

  const vulnerableComponents = [
    { name: 'jquery', version: '1.7.2', cve: 'CVE-2015-9251', severity: 'Medium', description: 'Cross-site scripting vulnerability' },
    { name: 'lodash', version: '4.17.4', cve: 'CVE-2019-10744', severity: 'High', description: 'Prototype pollution vulnerability' },
    { name: 'express', version: '3.4.8', cve: 'CVE-2014-6393', severity: 'High', description: 'Path traversal vulnerability' },
    { name: 'moment', version: '2.15.1', cve: 'CVE-2017-18214', severity: 'High', description: 'Regular expression denial of service' },
    { name: 'serialize-javascript', version: '1.7.0', cve: 'CVE-2019-16769', severity: 'High', description: 'Cross-site scripting vulnerability' },
    { name: 'handlebars', version: '4.0.5', cve: 'CVE-2019-19919', severity: 'Critical', description: 'Arbitrary code execution' },
    { name: 'bootstrap', version: '3.3.7', cve: 'CVE-2019-8331', severity: 'Medium', description: 'Cross-site scripting in tooltip/popover' }
  ];

  const handleComponentCheck = () => {
    if (!componentName) {
      setComponentResult('Please enter a component name');
      return;
    }

    const component = vulnerableComponents.find(comp => 
      comp.name.toLowerCase().includes(componentName.toLowerCase())
    );

    if (component) {
      setComponentResult(`⚠️ VULNERABLE COMPONENT DETECTED!

Component: ${component.name} v${component.version}
CVE ID: ${component.cve}
Severity: ${component.severity}
Description: ${component.description}

SECURITY IMPACT:
${component.severity === 'Critical' ? '- Arbitrary code execution possible\n- Complete system compromise risk\n- Immediate patching required' : 
  component.severity === 'High' ? '- Data breach potential\n- Privilege escalation possible\n- High priority for patching' :
  '- Limited security impact\n- Monitor for exploitation\n- Schedule regular update'}

ATTACK VECTORS:
- Exploitation of known vulnerability
- Automated vulnerability scanners will detect
- Public proof-of-concept code available
- Easy target for attackers

RECOMMENDED ACTIONS:
1. Upgrade to latest version immediately
2. Review security advisories for breaking changes
3. Test thoroughly in staging environment
4. Implement Web Application Firewall rules
5. Monitor for exploitation attempts

SECURE VERSION AVAILABLE:
${component.name}@latest (check npm/package manager for current version)

VULNERABILITY TIMELINE:
- Vulnerability disclosed: Public
- Proof of concept: Available
- Exploit difficulty: Low
- Detection by tools: High`);
    } else {
      const randomComponent = vulnerableComponents[Math.floor(Math.random() * vulnerableComponents.length)];
      setComponentResult(`Component "${componentName}" not found in vulnerability database.

However, this doesn't mean it's secure! Consider these checks:
- Version currency (when was it last updated?)
- Known CVEs in security databases
- Dependency analysis for transitive vulnerabilities
- License compliance and support status

Example vulnerable component in our system:
${randomComponent.name} v${randomComponent.version} - ${randomComponent.cve} (${randomComponent.severity})`);
    }
  };

  const handleDependencyCheck = () => {
    const newCheck = !dependencyCheck;
    setDependencyCheck(newCheck);

    if (newCheck) {
      setDependencyResult(`🔍 DEPENDENCY VULNERABILITY SCAN RESULTS

Scanning project dependencies...

CRITICAL VULNERABILITIES FOUND:
=====================================

📦 handlebars@4.0.5
   ├─ CVE-2019-19919 (Critical)
   ├─ Arbitrary code execution in template compilation
   └─ 47,000 weekly downloads affected

📦 lodash@4.17.4  
   ├─ CVE-2019-10744 (High)
   ├─ Prototype pollution vulnerability
   └─ 25M+ weekly downloads affected

📦 jquery@1.7.2
   ├─ CVE-2015-9251 (Medium)
   ├─ Cross-site scripting vulnerability
   └─ Outdated by 8+ years

📦 express@3.4.8
   ├─ CVE-2014-6393 (High)  
   ├─ Path traversal vulnerability
   └─ No longer maintained version

TRANSITIVE DEPENDENCIES:
├─ minimist@0.0.8 (via handlebars)
│  └─ CVE-2020-7598 (Medium)
├─ debug@2.2.0 (via express)
│  └─ CVE-2017-16137 (High)
└─ qs@0.6.6 (via express)
   └─ CVE-2014-7191 (High)

SUMMARY:
- Total packages: 127
- Vulnerable packages: 7
- Critical issues: 1
- High severity: 4
- Medium severity: 2

REMEDIATION COMMANDS:
npm audit fix --force
npm update lodash handlebars jquery express
npm install --save-dev npm-audit-resolver

SUPPLY CHAIN RISKS:
- Malicious package injection
- Typosquatting attacks  
- Compromised maintainer accounts
- Dependency confusion attacks`);
    } else {
      setDependencyResult('Dependency scanning disabled.');
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
          A06:2021 - Vulnerable and Outdated Components
        </h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-yellow-900 mb-2">
            🚨 Medium-High Risk Vulnerability
          </h2>
          <p className="text-yellow-800">
            Applications using components with known vulnerabilities may undermine application defenses and enable various attacks. 
            This includes libraries, frameworks, and other software modules that run with the same privileges as the application.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📦 Component Vulnerability Lookup
          </h3>
          <p className="text-gray-600 mb-4">
            Check if a component has known vulnerabilities:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Component Name (try: jquery, lodash, express, handlebars)
              </label>
              <input
                type="text"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter component/library name..."
              />
            </div>
            <div className="text-xs text-gray-500">
              <p className="font-semibold">Common vulnerable components:</p>
              <ul className="mt-1 space-y-1">
                <li>• jQuery 1.7.2 (XSS vulnerability)</li>
                <li>• Lodash 4.17.4 (Prototype pollution)</li>
                <li>• Express 3.4.8 (Path traversal)</li>
                <li>• Handlebars 4.0.5 (Code execution)</li>
              </ul>
            </div>
            <button
              onClick={handleComponentCheck}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Check Vulnerability Database
            </button>
            {componentResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{componentResult}</pre>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔍 Dependency Security Audit
          </h3>
          <p className="text-gray-600 mb-4">
            Perform a security audit of project dependencies:
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={dependencyCheck}
                  onChange={handleDependencyCheck}
                  className="sr-only"
                />
                <div className={`relative w-11 h-6 bg-gray-200 rounded-full transition-colors ${dependencyCheck ? 'bg-red-600' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${dependencyCheck ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Run Security Audit {dependencyCheck ? '(Scanning...)' : '(Click to start)'}
                </span>
              </label>
            </div>
            <div className="text-xs text-gray-500">
              <p>This simulates running tools like 'npm audit' or 'yarn audit' to identify vulnerable dependencies in your project.</p>
            </div>
            {dependencyResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{dependencyResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Component Security Risks
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">1. Known Vulnerabilities</h4>
              <p>Using components with published CVEs and security advisories.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">2. Outdated Dependencies</h4>
              <p>Components that haven't been updated and lack security patches.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">3. Transitive Dependencies</h4>
              <p>Vulnerable sub-dependencies that are harder to track and manage.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">4. Unmaintained Libraries</h4>
              <p>Components no longer supported or maintained by developers.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">5. Supply Chain Attacks</h4>
              <p>Malicious code injected into legitimate packages or repositories.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">6. License Compliance</h4>
              <p>Using components with incompatible or restrictive licenses.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">7. Dependency Confusion</h4>
              <p>Attacks that trick systems into installing malicious packages.</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            🛡️ Component Security Management
          </h3>
          <div className="space-y-4 text-sm text-green-800">
            <div>
              <h4 className="font-semibold text-green-900">Inventory Management:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Maintain complete inventory of all components</li>
                <li>Track versions and update frequencies</li>
                <li>Document component dependencies and relationships</li>
                <li>Regular dependency audits and reviews</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Vulnerability Monitoring:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Subscribe to security advisories and CVE feeds</li>
                <li>Use automated vulnerability scanning tools</li>
                <li>Monitor component repositories for updates</li>
                <li>Implement continuous security testing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Update Management:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Establish regular update schedules</li>
                <li>Test updates in staging environments</li>
                <li>Prioritize security-critical updates</li>
                <li>Maintain rollback capabilities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Supply Chain Security:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Verify package integrity and signatures</li>
                <li>Use private package repositories when possible</li>
                <li>Implement package approval workflows</li>
                <li>Monitor for suspicious package activity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🔍 WAF Protection for Component Vulnerabilities
        </h3>
        <p className="text-blue-800 mb-4">
          WAFs can provide some protection against component vulnerability exploitation:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900">WAF Detection Capabilities:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• Known exploit signatures and patterns</li>
              <li>• Malicious payloads targeting specific components</li>
              <li>• Anomalous requests to vulnerable endpoints</li>
              <li>• File upload attacks exploiting component flaws</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">Security Tools:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• npm audit, yarn audit</li>
              <li>• Snyk, WhiteSource, Veracode</li>
              <li>• OWASP Dependency Check</li>
              <li>• GitHub Security Advisories</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}