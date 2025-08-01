'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InsecureDesignPage() {
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [transferResult, setTransferResult] = useState('');
  const [passwordReset, setPasswordReset] = useState('');
  const [resetResult, setResetResult] = useState('');

  const handleTransfer = () => {
    if (!transferAmount || !recipientAccount) {
      setTransferResult('Please fill in all fields');
      return;
    }

    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      setTransferResult('Invalid amount');
      return;
    }

    setTransferResult(`⚠️ INSECURE DESIGN FLAW DETECTED!

Transfer Details:
Amount: $${amount}
To Account: ${recipientAccount}
Status: PROCESSED (No security controls!)

DESIGN FLAWS IDENTIFIED:
- No transaction limits or velocity checks
- Missing multi-factor authentication for high-value transfers
- No fraud detection algorithms
- Immediate processing without review period
- No notification to account holder
- Missing transaction categorization and risk scoring

BUSINESS LOGIC BYPASSES:
- Can transfer unlimited amounts
- No cooling-off period for large transactions
- Missing business rule validation
- No segregation of duties for approvals

SECURE DESIGN REQUIREMENTS:
- Implement daily/monthly transfer limits
- Require MFA for transfers above threshold
- Add fraud detection and monitoring
- Implement maker-checker workflow for large amounts
- Real-time notifications and alerts
- Transaction risk scoring and delayed processing`);
  };

  const handlePasswordReset = () => {
    if (!passwordReset) {
      setResetResult('Please enter an email address');
      return;
    }

    setResetResult(`⚠️ INSECURE PASSWORD RESET DESIGN!

Password Reset for: ${passwordReset}
Reset Link: https://example.com/reset?token=user123_${Date.now()}

DESIGN VULNERABILITIES:
- Predictable reset tokens (not cryptographically secure)
- No rate limiting on reset requests
- Reset link sent regardless of email existence
- Long token expiration time (24 hours)
- Token reuse possible
- No account lockout after multiple resets

ATTACK SCENARIOS ENABLED:
- Account enumeration via reset responses
- Token prediction and brute force
- Email flooding attacks
- Social engineering opportunities

SECURE RESET DESIGN:
- Cryptographically random tokens
- Short expiration times (15-30 minutes)
- Rate limiting per IP and email
- Generic responses (don't reveal if email exists)
- Single-use tokens that expire after use
- Account lockout after excessive reset attempts
- Multi-step verification process`);
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
          A04:2021 - Insecure Design
        </h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-yellow-900 mb-2">
            🚨 Medium-High Risk Vulnerability
          </h2>
          <p className="text-yellow-800">
            Insecure design represents missing or ineffective control design. It focuses on risks related to design flaws 
            and architectural weaknesses that require more secure design patterns, threat modeling, and secure development practices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            💰 Business Logic Flaw Demo
          </h3>
          <p className="text-gray-600 mb-4">
            Financial transfer system with missing security controls:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer Amount ($)
              </label>
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount (try $1,000,000)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Account
              </label>
              <input
                type="text"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Account number or email"
              />
            </div>
            <button
              onClick={handleTransfer}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Process Transfer (Insecure)
            </button>
            {transferResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{transferResult}</pre>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔑 Flawed Password Reset Design
          </h3>
          <p className="text-gray-600 mb-4">
            Password reset system with design vulnerabilities:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={passwordReset}
                onChange={(e) => setPasswordReset(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="user@example.com"
              />
            </div>
            <button
              onClick={handlePasswordReset}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Send Reset Link
            </button>
            {resetResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{resetResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Common Insecure Design Patterns
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">1. Missing Security Controls</h4>
              <p>Absence of essential security features in the design phase.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">2. Business Logic Flaws</h4>
              <p>Inadequate validation of business rules and workflows.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">3. Insufficient Risk Analysis</h4>
              <p>Lack of threat modeling and risk assessment during design.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">4. Over-Privileged Design</h4>
              <p>Systems designed with excessive permissions by default.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">5. Missing Abuse Cases</h4>
              <p>Failure to consider how features might be misused.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">6. Inadequate Segregation</h4>
              <p>Insufficient separation of duties and privilege levels.</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            🛡️ Secure Design Principles
          </h3>
          <div className="space-y-4 text-sm text-green-800">
            <div>
              <h4 className="font-semibold text-green-900">Security by Design:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Threat modeling during design phase</li>
                <li>Security requirements as first-class citizens</li>
                <li>Defense in depth architecture</li>
                <li>Principle of least privilege</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Business Logic Security:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Rate limiting and transaction controls</li>
                <li>Multi-factor authentication for sensitive operations</li>
                <li>Workflow approval mechanisms</li>
                <li>Anomaly detection and monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Secure Development:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Security-focused user stories</li>
                <li>Abuse case testing</li>
                <li>Security code reviews</li>
                <li>Penetration testing of business logic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🔍 WAF Limitations for Design Flaws
        </h3>
        <p className="text-blue-800 mb-4">
          WAFs cannot detect insecure design flaws as they occur at the application logic level. However, they can help with some related attacks:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900">What WAFs Can Detect:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• Rapid-fire requests (rate limiting)</li>
              <li>• Suspicious parameter manipulation</li>
              <li>• Abnormal request patterns</li>
              <li>• Known attack signatures</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">Design-Level Protection Needed:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• Application-level business logic validation</li>
              <li>• Proper authentication and authorization</li>
              <li>• Workflow controls and approvals</li>
              <li>• Real-time fraud detection systems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}