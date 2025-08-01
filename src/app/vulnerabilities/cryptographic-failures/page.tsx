'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CryptographicFailuresPage() {
  const [password, setPassword] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [transmissionData, setTransmissionData] = useState('user@example.com:password123');
  const [encryptionDemo, setEncryptionDemo] = useState('');

  const weakHashDemo = () => {
    if (!password) {
      setHashResult('Please enter a password');
      return;
    }

    const weakHash = btoa(password);
    const md5Like = password.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);

    setHashResult(`⚠️ WEAK CRYPTOGRAPHIC IMPLEMENTATION DETECTED!

Original Password: ${password}
Base64 "Encoding" (NOT encryption): ${weakHash}
Weak Hash (MD5-like): ${md5Like.toString(16)}

VULNERABILITIES:
- Base64 is encoding, not encryption (easily reversible)
- Simple hash functions are vulnerable to rainbow table attacks
- No salt used (identical passwords = identical hashes)
- Fast hash functions allow brute force attacks

A secure implementation would use:
- Strong hashing algorithms (bcrypt, scrypt, Argon2)
- Unique salts for each password
- Appropriate work factors/iterations
- Proper key derivation functions`);
  };

  const transmissionDemo = () => {
    if (!transmissionData) {
      setEncryptionDemo('Please enter data to transmit');
      return;
    }

    const encoded = btoa(transmissionData);
    
    setEncryptionDemo(`⚠️ INSECURE DATA TRANSMISSION!

Original Data: ${transmissionData}
"Encrypted" (Base64): ${encoded}
Transmission: HTTP (unencrypted)

SECURITY ISSUES:
- Data transmitted over unencrypted HTTP
- Base64 is not encryption (easily decoded)
- Credentials visible in network traffic
- Man-in-the-middle attack vulnerability
- No integrity verification

SECURE TRANSMISSION REQUIREMENTS:
- Use HTTPS/TLS for all sensitive data
- Implement proper encryption (AES-256)
- Use authenticated encryption modes
- Implement certificate pinning
- Regular security audits of cryptographic implementations`);
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
          A02:2021 - Cryptographic Failures
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-red-900 mb-2">
            🚨 High Risk Vulnerability
          </h2>
          <p className="text-red-800">
            Cryptographic failures relate to failures in cryptography implementation that can lead to exposure of sensitive data. 
            This includes weak encryption, improper key management, and transmission of data in clear text.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔐 Weak Password Hashing Demo
          </h3>
          <p className="text-gray-600 mb-4">
            See how weak hashing algorithms fail to protect passwords:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password to "Hash"
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password..."
              />
            </div>
            <button
              onClick={weakHashDemo}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Generate Weak Hash
            </button>
            {hashResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{hashResult}</pre>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📡 Insecure Data Transmission
          </h3>
          <p className="text-gray-600 mb-4">
            Demonstrate insecure transmission of sensitive data:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sensitive Data (e.g., credentials)
              </label>
              <input
                type="text"
                value={transmissionData}
                onChange={(e) => setTransmissionData(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="username:password"
              />
            </div>
            <button
              onClick={transmissionDemo}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Transmit Data (Insecure)
            </button>
            {encryptionDemo && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{encryptionDemo}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Common Cryptographic Failures
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">1. Data Transmitted in Clear Text</h4>
              <p>HTTP, FTP, SMTP without encryption expose sensitive data.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">2. Weak Cryptographic Algorithms</h4>
              <p>DES, MD5, SHA1 are cryptographically broken and should not be used.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">3. Default or Weak Keys</h4>
              <p>Default encryption keys or weak key generation methods.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">4. Missing Encryption</h4>
              <p>Sensitive data stored without encryption in databases or files.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">5. Improper Certificate Validation</h4>
              <p>Not properly validating SSL/TLS certificates allows MITM attacks.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">6. Weak Random Number Generation</h4>
              <p>Predictable random numbers compromise cryptographic security.</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            🛡️ Cryptographic Best Practices
          </h3>
          <div className="space-y-4 text-sm text-green-800">
            <div>
              <h4 className="font-semibold text-green-900">Strong Encryption:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Use AES-256 for symmetric encryption</li>
                <li>Use RSA-4096 or ECC for asymmetric encryption</li>
                <li>Implement authenticated encryption (GCM, CCM)</li>
                <li>Use secure hash functions (SHA-256, SHA-3)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Key Management:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Generate keys using cryptographically secure RNG</li>
                <li>Implement proper key rotation policies</li>
                <li>Store keys securely (HSM, key vaults)</li>
                <li>Never hardcode keys in source code</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Password Security:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Use bcrypt, scrypt, or Argon2 for password hashing</li>
                <li>Implement unique salts for each password</li>
                <li>Use appropriate work factors</li>
                <li>Consider password policies and MFA</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Transmission Security:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Use TLS 1.3 for all data transmission</li>
                <li>Implement HSTS headers</li>
                <li>Use certificate pinning</li>
                <li>Validate all certificates properly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🔍 WAF Testing for Cryptographic Issues
        </h3>
        <p className="text-blue-800 mb-4">
          While WAFs cannot directly test cryptographic implementations, they can detect related attacks:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900">Detection Scenarios:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• Attempts to access unencrypted data endpoints</li>
              <li>• Hash collision attack patterns</li>
              <li>• Weak cipher negotiation attempts</li>
              <li>• SSL/TLS downgrade attacks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">Monitoring Points:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• HTTP traffic on sensitive endpoints</li>
              <li>• Unusual encryption-related parameters</li>
              <li>• Certificate validation bypass attempts</li>
              <li>• Weak cipher suite requests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}