# OWASP Top 10 Security Vulnerabilities Demo

A Next.js educational web application that demonstrates the OWASP Top 10 security vulnerabilities through interactive examples and explanations. This tool is designed for both technical and non-technical audiences to learn about web application security threats and defensive measures.

## 🎯 Purpose

This application serves as:
- **Educational Tool**: Learn about the most critical web application security risks
- **WAF Testing Platform**: Test your Web Application Firewall (WAF) configuration with real attack patterns
- **Security Training**: Understand how vulnerabilities work and how to prevent them
- **Reference Guide**: Access secure coding best practices and mitigation strategies

## 🔒 Featured OWASP Top 10 (2021)

The application covers all 10 vulnerabilities with interactive demonstrations:

1. **A01:2021 - Broken Access Control** - Authorization bypass and privilege escalation
2. **A02:2021 - Cryptographic Failures** - Weak encryption and data exposure
3. **A03:2021 - Injection** - SQL injection and Cross-Site Scripting (XSS)
4. **A04:2021 - Insecure Design** - Design flaws and missing security controls
5. **A05:2021 - Security Misconfiguration** - Insecure defaults and configurations
6. **A06:2021 - Vulnerable and Outdated Components** - Component vulnerabilities
7. **A07:2021 - Identification and Authentication Failures** - Weak authentication
8. **A08:2021 - Software and Data Integrity Failures** - Integrity verification issues
9. **A09:2021 - Security Logging and Monitoring Failures** - Insufficient monitoring
10. **A10:2021 - Server-Side Request Forgery (SSRF)** - Internal service attacks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🔍 WAF Testing

This application is specifically designed to help test WAF configurations. Each vulnerability demonstration includes:

- **Attack Payloads**: Real-world attack strings and patterns
- **Detection Rules**: Suggested WAF rules and patterns to detect attacks
- **Testing Scenarios**: Specific test cases for WAF validation

### Example Test Payloads

**SQL Injection:**
```
' OR '1'='1' --
' UNION SELECT * FROM users --
'; DROP TABLE users; --
```

**XSS:**
```
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')
```

**SSRF:**
```
http://localhost:8080/admin
http://127.0.0.1:22
http://169.254.169.254/metadata
```

## 🛡️ Security Features

- **Educational Focus**: All demonstrations are clearly marked as educational
- **Safe Environment**: No actual vulnerabilities exist in the application code
- **Defensive Examples**: Each vulnerability includes prevention techniques
- **Secure Coding Guide**: Comprehensive best practices section

## 📚 Learning Resources

Each vulnerability page includes:
- Clear explanations suitable for all skill levels
- Interactive demonstrations showing how attacks work
- Real-world impact examples
- Prevention strategies and secure coding practices
- WAF detection rules and patterns

## 🧪 Technology Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready
- **Standards**: OWASP Top 10 2021

## ⚠️ Disclaimer

**For Educational and Testing Purposes Only**

This application contains simulated security vulnerabilities for educational purposes. Do not use any techniques demonstrated here against systems you do not own or have explicit permission to test. Always follow responsible disclosure practices and applicable laws.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and ensure all security demonstrations remain educational and safe.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions about web application security or this educational tool, please refer to:
- [OWASP Top 10 Project](https://owasp.org/www-project-top-ten/)
- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
