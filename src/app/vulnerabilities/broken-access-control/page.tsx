'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BrokenAccessControlPage() {
  const [userId, setUserId] = useState('');
  const [userResult, setUserResult] = useState('');
  const [adminAction, setAdminAction] = useState('');
  const [adminResult, setAdminResult] = useState('');

  const mockUsers = [
    { id: '1', username: 'john_user', role: 'user', email: 'john@example.com', salary: 'RESTRICTED' },
    { id: '2', username: 'jane_admin', role: 'admin', email: 'jane@example.com', salary: 'RESTRICTED' },
    { id: '3', username: 'bob_user', role: 'user', email: 'bob@example.com', salary: 'RESTRICTED' },
    { id: '999', username: 'super_admin', role: 'super_admin', email: 'admin@company.com', salary: '$150,000' }
  ];

  const handleUserLookup = () => {
    if (!userId) {
      setUserResult('Please enter a user ID');
      return;
    }

    const user = mockUsers.find(u => u.id === userId);
    
    if (user) {
      if (userId === '999') {
        setUserResult(`⚠️ UNAUTHORIZED ACCESS DETECTED!
        
You've accessed a privileged account that should be restricted:
${JSON.stringify(user, null, 2)}

In a real application, this could expose:
- Administrative credentials
- Sensitive employee data
- System configuration details
- Financial information`);
      } else {
        setUserResult(`User Information:
${JSON.stringify(user, null, 2)}`);
      }
    } else {
      setUserResult('User not found');
    }
  };

  const handleAdminAction = () => {
    if (!adminAction) {
      setAdminResult('Please select an action');
      return;
    }

    setAdminResult(`⚠️ UNAUTHORIZED ADMIN ACTION ATTEMPTED!
    
Action: ${adminAction}
Status: This would normally require admin privileges

In a vulnerable application, this could allow:
- Unauthorized data modification
- System configuration changes
- User privilege escalation
- Access to restricted functionality

A properly secured application would:
- Verify user authentication
- Check authorization levels  
- Log all admin actions
- Implement role-based access control`);
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
          A01:2021 - Broken Access Control
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-red-900 mb-2">
            🚨 Critical Risk Vulnerability
          </h2>
          <p className="text-red-800">
            Access control enforces policy so users cannot act outside of their intended permissions. 
            Failures typically lead to unauthorized information disclosure, modification, or destruction of data.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔓 Insecure Direct Object Reference (IDOR)
          </h3>
          <p className="text-gray-600 mb-4">
            Try accessing different user accounts by changing the ID parameter:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID (try: 1, 2, 3, or 999 for admin)
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user ID..."
              />
            </div>
            <button
              onClick={handleUserLookup}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
            >
              View User Profile
            </button>
            {userResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{userResult}</pre>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            ⚡ Privilege Escalation Demo
          </h3>
          <p className="text-gray-600 mb-4">
            Attempt to perform administrative actions without proper authorization:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Administrative Action
              </label>
              <select
                value={adminAction}
                onChange={(e) => setAdminAction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an action...</option>
                <option value="Delete User Account">Delete User Account</option>
                <option value="Modify System Settings">Modify System Settings</option>
                <option value="Access Financial Reports">Access Financial Reports</option>
                <option value="Grant Admin Privileges">Grant Admin Privileges</option>
              </select>
            </div>
            <button
              onClick={handleAdminAction}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Execute Action
            </button>
            {adminResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{adminResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Common Access Control Failures
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">1. Insecure Direct Object References</h4>
              <p>URLs expose internal object references allowing unauthorized access to data.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">2. Missing Function Level Access Control</h4>
              <p>Administrative functions accessible to unauthorized users.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">3. Privilege Escalation</h4>
              <p>Users can access functions or resources beyond their permission level.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">4. Metadata Manipulation</h4>
              <p>JWT tokens, cookies, or hidden form fields can be tampered with.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">5. CORS Misconfigurations</h4>
              <p>Improper Cross-Origin Resource Sharing settings allow unauthorized access.</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            🛡️ Prevention & Best Practices
          </h3>
          <div className="space-y-4 text-sm text-green-800">
            <div>
              <h4 className="font-semibold text-green-900">Access Control Implementation:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Implement role-based access control (RBAC)</li>
                <li>Use attribute-based access control (ABAC) for complex scenarios</li>
                <li>Enforce least privilege principle</li>
                <li>Implement proper session management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Security Measures:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Validate permissions on server-side for every request</li>
                <li>Use indirect object references (UUIDs instead of sequential IDs)</li>
                <li>Implement rate limiting and monitoring</li>
                <li>Regular access control reviews and audits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Code-Level Controls:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Centralized access control mechanism</li>
                <li>Fail securely (deny by default)</li>
                <li>Log access control failures</li>
                <li>Use security frameworks and libraries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🔍 WAF Testing Scenarios
        </h3>
        <p className="text-blue-800 mb-4">
          Test your WAF's ability to detect access control bypass attempts:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900">URL Manipulation Tests:</h4>
            <ul className="font-mono text-blue-700 mt-2 space-y-1">
              <li>/user/profile?id=1 → /user/profile?id=999</li>
              <li>/api/user/1 → /api/user/admin</li>
              <li>/admin/panel → Direct access attempts</li>
              <li>../admin/config.php → Path traversal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">HTTP Method Tests:</h4>
            <ul className="font-mono text-blue-700 mt-2 space-y-1">
              <li>GET /api/users → POST /api/users</li>
              <li>PUT /api/admin/settings</li>
              <li>DELETE /api/user/account</li>
              <li>OPTIONS /admin/* (method discovery)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}