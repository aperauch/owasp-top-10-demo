'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthenticationFailuresPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [sessionResult, setSessionResult] = useState('');

  const mockUsers = [
    { username: 'admin', password: 'admin', role: 'administrator' },
    { username: 'user', password: 'password', role: 'user' },
    { username: 'test', password: '123456', role: 'user' },
    { username: 'guest', password: 'guest', role: 'guest' }
  ];

  const handleWeakLogin = () => {
    if (!username || !password) {
      setLoginResult('Please enter username and password');
      return;
    }

    const user = mockUsers.find(u => u.username === username && u.password === password);
    const commonPasswords = ['password', '123456', 'admin', 'guest', 'test', '1234'];

    let result = '';

    if (user) {
      if (commonPasswords.includes(password.toLowerCase())) {
        result = `⚠️ WEAK AUTHENTICATION DETECTED!

Login successful for: ${username}
Role: ${user.role}

SECURITY ISSUES IDENTIFIED:
- Weak password used: "${password}"
- No account lockout after multiple attempts
- No multi-factor authentication
- Credentials transmitted without proper protection
- No password complexity requirements

ATTACK VECTORS ENABLED:
- Brute force attacks
- Dictionary attacks  
- Credential stuffing
- Session hijacking
- Password spraying

Session Token (insecure): ${btoa(username + ':' + Date.now())}`;
      } else {
        result = `Login successful for: ${username}\nRole: ${user.role}`;
      }
    } else {
      result = `❌ Login failed for: ${username}

INFORMATION DISCLOSURE:
This error message reveals whether the username exists in the system.

SECURITY ISSUES:
- Username enumeration possible
- No rate limiting implemented
- Detailed error messages
- No account lockout protection

Better approach: "Invalid username or password" for all failures`;
    }

    setLoginResult(result);
  };

  const handleSessionDemo = () => {
    if (!sessionToken) {
      setSessionResult('Please enter a session token');
      return;
    }

    let result = '';

    try {
      const decoded = atob(sessionToken);
      if (decoded.includes(':')) {
        const [user, timestamp] = decoded.split(':');
        result = `⚠️ INSECURE SESSION MANAGEMENT!

Session Token: ${sessionToken}
Decoded Content: ${decoded}
User: ${user}
Timestamp: ${new Date(parseInt(timestamp)).toISOString()}

VULNERABILITIES:
- Session token is predictable (Base64 encoded)
- Contains sensitive information in plain text
- No encryption or digital signature
- Vulnerable to session hijacking
- No session expiration enforcement
- Session fixation attacks possible

SECURE SESSION REQUIREMENTS:
- Cryptographically random session IDs
- Encrypted session data
- Proper session expiration
- Secure cookie flags (HttpOnly, Secure, SameSite)
- Session regeneration after authentication
- Server-side session validation`;
      } else {
        result = `Session token analysis: ${sessionToken}

This appears to be a more secure session token format.
However, proper validation should include:
- Cryptographic verification
- Expiration time checking
- Server-side session store lookup
- User permission validation`;
      }
    } catch {
      result = `Session token appears to be properly encoded/encrypted.
Unable to decode - this is good for security!

For testing purposes, try: ${btoa('admin:' + Date.now())}`;
    }

    setSessionResult(result);
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
          A07:2021 - Identification and Authentication Failures
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-red-900 mb-2">
            🚨 High Risk Vulnerability
          </h2>
          <p className="text-red-800">
            Authentication failures occur when applications don't properly implement identity confirmation, authentication, 
            or session management functions. Attackers can compromise passwords, keys, session tokens, or exploit implementation flaws.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔑 Weak Authentication Demo
          </h3>
          <p className="text-gray-600 mb-4">
            Try logging in with common weak credentials:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username (try: admin, user, test, guest)
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password (try: admin, password, 123456, guest)
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
              onClick={handleWeakLogin}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Login (Insecure)
            </button>
            {loginResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{loginResult}</pre>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎫 Session Management Flaws
          </h3>
          <p className="text-gray-600 mb-4">
            Test insecure session token handling:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Token (try a Base64 encoded value)
              </label>
              <input
                type="text"
                value={sessionToken}
                onChange={(e) => setSessionToken(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste session token here..."
              />
            </div>
            <div className="text-xs text-gray-500">
              <p className="font-semibold">Example weak tokens to try:</p>
              <ul className="mt-1 space-y-1 font-mono">
                <li>• {btoa('admin:' + Date.now())}</li>
                <li>• {btoa('user:' + (Date.now() - 1000))}</li>
                <li>• user123_session</li>
              </ul>
            </div>
            <button
              onClick={handleSessionDemo}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Validate Session
            </button>
            {sessionResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{sessionResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Common Authentication Failures
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">1. Weak Password Policies</h4>
              <p>Allowing simple, common, or default passwords that are easily guessed.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">2. Brute Force Attacks</h4>
              <p>No protection against automated credential stuffing or brute force attempts.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">3. Session Management Issues</h4>
              <p>Weak session IDs, session fixation, or improper session termination.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">4. Missing Multi-Factor Authentication</h4>
              <p>Relying solely on passwords without additional authentication factors.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">5. Information Disclosure</h4>
              <p>Error messages that reveal whether usernames exist in the system.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">6. Credential Recovery Flaws</h4>
              <p>Insecure password reset mechanisms or security question implementations.</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            🛡️ Authentication Security Controls
          </h3>
          <div className="space-y-4 text-sm text-green-800">
            <div>
              <h4 className="font-semibold text-green-900">Strong Authentication:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Implement multi-factor authentication (MFA)</li>
                <li>Use strong password policies and validation</li>
                <li>Implement account lockout after failed attempts</li>
                <li>Use secure password recovery mechanisms</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Session Management:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Generate cryptographically random session IDs</li>
                <li>Implement proper session expiration</li>
                <li>Use secure cookie attributes (HttpOnly, Secure, SameSite)</li>
                <li>Regenerate session IDs after authentication</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Credential Protection:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Use strong password hashing (bcrypt, scrypt, Argon2)</li>
                <li>Implement rate limiting and CAPTCHA</li>
                <li>Monitor for suspicious authentication patterns</li>
                <li>Use generic error messages to prevent enumeration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🔍 WAF Authentication Attack Detection
        </h3>
        <p className="text-blue-800 mb-4">
          Configure your WAF to detect these authentication attack patterns:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900">Brute Force Indicators:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• High frequency login attempts from single IP</li>
              <li>• Sequential password attempts (123456, password, admin)</li>
              <li>• Multiple failed logins for same username</li>
              <li>• Distributed brute force across multiple IPs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">Session Attack Patterns:</h4>
            <ul className="text-blue-700 mt-2 space-y-1">
              <li>• Session fixation attempts</li>
              <li>• Invalid or malformed session tokens</li>
              <li>• Session hijacking indicators</li>
              <li>• Concurrent sessions from different locations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}