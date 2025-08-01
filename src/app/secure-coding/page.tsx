import Link from 'next/link';

export default function SecureCodingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          ← Back to OWASP Top 10
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Secure Coding Best Practices
        </h1>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-green-900 mb-2">
            🛡️ Building Secure Applications
          </h2>
          <p className="text-green-800">
            Learn how to implement security controls and best practices to prevent the OWASP Top 10 vulnerabilities. 
            These guidelines help developers build more secure applications from the ground up.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔐 Input Validation & Sanitization
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">Server-Side Validation</h4>
              <div className="bg-gray-50 p-3 rounded-md mt-2">
                <code className="text-xs">
                  {`// Example: Input validation in Node.js
function validateEmail(email) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  return email.trim().toLowerCase();
}`}
                </code>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">SQL Injection Prevention</h4>
              <div className="bg-gray-50 p-3 rounded-md mt-2">
                <code className="text-xs">
                  {`// Use parameterized queries
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId], (err, results) => {
  // Handle results safely
});`}
                </code>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">XSS Prevention</h4>
              <div className="bg-gray-50 p-3 rounded-md mt-2">
                <code className="text-xs">
                  {`// Escape HTML output
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};`}
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔒 Authentication & Authorization
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">Secure Password Hashing</h4>
              <div className="bg-gray-50 p-3 rounded-md mt-2">
                <code className="text-xs">
                  {`// Use bcrypt for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 12;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}`}
                </code>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">JWT Security</h4>
              <div className="bg-gray-50 p-3 rounded-md mt-2">
                <code className="text-xs">
                  {`// Secure JWT implementation
const jwt = require('jsonwebtoken');

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
    issuer: 'your-app',
    audience: 'your-users'
  });
}`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🌐 Secure Communication
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">HTTPS Configuration</h4>
              <div className="bg-gray-50 p-3 rounded-md mt-2">
                <code className="text-xs">
                  {`// Express.js HTTPS setup
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, app).listen(443);

// Force HTTPS redirect
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(\`https://\${req.headers.host}\${req.url}\`);
  }
  next();
});`}
                </code>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Security Headers</h4>
              <div className="bg-gray-50 p-3 rounded-md mt-2">
                <code className="text-xs">
                  {`// Essential security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 
    'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'");
  next();
});`}
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📊 Logging & Monitoring
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">Security Event Logging</h4>
              <div className="bg-gray-50 p-3 rounded-md mt-2">
                <code className="text-xs">
                  {`// Comprehensive security logging
const winston = require('winston');

const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ 
      filename: 'security.log' 
    })
  ]
});

// Log security events
function logSecurityEvent(event, details) {
  securityLogger.info({
    timestamp: new Date().toISOString(),
    event: event,
    ip: details.ip,
    userAgent: details.userAgent,
    userId: details.userId,
    details: details
  });
}`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">
          🔧 Development Lifecycle Security
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Planning Phase</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Threat modeling</li>
              <li>• Security requirements gathering</li>
              <li>• Risk assessment</li>
              <li>• Security architecture design</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Development Phase</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Secure coding standards</li>
              <li>• Code reviews</li>
              <li>• Static analysis tools (SAST)</li>
              <li>• Dependency scanning</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Testing Phase</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Dynamic analysis (DAST)</li>
              <li>• Penetration testing</li>
              <li>• Security test cases</li>
              <li>• Vulnerability assessments</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🛠️ Security Tools & Libraries
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">Static Analysis Tools</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>SonarQube - Code quality and security</li>
                <li>ESLint Security Plugin - JavaScript security rules</li>
                <li>Bandit - Python security linter</li>
                <li>Brakeman - Ruby on Rails security scanner</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Security Libraries</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Helmet.js - Express.js security headers</li>
                <li>OWASP ESAPI - Security controls library</li>
                <li>DOMPurify - HTML sanitization</li>
                <li>bcrypt - Password hashing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Dependency Management</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>npm audit - Node.js vulnerability scanning</li>
                <li>Snyk - Dependency vulnerability monitoring</li>
                <li>OWASP Dependency Check</li>
                <li>GitHub Dependabot</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📋 Security Checklist
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">Before Deployment</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>All user inputs validated and sanitized</li>
                <li>Authentication and authorization implemented</li>
                <li>HTTPS enabled with strong TLS configuration</li>
                <li>Security headers configured</li>
                <li>Error handling doesn't leak information</li>
                <li>Logging and monitoring implemented</li>
                <li>Dependencies updated and scanned</li>
                <li>Security testing completed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Post-Deployment</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Regular security updates</li>
                <li>Continuous monitoring</li>
                <li>Incident response plan</li>
                <li>Regular security assessments</li>
                <li>Security awareness training</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 Ready to Test Your Security?
          </h2>
          <p className="text-gray-600 mb-6">
            Now that you understand secure coding practices, test your knowledge and your WAF configuration 
            by exploring the vulnerability demonstrations.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/vulnerabilities/injection"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Test Injection Defenses
            </Link>
            <Link
              href="/vulnerabilities/broken-access-control"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Test Access Controls
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}