import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SecurityCompliance = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedPolicy, setExpandedPolicy] = useState(null);

  // Mock audit logs
  const auditLogs = [
    {
      id: 'AUD001',
      timestamp: '2024-03-22T14:30:00Z',
      action: 'User Login',
      user: 'admin@impactx.org',
      ip: '192.168.1.100',
      location: 'San Francisco, CA',
      status: 'success',
      details: 'Successful login with 2FA'
    },
    {
      id: 'AUD002',
      timestamp: '2024-03-22T13:45:00Z',
      action: 'Fund Allocation',
      user: 'finance@impactx.org',
      ip: '192.168.1.105',
      location: 'New York, NY',
      status: 'success',
      details: 'Allocated 5,000 ALGO to Disaster Relief Philippines'
    },
    {
      id: 'AUD003',
      timestamp: '2024-03-22T12:20:00Z',
      action: 'Data Export',
      user: 'analyst@impactx.org',
      ip: '192.168.1.110',
      location: 'London, UK',
      status: 'success',
      details: 'Exported analytics report for Q1 2024'
    },
    {
      id: 'AUD004',
      timestamp: '2024-03-22T11:05:00Z',
      action: 'Failed Login Attempt',
      user: 'unknown',
      ip: '203.0.113.45',
      location: 'Moscow, RU',
      status: 'failed',
      details: 'Invalid credentials attempt'
    },
    {
      id: 'AUD005',
      timestamp: '2024-03-22T09:30:00Z',
      action: 'Smart Contract Deployment',
      user: 'dev@impactx.org',
      ip: '192.168.1.115',
      location: 'Berlin, DE',
      status: 'success',
      details: 'Deployed updated VerificationEngine contract'
    }
  ];

  // Mock compliance policies
  const compliancePolicies = [
    {
      id: 'policy-1',
      title: 'Data Protection Policy',
      category: 'Data Privacy',
      lastUpdated: '2024-03-15',
      status: 'active',
      summary: 'This policy outlines how we collect, process, and protect personal data in compliance with GDPR and other applicable regulations.',
      content: `1. Data Collection
We collect personal data only when necessary for our humanitarian mission. This includes donor information, NGO partner details, and beneficiary data for impact tracking.

2. Data Processing
All data processing is conducted with explicit consent and for specified, legitimate purposes. We implement strict access controls and encryption for all data processing activities.

3. Data Storage
Personal data is stored securely using industry-standard encryption. Data is retained only for as long as necessary to fulfill its intended purpose or as required by law.

4. Data Subject Rights
Individuals have the right to access, rectify, erase, and restrict processing of their personal data. We provide mechanisms for individuals to exercise these rights.

5. Data Transfers
When transferring data internationally, we ensure adequate protection through standard contractual clauses or other approved mechanisms.

6. Breach Notification
In the event of a data breach, we will notify affected individuals and relevant authorities within 72 hours of becoming aware of the breach.`
    },
    {
      id: 'policy-2',
      title: 'Encryption Standards',
      category: 'Technical Security',
      lastUpdated: '2024-03-10',
      status: 'active',
      summary: 'Our encryption standards ensure that all sensitive data is protected both in transit and at rest using industry-leading cryptographic protocols.',
      content: `1. Data in Transit
All data transmitted over networks is encrypted using TLS 1.3. API communications use mutual TLS authentication where appropriate.

2. Data at Rest
Sensitive data stored in databases is encrypted using AES-256 encryption. Encryption keys are managed through our Hardware Security Module (HSM).

3. Key Management
Encryption keys are rotated annually and managed through a centralized key management system with strict access controls.

4. End-to-End Encryption
Communications between our platform and partner organizations use end-to-end encryption to ensure data privacy.

5. Code Security
All source code is scanned for vulnerabilities using automated tools. Secrets are never stored in code repositories.

6. Access Controls
Access to encryption keys and sensitive data is restricted based on the principle of least privilege.`
    },
    {
      id: 'policy-3',
      title: 'GDPR Compliance Framework',
      category: 'Regulatory Compliance',
      lastUpdated: '2024-03-05',
      status: 'active',
      summary: 'Our comprehensive GDPR compliance framework ensures we meet all requirements of the General Data Protection Regulation for EU residents.',
      content: `1. Lawful Basis for Processing
We process personal data based on legitimate interests related to our humanitarian mission, with appropriate safeguards for individual rights.

2. Data Minimization
We collect only the minimum amount of personal data necessary for our operations and impact tracking.

3. Purpose Limitation
Personal data is collected for specified, explicit, and legitimate purposes and not further processed in a manner incompatible with those purposes.

4. Storage Limitation
Personal data is kept in a form which permits identification of data subjects for no longer than is necessary for the purposes for which the personal data are processed.

5. Integrity and Confidentiality
We ensure appropriate security of personal data, including protection against unauthorized or unlawful processing and against accidental loss, destruction, or damage.

6. Accountability
We implement appropriate technical and organizational measures to ensure and demonstrate compliance with the GDPR.`
    }
  ];

  // Mock certifications
  const certifications = [
    {
      id: 'cert-1',
      name: 'ISO 27001 Information Security Management',
      issuer: 'International Organization for Standardization',
      issued: '2024-01-15',
      expires: '2027-01-15',
      status: 'active',
      description: 'Certification for our comprehensive information security management system.'
    },
    {
      id: 'cert-2',
      name: 'SOC 2 Type II',
      issuer: 'American Institute of CPAs',
      issued: '2023-11-30',
      expires: '2024-11-30',
      status: 'active',
      description: 'Certification for our security, availability, and confidentiality controls.'
    },
    {
      id: 'cert-3',
      name: 'GDPR Compliance Certificate',
      issuer: 'European Data Protection Board',
      issued: '2024-02-20',
      expires: '2025-02-20',
      status: 'active',
      description: 'Certificate of compliance with GDPR requirements for data processing.'
    },
    {
      id: 'cert-4',
      name: 'Algorand Security Certification',
      issuer: 'Algorand Foundation',
      issued: '2024-03-01',
      expires: '2025-03-01',
      status: 'active',
      description: 'Certification for secure development and deployment practices on Algorand.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const togglePolicy = (policyId) => {
    setExpandedPolicy(expandedPolicy === policyId ? null : policyId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('security.title')}</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('security.description')}
          </p>
        </div>

        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">99.9%</div>
            <div className="text-gray-600 mt-1">{t('security.stats.uptime')}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600">256-bit</div>
            <div className="text-gray-600 mt-1">{t('security.stats.encryption')}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">ISO 27001</div>
            <div className="text-gray-600 mt-1">{t('security.stats.certified')}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">0</div>
            <div className="text-gray-600 mt-1">{t('security.stats.breaches')}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('security.tabs.overview')}
              </button>
              <button
                onClick={() => setActiveTab('policies')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'policies'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('security.tabs.policies')}
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'audit'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('security.tabs.audit')}
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'certifications'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('security.tabs.certifications')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                    <h2 className="text-2xl font-bold mb-4">{t('security.overview.securityFirst')}</h2>
                    <p className="mb-6">{t('security.overview.securityFirstDesc')}</p>
                    <div className="flex items-center">
                      <div className="mr-4 bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">AES-256</div>
                        <div>{t('security.overview.encryption')}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
                    <h2 className="text-2xl font-bold mb-4">{t('security.overview.compliance')}</h2>
                    <p className="mb-6">{t('security.overview.complianceDesc')}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">GDPR</span>
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">ISO 27001</span>
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">SOC 2</span>
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Algorand</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="border border-gray-200 rounded-lg p-5">
                    <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('security.overview.accessControl')}</h3>
                    <p className="text-gray-600">{t('security.overview.accessControlDesc')}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('security.overview.dataProtection')}</h3>
                    <p className="text-gray-600">{t('security.overview.dataProtectionDesc')}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('security.overview.regularAudits')}</h3>
                    <p className="text-gray-600">{t('security.overview.regularAuditsDesc')}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        {t('security.overview.note')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Policies Tab */}
            {activeTab === 'policies' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('security.policies.title')}</h2>
                <div className="space-y-4">
                  {compliancePolicies.map((policy) => (
                    <div key={policy.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => togglePolicy(policy.id)}
                        className="w-full flex justify-between items-center p-5 text-left"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{policy.title}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-500">{policy.category}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{t('security.policies.lastUpdated')}: {policy.lastUpdated}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${getStatusColor(policy.status)}`}>
                            {policy.status}
                          </span>
                          <svg 
                            className={`w-5 h-5 text-gray-500 transform transition-transform ${expandedPolicy === policy.id ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      
                      {expandedPolicy === policy.id && (
                        <div className="px-5 pb-5 border-t border-gray-200 pt-4">
                          <p className="text-gray-600 mb-4">{policy.summary}</p>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                              {policy.content}
                            </pre>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                              {t('security.policies.download')}
                              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audit Logs Tab */}
            {activeTab === 'audit' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">{t('security.audit.title')}</h2>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    {t('security.audit.export')}
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('security.audit.timestamp')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('security.audit.action')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('security.audit.user')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('security.audit.location')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('security.audit.status')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('security.audit.details')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatTime(log.timestamp)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {log.action}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.location}
                            <div className="text-xs text-gray-400">{log.ip}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(log.status)}`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {log.details}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('security.certifications.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="border border-gray-200 rounded-lg p-6 flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="bg-green-100 rounded-lg w-16 h-16 flex items-center justify-center">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{cert.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                            {cert.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{cert.issuer}</div>
                        <p className="mt-2 text-gray-600">{cert.description}</p>
                        <div className="mt-3 flex text-sm">
                          <div className="text-gray-500">
                            {t('security.certifications.issued')}: {cert.issued}
                          </div>
                          <div className="mx-2 text-gray-300">•</div>
                          <div className="text-gray-500">
                            {t('security.certifications.expires')}: {cert.expires}
                          </div>
                        </div>
                        <div className="mt-3">
                          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            {t('security.certifications.view')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('security.documentation')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('security.docs.security')}</h3>
              <p className="text-gray-600 mb-4">{t('security.docs.securityDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('security.readMore')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('security.docs.privacy')}</h3>
              <p className="text-gray-600 mb-4">{t('security.docs.privacyDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('security.learn')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('security.docs.compliance')}</h3>
              <p className="text-gray-600 mb-4">{t('security.docs.complianceDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('security.explore')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCompliance;