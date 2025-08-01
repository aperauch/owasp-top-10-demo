'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const owaspTop10 = [
  { 
    id: 'A01', 
    name: 'Broken Access Control', 
    path: '/vulnerabilities/broken-access-control',
    severity: 'Critical',
    shortName: 'Access Control'
  },
  { 
    id: 'A02', 
    name: 'Cryptographic Failures', 
    path: '/vulnerabilities/cryptographic-failures',
    severity: 'High',
    shortName: 'Cryptographic'
  },
  { 
    id: 'A03', 
    name: 'Injection', 
    path: '/vulnerabilities/injection',
    severity: 'Critical',
    shortName: 'Injection'
  },
  { 
    id: 'A04', 
    name: 'Insecure Design', 
    path: '/vulnerabilities/insecure-design',
    severity: 'Medium',
    shortName: 'Insecure Design'
  },
  { 
    id: 'A05', 
    name: 'Security Misconfiguration', 
    path: '/vulnerabilities/security-misconfiguration',
    severity: 'Medium',
    shortName: 'Misconfiguration'
  },
  { 
    id: 'A06', 
    name: 'Vulnerable Components', 
    path: '/vulnerabilities/vulnerable-components',
    severity: 'Medium',
    shortName: 'Vuln Components'
  },
  { 
    id: 'A07', 
    name: 'Authentication Failures', 
    path: '/vulnerabilities/authentication-failures',
    severity: 'High',
    shortName: 'Authentication'
  },
  { 
    id: 'A08', 
    name: 'Software Integrity Failures', 
    path: '/vulnerabilities/software-integrity-failures',
    severity: 'Medium',
    shortName: 'Integrity Failures'
  },
  { 
    id: 'A09', 
    name: 'Logging & Monitoring Failures', 
    path: '/vulnerabilities/logging-monitoring-failures',
    severity: 'Low',
    shortName: 'Logging/Monitoring'
  },
  { 
    id: 'A10', 
    name: 'Server-Side Request Forgery', 
    path: '/vulnerabilities/ssrf',
    severity: 'Medium',
    shortName: 'SSRF'
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isVulnMenuOpen, setIsVulnMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVulnMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsVulnMenuOpen(false);
  }, [pathname]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const isVulnPath = pathname.startsWith('/vulnerabilities/');

  return (
    <nav className="bg-white shadow-lg border-b-4 border-red-600" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo and main navigation */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex-shrink-0 flex items-center text-red-600 hover:text-red-700 transition-colors"
              aria-label="OWASP Top 10 Demo Home"
            >
              <svg className="h-8 w-8 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="text-xl font-bold">OWASP Top 10 Demo</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block ml-10">
              <div className="flex items-baseline space-x-1">
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === '/' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  Home
                </Link>
                
                {/* Vulnerabilities Dropdown */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsVulnMenuOpen(!isVulnMenuOpen)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                      isVulnPath 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }`}
                    aria-expanded={isVulnMenuOpen}
                    aria-haspopup="true"
                    aria-label="Vulnerabilities menu"
                  >
                    Vulnerabilities
                    <svg 
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${isVulnMenuOpen ? 'rotate-180' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isVulnMenuOpen && (
                    <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                          OWASP Top 10 Vulnerabilities
                        </h3>
                        <div className="space-y-1 max-h-96 overflow-y-auto">
                          {owaspTop10.map((vuln) => (
                            <Link
                              key={vuln.id}
                              href={vuln.path}
                              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                                pathname === vuln.path
                                  ? 'bg-red-50 text-red-700 border-l-4 border-red-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                              }`}
                              onClick={() => setIsVulnMenuOpen(false)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-500 w-8">{vuln.id}</span>
                                  <span className="font-medium">{vuln.shortName}</span>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                                  {vuln.severity}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link
                  href="/waf-test-dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === '/waf-test-dashboard' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  WAF Tester
                </Link>
                
                <Link
                  href="/secure-coding"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === '/secure-coding' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  Secure Coding
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg 
                className={`h-6 w-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === '/' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              Home
            </Link>
            
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-semibold text-gray-900 border-b border-gray-200">
                Vulnerabilities
              </div>
              {owaspTop10.map((vuln) => (
                <Link
                  key={vuln.id}
                  href={vuln.path}
                  className={`block px-6 py-2 rounded-md text-sm transition-colors ${
                    pathname === vuln.path
                      ? 'bg-red-50 text-red-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{vuln.id}: {vuln.shortName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            
            <Link
              href="/waf-test-dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === '/waf-test-dashboard' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              WAF Tester
            </Link>
            
            <Link
              href="/secure-coding"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === '/secure-coding' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              Secure Coding
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}