import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Documentation = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  // Documentation structure
  const documentationCategories = [
    {
      id: 'vision',
      title: t('docs.vision'),
      icon: '🎯',
      documents: [
        {
          id: 'vision-guide',
          title: t('docs.visionGuide'),
          description: t('docs.visionGuideDesc'),
          file: '/docs/vision-guide.md',
          category: 'vision'
        },
        {
          id: 'problem-statement',
          title: t('docs.problemStatement'),
          description: t('docs.problemStatementDesc'),
          file: '/docs/problem-statement.md',
          category: 'vision'
        },
        {
          id: 'solution-overview',
          title: t('docs.solutionOverview'),
          description: t('docs.solutionOverviewDesc'),
          file: '/docs/solution-overview.md',
          category: 'vision'
        }
      ]
    },
    {
      id: 'deployment',
      title: t('docs.deployment'),
      icon: '🚀',
      documents: [
        {
          id: 'deployment-guide',
          title: t('docs.deploymentGuide'),
          description: t('docs.deploymentGuideDesc'),
          file: '/docs/deployment-guide.md',
          category: 'deployment'
        },
        {
          id: 'kubernetes',
          title: t('docs.kubernetesGuide'),
          description: t('docs.kubernetesGuideDesc'),
          file: '/docs/kubernetes.md',
          category: 'deployment'
        },
        {
          id: 'docker',
          title: t('docs.dockerGuide'),
          description: t('docs.dockerGuideDesc'),
          file: '/docs/docker.md',
          category: 'deployment'
        },
        {
          id: 'ci-cd',
          title: t('docs.ciCdGuide'),
          description: t('docs.ciCdGuideDesc'),
          file: '/docs/ci-cd.md',
          category: 'deployment'
        }
      ]
    },
    {
      id: 'security',
      title: t('docs.security'),
      icon: '🔒',
      documents: [
        {
          id: 'security-practices',
          title: t('docs.securityPractices'),
          description: t('docs.securityPracticesDesc'),
          file: '/docs/security-practices.md',
          category: 'security'
        },
        {
          id: 'privacy-policy',
          title: t('docs.privacyPolicy'),
          description: t('docs.privacyPolicyDesc'),
          file: '/docs/privacy-policy.md',
          category: 'security'
        },
        {
          id: 'compliance',
          title: t('docs.compliance'),
          description: t('docs.complianceDesc'),
          file: '/docs/compliance.md',
          category: 'security'
        }
      ]
    },
    {
      id: 'devops',
      title: t('docs.devOps'),
      icon: '⚙️',
      documents: [
        {
          id: 'api-documentation',
          title: t('docs.apiDocumentation'),
          description: t('docs.apiDocumentationDesc'),
          file: '/docs/api-documentation.md',
          category: 'devops'
        },
        {
          id: 'database-schema',
          title: t('docs.databaseSchema'),
          description: t('docs.databaseSchemaDesc'),
          file: '/docs/database-schema.md',
          category: 'devops'
        },
        {
          id: 'monitoring',
          title: t('docs.monitoringGuide'),
          description: t('docs.monitoringGuideDesc'),
          file: '/docs/monitoring.md',
          category: 'devops'
        },
        {
          id: 'logging',
          title: t('docs.loggingGuide'),
          description: t('docs.loggingGuideDesc'),
          file: '/docs/logging.md',
          category: 'devops'
        }
      ]
    },
    {
      id: 'user',
      title: t('docs.userGuides'),
      icon: '📖',
      documents: [
        {
          id: 'user-manual',
          title: t('docs.userManual'),
          description: t('docs.userManualDesc'),
          file: '/docs/user-manual.md',
          category: 'user'
        },
        {
          id: 'ngo-guide',
          title: t('docs.ngoGuide'),
          description: t('docs.ngoGuideDesc'),
          file: '/docs/ngo-guide.md',
          category: 'user'
        },
        {
          id: 'volunteer-guide',
          title: t('docs.volunteerGuide'),
          description: t('docs.volunteerGuideDesc'),
          file: '/docs/volunteer-guide.md',
          category: 'user'
        }
      ]
    },
    {
      id: 'technical',
      title: t('docs.technicalDocs'),
      icon: '💻',
      documents: [
        {
          id: 'architecture',
          title: t('docs.architecture'),
          description: t('docs.architectureDesc'),
          file: '/docs/architecture.md',
          category: 'technical'
        },
        {
          id: 'smart-contracts',
          title: t('docs.smartContracts'),
          description: t('docs.smartContractsDesc'),
          file: '/docs/smart-contracts.md',
          category: 'technical'
        },
        {
          id: 'blockchain',
          title: t('docs.blockchainIntegration'),
          description: t('docs.blockchainIntegrationDesc'),
          file: '/docs/blockchain.md',
          category: 'technical'
        },
        {
          id: 'oracles',
          title: t('docs.oracleSystem'),
          description: t('docs.oracleSystemDesc'),
          file: '/docs/oracles.md',
          category: 'technical'
        }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const filteredCategories = documentationCategories.map(category => ({
    ...category,
    documents: category.documents.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.documents.length > 0);

  const downloadDocument = (file) => {
    // In a real application, this would trigger a download
    console.log(`Downloading ${file}`);
    alert(t('docs.downloadStarted', { file }));
  };

  return (
    <div className="documentation-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{t('docs.title')}</h1>
        <p className="text-gray-600 mb-8">{t('docs.subtitle')}</p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder={t('docs.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-5 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">36</div>
            <div className="text-gray-600 text-sm">{t('docs.totalDocuments')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-5 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">12</div>
            <div className="text-gray-600 text-sm">{t('docs.userGuides')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-5 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">18</div>
            <div className="text-gray-600 text-sm">{t('docs.technicalDocsCount')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-5 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">6</div>
            <div className="text-gray-600 text-sm">{t('docs.categories')}</div>
          </div>
        </div>

        {/* Documentation Categories */}
        <div className="space-y-6">
          {filteredCategories.map(category => (
            <div key={category.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 rounded-t-lg transition duration-300"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                  <span className="ml-3 bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {category.documents.length} {t('docs.documents')}
                  </span>
                </div>
                <svg 
                  className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${expandedCategories[category.id] ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {expandedCategories[category.id] && (
                <div className="p-5 bg-white rounded-b-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.documents.map(document => (
                      <div key={document.id} className="border rounded-lg p-4 hover:shadow-md transition duration-300">
                        <h3 className="font-medium text-lg mb-2">{document.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{document.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {category.title}
                          </span>
                          <button
                            onClick={() => downloadDocument(document.file)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            {t('docs.download')}
                            <svg className="ml-1 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t('docs.quickLinks')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/docs/getting-started.md" 
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{t('docs.gettingStarted')}</h3>
                  <p className="text-sm text-gray-500">{t('docs.gettingStartedDesc')}</p>
                </div>
              </div>
            </a>
            <a 
              href="/docs/api-reference.md" 
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{t('docs.apiReference')}</h3>
                  <p className="text-sm text-gray-500">{t('docs.apiReferenceDesc')}</p>
                </div>
              </div>
            </a>
            <a 
              href="/docs/troubleshooting.md" 
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-yellow-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{t('docs.troubleshooting')}</h3>
                  <p className="text-sm text-gray-500">{t('docs.troubleshootingDesc')}</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Contribution Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t('docs.contributionTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('docs.contributionDescription')}</p>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://github.com/your-org/impactx" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {t('docs.viewOnGitHub')}
              <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
            <a 
              href="/docs/contributing.md" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t('docs.contributionGuide')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;