'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoggingMonitoringFailuresPage() {
  const [attackAttempts, setAttackAttempts] = useState<string[]>([]);
  const [monitoringEnabled, setMonitoringEnabled] = useState(false);
  const [alertLog, setAlertLog] = useState('');
  const [logLevel, setLogLevel] = useState('none');

  const handleAttackSimulation = (attackType: string) => {
    const timestamp = new Date().toLocaleString();
    const newAttack = `[${timestamp}] ${attackType} attempt detected`;
    
    setAttackAttempts(prev => [...prev, newAttack]);

    if (!monitoringEnabled) {
      setAlertLog(prev => prev + `\n⚠️ SECURITY LOGGING FAILURE!

Attack: ${attackType}
Time: ${timestamp}
Status: NOT LOGGED OR MONITORED

CONSEQUENCES OF MISSING LOGGING:
- Attack went undetected
- No incident response triggered  
- No forensic evidence collected
- Pattern analysis impossible
- Compliance violations likely

This attack could continue undetected, potentially leading to:
- Data breach
- System compromise
- Regulatory penalties
- Reputation damage
- Legal liability`);
    } else {
      setAlertLog(prev => prev + `\n✅ SECURITY EVENT LOGGED

Attack: ${attackType}
Time: ${timestamp}
Source IP: 192.168.1.100
User Agent: Malicious Scanner v1.0
Status: Blocked and logged
Alert Level: HIGH
Response: Automatic IP blocking activated
Incident ID: INC-${Date.now()}`);
    }
  };

  const generateLogAnalysis = () => {
    if (logLevel === 'none') {
      return `⚠️ NO LOGGING CONFIGURATION DETECTED!

Current Status: Critical logging gaps identified

MISSING LOG CATEGORIES:
- Authentication attempts (success/failure)
- Authorization failures
- Input validation errors
- Application errors and exceptions
- Admin privilege usage
- Data access and modifications
- File uploads and downloads
- Network connections and requests

SECURITY BLIND SPOTS:
- Cannot detect ongoing attacks
- No forensic evidence available
- Compliance requirements not met
- Incident response severely hampered
- Legal evidence collection impossible

RECOMMENDED IMMEDIATE ACTIONS:
1. Enable comprehensive security logging
2. Implement log aggregation system
3. Set up real-time monitoring alerts
4. Create incident response procedures
5. Establish log retention policies`;
    } else if (logLevel === 'basic') {
      return `⚠️ INSUFFICIENT LOGGING DETECTED!

Current Status: Basic logging enabled but inadequate

CURRENT LOGGING:
✓ Basic application errors
✓ System startup/shutdown
✗ Security events
✗ User authentication
✗ Data access patterns
✗ Failed authorization attempts

GAPS IN MONITORING:
- No real-time alerting
- Missing correlation analysis
- Inadequate log retention
- No automated response
- Limited forensic capabilities

UPGRADE RECOMMENDATIONS:
- Add security-specific logging
- Implement SIEM integration
- Enable automated alerting
- Add user behavior analytics
- Create security dashboards`;
    } else {
      return `✅ COMPREHENSIVE LOGGING ENABLED

Current Status: Full security logging and monitoring active

SECURITY LOGGING COVERAGE:
✓ Authentication events (success/failure)
✓ Authorization checks and failures
✓ Input validation errors
✓ SQL injection attempts
✓ XSS attack attempts  
✓ File access and modifications
✓ Admin privilege usage
✓ Network connection attempts
✓ API access patterns
✓ Error conditions and exceptions

MONITORING CAPABILITIES:
✓ Real-time threat detection
✓ Automated incident response
✓ Behavioral anomaly detection
✓ Compliance reporting
✓ Forensic evidence collection
✓ Pattern recognition and alerting

INCIDENT RESPONSE:
- Automatic threat blocking
- Real-time notifications
- Escalation procedures
- Evidence preservation
- Regulatory compliance`;
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
          A09:2021 - Security Logging and Monitoring Failures
        </h1>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-green-900 mb-2">
            🚨 Low-Medium Risk Vulnerability
          </h2>
          <p className="text-green-800">
            Security logging and monitoring failures enable attackers to operate undetected for extended periods. 
            Without proper logging, breaches cannot be detected, escalated, or responded to in a timely manner.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔍 Attack Detection Simulation
          </h3>
          <p className="text-gray-600 mb-4">
            Simulate attacks to see the impact of logging failures:
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={monitoringEnabled}
                  onChange={(e) => setMonitoringEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative w-11 h-6 bg-gray-200 rounded-full transition-colors ${monitoringEnabled ? 'bg-green-600' : 'bg-red-500'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${monitoringEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Security Monitoring {monitoringEnabled ? '(ENABLED)' : '(DISABLED)'}
                </span>
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAttackSimulation('SQL Injection')}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                SQL Injection Attack
              </button>
              <button
                onClick={() => handleAttackSimulation('Brute Force Login')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Brute Force Attack
              </button>
              <button
                onClick={() => handleAttackSimulation('XSS Attempt')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                XSS Attack
              </button>
              <button
                onClick={() => handleAttackSimulation('Privilege Escalation')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Privilege Escalation
              </button>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm h-64 overflow-y-auto">
              <div className="mb-2 text-gray-400">Security Event Log:</div>
              {attackAttempts.length === 0 ? (
                <div className="text-gray-500">No attacks simulated yet...</div>
              ) : (
                attackAttempts.map((attack, index) => (
                  <div key={index} className="mb-1">{attack}</div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📊 Logging Configuration Assessment
          </h3>
          <p className="text-gray-600 mb-4">
            Evaluate your current logging and monitoring setup:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Logging Level
              </label>
              <select
                value={logLevel}
                onChange={(e) => setLogLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">No Logging</option>
                <option value="basic">Basic Application Logging</option>
                <option value="comprehensive">Comprehensive Security Logging</option>
              </select>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Configuration Analysis:</h4>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">{generateLogAnalysis()}</pre>
            </div>
          </div>
        </div>
      </div>

      {alertLog && (
        <div className="mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Alert Log</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm max-h-64 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{alertLog}</pre>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Common Logging and Monitoring Failures
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">1. Insufficient Event Logging</h4>
              <p>Critical security events not logged or missing important details.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">2. Missing Real-time Monitoring</h4>
              <p>No active monitoring of security events or automated alerting.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">3. Inadequate Log Retention</h4>
              <p>Logs deleted too quickly, preventing forensic analysis.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">4. Poor Incident Response</h4>
              <p>No defined procedures for responding to security alerts.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">5. Log Tampering Risks</h4>
              <p>Logs stored insecurely, allowing attackers to modify evidence.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">6. Alert Fatigue</h4>
              <p>Too many false positives causing important alerts to be ignored.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">7. Compliance Gaps</h4>
              <p>Logging doesn't meet regulatory requirements for audit trails.</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            🛡️ Effective Logging and Monitoring
          </h3>
          <div className="space-y-4 text-sm text-green-800">
            <div>
              <h4 className="font-semibold text-green-900">Comprehensive Logging:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>All authentication attempts (success and failure)</li>
                <li>Authorization failures and privilege changes</li>
                <li>Input validation failures and injection attempts</li>
                <li>Application errors with sufficient context</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Real-time Monitoring:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Security Information and Event Management (SIEM)</li>
                <li>Automated threat detection and alerting</li>
                <li>Behavioral anomaly detection</li>
                <li>Real-time dashboard and notifications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Incident Response:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Defined escalation procedures</li>
                <li>Automated containment actions</li>
                <li>Forensic evidence preservation</li>
                <li>Post-incident analysis and improvement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Log Management:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Secure, tamper-proof log storage</li>
                <li>Appropriate retention periods</li>
                <li>Regular log analysis and review</li>
                <li>Compliance with regulatory requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🔍 WAF Integration with Logging Systems
        </h3>
        <p className="text-blue-800 mb-4">
          WAFs play a crucial role in security logging and monitoring:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900">WAF Logging Capabilities:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• All blocked and allowed requests</li>
              <li>• Attack signatures and patterns detected</li>
              <li>• Source IP addresses and geolocation</li>
              <li>• Rule-based alerts and notifications</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">Integration Benefits:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• Centralized security event collection</li>
              <li>• Correlation with application logs</li>
              <li>• Real-time threat intelligence</li>
              <li>• Automated incident response triggers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}