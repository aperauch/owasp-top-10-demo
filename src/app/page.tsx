import Link from 'next/link';

const owaspTop10 = [
  {
    id: 'A01',
    name: 'Broken Access Control',
    description: 'Failures related to access control enforcement, allowing unauthorized access to data or functionality.',
    impact: 'High',
    path: '/vulnerabilities/broken-access-control',
    color: 'bg-red-100 border-red-300'
  },
  {
    id: 'A02',
    name: 'Cryptographic Failures',
    description: 'Failures related to cryptography that can lead to sensitive data exposure.',
    impact: 'High',
    path: '/vulnerabilities/cryptographic-failures',
    color: 'bg-orange-100 border-orange-300'
  },
  {
    id: 'A03',
    name: 'Injection',
    description: 'Flaws that allow untrusted data to be interpreted as commands or queries.',
    impact: 'High',
    path: '/vulnerabilities/injection',
    color: 'bg-red-100 border-red-300'
  },
  {
    id: 'A04',
    name: 'Insecure Design',
    description: 'Security risks related to design flaws and missing security controls.',
    impact: 'Medium',
    path: '/vulnerabilities/insecure-design',
    color: 'bg-yellow-100 border-yellow-300'
  },
  {
    id: 'A05',
    name: 'Security Misconfiguration',
    description: 'Insecure default configurations, incomplete configurations, and improper access controls.',
    impact: 'Medium',
    path: '/vulnerabilities/security-misconfiguration',
    color: 'bg-orange-100 border-orange-300'
  },
  {
    id: 'A06',
    name: 'Vulnerable and Outdated Components',
    description: 'Use of components with known vulnerabilities or outdated versions.',
    impact: 'Medium',
    path: '/vulnerabilities/vulnerable-components',
    color: 'bg-yellow-100 border-yellow-300'
  },
  {
    id: 'A07',
    name: 'Identification and Authentication Failures',
    description: 'Compromised authentication and session management functions.',
    impact: 'High',
    path: '/vulnerabilities/authentication-failures',
    color: 'bg-red-100 border-red-300'
  },
  {
    id: 'A08',
    name: 'Software and Data Integrity Failures',
    description: 'Assumptions about software updates and data without integrity verification.',
    impact: 'Medium',
    path: '/vulnerabilities/software-integrity-failures',
    color: 'bg-yellow-100 border-yellow-300'
  },
  {
    id: 'A09',
    name: 'Security Logging and Monitoring Failures',
    description: 'Insufficient logging and monitoring that prevents timely detection of security incidents.',
    impact: 'Low',
    path: '/vulnerabilities/logging-monitoring-failures',
    color: 'bg-green-100 border-green-300'
  },
  {
    id: 'A10',
    name: 'Server-Side Request Forgery (SSRF)',
    description: 'Flaws that allow attackers to make requests from the vulnerable server.',
    impact: 'Medium',
    path: '/vulnerabilities/ssrf',
    color: 'bg-orange-100 border-orange-300'
  }
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          OWASP Top 10 Security Vulnerabilities
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn about the most critical web application security risks through interactive examples and demonstrations. 
          This educational tool helps both technical and non-technical users understand common vulnerabilities and how to defend against them.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            href="/secure-coding"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View Secure Coding Practices
          </Link>
          <a
            href="https://owasp.org/www-project-top-ten/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Official OWASP Top 10
          </a>
        </div>
      </div>

      <div className="mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            🔒 Educational Purpose & WAF Testing
          </h2>
          <p className="text-blue-800">
            This application demonstrates security vulnerabilities in a controlled environment for educational purposes and WAF testing. 
            All examples are designed to help you understand attack vectors and implement proper defenses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {owaspTop10.map((vuln) => (
          <Link key={vuln.id} href={vuln.path}>
            <div className={`${vuln.color} border-2 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {vuln.id}: {vuln.name}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  vuln.impact === 'High' ? 'bg-red-200 text-red-800' :
                  vuln.impact === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-green-200 text-green-800'
                }`}>
                  {vuln.impact}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {vuln.description}
              </p>
              <div className="mt-4 text-right">
                <span className="text-blue-600 text-sm font-medium">
                  Learn More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Test Your WAF?
          </h2>
          <p className="text-gray-600 mb-6">
            Use these vulnerability demonstrations to test your Web Application Firewall (WAF) configuration 
            and ensure it properly blocks malicious requests.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/vulnerabilities/injection"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start with Injection Attacks
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
