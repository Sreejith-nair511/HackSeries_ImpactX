import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DeveloperTools = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('cli');
  const [copied, setCopied] = useState(null);

  // Mock data for CLI commands
  const cliCommands = [
    {
      command: 'impactx init',
      description: 'Initialize a new ImpactX project',
      usage: 'impactx init [project-name]'
    },
    {
      command: 'impactx deploy',
      description: 'Deploy smart contracts to Algorand',
      usage: 'impactx deploy --network [testnet|mainnet]'
    },
    {
      command: 'impactx verify',
      description: 'Verify NGO claims using AI engine',
      usage: 'impactx verify --claim-id [id]'
    },
    {
      command: 'impactx fund',
      description: 'Process donations and allocate funds',
      usage: 'impactx fund --amount [algo] --recipient [address]'
    },
    {
      command: 'impactx monitor',
      description: 'Monitor transactions and system health',
      usage: 'impactx monitor --watch'
    }
  ];

  // Mock SDK documentation
  const sdkDocs = [
    {
      title: 'Installation',
      code: `npm install @impactx/sdk
# or
yarn add @impactx/sdk`,
      description: 'Install the ImpactX JavaScript SDK'
    },
    {
      title: 'Initialization',
      code: `import { ImpactXClient } from '@impactx/sdk';

const client = new ImpactXClient({
  apiKey: 'your-api-key',
  network: 'testnet' // or 'mainnet'
});`,
      description: 'Initialize the SDK client with your credentials'
    },
    {
      title: 'Processing Donations',
      code: `const donation = await client.donate({
  amount: 100,
  currency: 'ALGO',
  recipient: 'NGO_ADDRESS',
  metadata: {
    cause: 'disaster-relief',
    region: 'southeast-asia'
  }
});

console.log('Donation processed:', donation.id);`,
      description: 'Process a donation through the ImpactX platform'
    },
    {
      title: 'Verifying Claims',
      code: `const verification = await client.verifyClaim({
  ngoId: 'ngo-123',
  projectId: 'project-456',
  evidence: {
    satelliteImages: ['img1.jpg', 'img2.jpg'],
    iotData: 'sensor-data.json',
    reports: ['report1.pdf']
  }
});

console.log('Verification score:', verification.score);`,
      description: 'Submit NGO claims for AI verification'
    }
  ];

  // Mock environment template
  const envTemplate = `# ImpactX Development Environment
API_KEY=your_api_key_here
NETWORK=testnet
ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
ALGOD_SERVER=https://testnet-api.algonode.cloud
ALGOD_PORT=443
INDEXER_SERVER=https://testnet-idx.algonode.cloud
INDEXER_PORT=443
DATABASE_URL=postgresql://user:password@localhost:5432/impactx_dev
LOG_LEVEL=debug`;

  // Mock Docker template
  const dockerTemplate = `version: '3.8'

services:
  impactx-node:
    image: impactx/node:latest
    ports:
      - "8080:8080"
      - "4001:4001"
    environment:
      - NETWORK=testnet
      - LOG_LEVEL=info
    volumes:
      - ./data:/app/data
      - ./config:/app/config
    depends_on:
      - postgres

  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: impactx_dev
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`;

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('devTools.title')}</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('devTools.description')}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('cli')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'cli'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('devTools.tabs.cli')}
              </button>
              <button
                onClick={() => setActiveTab('sdk')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'sdk'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('devTools.tabs.sdk')}
              </button>
              <button
                onClick={() => setActiveTab('setup')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'setup'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('devTools.tabs.setup')}
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'templates'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('devTools.tabs.templates')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* CLI Commands Tab */}
            {activeTab === 'cli' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('devTools.cli.installation')}</h2>
                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <code className="text-green-400">npm install -g @impactx/cli</code>
                      <button
                        onClick={() => copyToClipboard('npm install -g @impactx/cli', 'install')}
                        className="text-gray-300 hover:text-white"
                      >
                        {copied === 'install' ? t('devTools.copied') : t('devTools.copy')}
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600">{t('devTools.cli.installationDesc')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('devTools.cli.commands')}</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {cliCommands.map((cmd, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 font-mono">{cmd.command}</h3>
                            <p className="text-gray-600 mt-1">{cmd.description}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(cmd.command, `cmd-${index}`)}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {copied === `cmd-${index}` ? t('devTools.copied') : t('devTools.copy')}
                          </button>
                        </div>
                        <div className="mt-3 bg-gray-50 rounded p-3">
                          <span className="text-sm text-gray-500">{t('devTools.cli.usage')}:</span>
                          <code className="ml-2 text-sm text-gray-800 font-mono">{cmd.usage}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SDK Documentation Tab */}
            {activeTab === 'sdk' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('devTools.sdk.overview')}</h2>
                  <p className="text-gray-600 mb-6">{t('devTools.sdk.overviewDesc')}</p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          {t('devTools.sdk.note')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {sdkDocs.map((doc, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">{doc.title}</h3>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-600 mb-4">{doc.description}</p>
                        <div className="relative">
                          <pre className="bg-gray-800 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto">
                            <code>{doc.code}</code>
                          </pre>
                          <button
                            onClick={() => copyToClipboard(doc.code, `sdk-${index}`)}
                            className="absolute top-2 right-2 bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-600"
                          >
                            {copied === `sdk-${index}` ? t('devTools.copied') : t('devTools.copy')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Setup Guide Tab */}
            {activeTab === 'setup' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('devTools.setup.title')}</h2>
                  <p className="text-gray-600">{t('devTools.setup.description')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">{t('devTools.setup.prerequisites')}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">Node.js &gt;= 16.x</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">npm or yarn package manager</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">Algorand account with testnet ALGO</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">Docker (optional, for local development)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">{t('devTools.setup.steps')}</h3>
                    <ol className="space-y-4">
                      <li className="flex">
                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">1</span>
                        <span className="ml-3 text-gray-700">{t('devTools.setup.step1')}</span>
                      </li>
                      <li className="flex">
                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">2</span>
                        <span className="ml-3 text-gray-700">{t('devTools.setup.step2')}</span>
                      </li>
                      <li className="flex">
                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">3</span>
                        <span className="ml-3 text-gray-700">{t('devTools.setup.step3')}</span>
                      </li>
                      <li className="flex">
                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">4</span>
                        <span className="ml-3 text-gray-700">{t('devTools.setup.step4')}</span>
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">{t('devTools.setup.troubleshooting')}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{t('devTools.setup.issue1')}</h4>
                      <p className="text-gray-600 mt-1">{t('devTools.setup.solution1')}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{t('devTools.setup.issue2')}</h4>
                      <p className="text-gray-600 mt-1">{t('devTools.setup.solution2')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('devTools.templates.title')}</h2>
                  <p className="text-gray-600">{t('devTools.templates.description')}</p>
                </div>

                <div className="space-y-8">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">.env</h3>
                      <button
                        onClick={() => copyToClipboard(envTemplate, 'env')}
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        {copied === 'env' ? t('devTools.copied') : t('devTools.copy')}
                      </button>
                    </div>
                    <div className="p-4">
                      <pre className="bg-gray-800 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto max-h-96">
                        <code>{envTemplate}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">docker-compose.yml</h3>
                      <button
                        onClick={() => copyToClipboard(dockerTemplate, 'docker')}
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        {copied === 'docker' ? t('devTools.copied') : t('devTools.copy')}
                      </button>
                    </div>
                    <div className="p-4">
                      <pre className="bg-gray-800 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto max-h-96">
                        <code>{dockerTemplate}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('devTools.resources')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('devTools.docs')}</h3>
              <p className="text-gray-600 mb-4">{t('devTools.docsDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('devTools.browse')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('devTools.examples')}</h3>
              <p className="text-gray-600 mb-4">{t('devTools.examplesDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('devTools.view')}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('devTools.support')}</h3>
              <p className="text-gray-600 mb-4">{t('devTools.supportDesc')}</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                {t('devTools.join')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTools;