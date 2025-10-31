import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Developers = () => {
  const { t } = useTranslation();
  const [repoStats, setRepoStats] = useState({
    stars: 0,
    forks: 0,
    contributors: 0,
    commits: 0
  });
  const [recentCommits, setRecentCommits] = useState([]);
  const [activeTab, setActiveTab] = useState('quickstart');

  useEffect(() => {
    // Mock data for repository stats
    setRepoStats({
      stars: 124,
      forks: 36,
      contributors: 18,
      commits: 892
    });

    // Mock data for recent commits
    setRecentCommits([
      {
        id: 1,
        message: 'Add disaster response protocols documentation',
        author: 'Sreejith Nair',
        date: '2023-10-25',
        hash: 'a1b2c3d'
      },
      {
        id: 2,
        message: 'Implement community engagement strategy',
        author: 'Vasudha Sharma',
        date: '2023-10-24',
        hash: 'e4f5g6h'
      },
      {
        id: 3,
        message: 'Fix volunteer management system bugs',
        author: 'Nikhil Patel',
        date: '2023-10-23',
        hash: 'i7j8k9l'
      },
      {
        id: 4,
        message: 'Update resource allocation strategy',
        author: 'Goodwell Sreejith S',
        date: '2023-10-22',
        hash: 'm1n2o3p'
      },
      {
        id: 5,
        message: 'Add communication strategy documentation',
        author: 'Team Member',
        date: '2023-10-21',
        hash: 'q4r5s6t'
      }
    ]);
  }, []);

  return (
    <div className="developers-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{t('developers.title')}</h1>
        <p className="text-gray-600 mb-8">{t('developers.subtitle')}</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-blue-600">{repoStats.stars}</div>
            <div className="text-gray-600">{t('developers.stars')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-green-600">{repoStats.forks}</div>
            <div className="text-gray-600">{t('developers.forks')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-purple-600">{repoStats.contributors}</div>
            <div className="text-gray-600">{t('developers.contributors')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-orange-600">{repoStats.commits}</div>
            <div className="text-gray-600">{t('developers.commits')}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b">
          <nav className="flex space-x-8">
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'quickstart' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('quickstart')}
            >
              {t('developers.quickStart')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'api' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('api')}
            >
              {t('developers.apiDocs')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'sdk' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('sdk')}
            >
              {t('developers.sdk')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'smartContracts' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('smartContracts')}
            >
              {t('developers.smartContracts')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'github' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('github')}
            >
              {t('developers.github')}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'quickstart' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('developers.quickStartGuide')}</h2>
              <div className="prose max-w-none">
                <h3 className="text-xl font-medium mt-6 mb-3">{t('developers.setupTitle')}</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>
{`# Clone the repository
git clone https://github.com/your-org/impactx.git

# Navigate to the project directory
cd impactx

# Install dependencies
npm install

# Start the development server
npm run dev`}
                  </code>
                </pre>

                <h3 className="text-xl font-medium mt-6 mb-3">{t('developers.environmentTitle')}</h3>
                <p>{t('developers.environmentDescription')}</p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>
{`# Create .env file
cp .env.example .env

# Edit the .env file with your configuration
nano .env`}
                  </code>
                </pre>

                <h3 className="text-xl font-medium mt-6 mb-3">{t('developers.runningTitle')}</h3>
                <p>{t('developers.runningDescription')}</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>{t('developers.runningFrontend')}</li>
                  <li>{t('developers.runningBackend')}</li>
                  <li>{t('developers.runningTests')}</li>
                </ul>

                <div className="mt-6 p-4 bg-blue-50 rounded-md">
                  <h4 className="font-medium text-blue-800">{t('developers.tip')}</h4>
                  <p className="text-blue-700">{t('developers.tipDescription')}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('developers.apiDocumentation')}</h2>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-2">GET /api/disasters</h3>
                  <p className="text-gray-600 mb-2">{t('developers.disastersEndpoint')}</p>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="font-medium">Response:</p>
                    <pre className="text-sm overflow-x-auto">
{`{
  "success": true,
  "data": [
    {
      "id": "1",
      "type": "flood",
      "severity": "high",
      "location": {
        "latitude": 12.9716,
        "longitude": 77.5946,
        "address": "Bangalore, India"
      },
      "status": "active",
      "createdAt": "2023-10-25T10:30:00Z"
    }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-2">POST /api/reports</h3>
                  <p className="text-gray-600 mb-2">{t('developers.reportsEndpoint')}</p>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="font-medium">Request Body:</p>
                    <pre className="text-sm overflow-x-auto">
{`{
  "type": "flood",
  "severity": "high",
  "location": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "address": "Bangalore, India"
  },
  "description": "Severe flooding in the area"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-2">GET /api/resources</h3>
                  <p className="text-gray-600 mb-2">{t('developers.resourcesEndpoint')}</p>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="font-medium">Response:</p>
                    <pre className="text-sm overflow-x-auto">
{`{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Emergency Shelter",
      "type": "shelter",
      "capacity": 100,
      "currentUsage": 45,
      "location": {
        "latitude": 12.9716,
        "longitude": 77.5946,
        "address": "Community Center, Bangalore"
      },
      "status": "available"
    }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <a 
                    href="/docs/api-documentation.md" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    {t('developers.fullApiDocs')}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sdk' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('developers.sdkDocs')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-5">
                  <h3 className="text-lg font-medium mb-2">JavaScript SDK</h3>
                  <p className="text-gray-600 mb-4">{t('developers.jsSdkDescription')}</p>
                  <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
{`// Installation
npm install @impactx/sdk

// Usage
import { ImpactXClient } from '@impactx/sdk';

const client = new ImpactXClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.impactx.example.com'
});

// Get disasters
const disasters = await client.disasters.list();`}
                  </pre>
                  <a href="#" className="text-blue-600 hover:text-blue-800 mt-3 inline-block">
                    {t('developers.viewDocs')}
                  </a>
                </div>

                <div className="border rounded-lg p-5">
                  <h3 className="text-lg font-medium mb-2">Python SDK</h3>
                  <p className="text-gray-600 mb-4">{t('developers.pythonSdkDescription')}</p>
                  <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
{`# Installation
pip install impactx-sdk

# Usage
from impactx import ImpactXClient

client = ImpactXClient(
    api_key='your-api-key',
    base_url='https://api.impactx.example.com'
)

# Get disasters
disasters = client.disasters.list()`}
                  </pre>
                  <a href="#" className="text-blue-600 hover:text-blue-800 mt-3 inline-block">
                    {t('developers.viewDocs')}
                  </a>
                </div>

                <div className="border rounded-lg p-5">
                  <h3 className="text-lg font-medium mb-2">Java SDK</h3>
                  <p className="text-gray-600 mb-4">{t('developers.javaSdkDescription')}</p>
                  <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
{`// Installation
// Add to your pom.xml
<dependency>
  <groupId>com.impactx</groupId>
  <artifactId>sdk</artifactId>
  <version>1.0.0</version>
</dependency>

// Usage
ImpactXClient client = new ImpactXClient.Builder()
    .apiKey("your-api-key")
    .baseUrl("https://api.impactx.example.com")
    .build();

// Get disasters
List<Disaster> disasters = client.disasters().list();`}
                  </pre>
                  <a href="#" className="text-blue-600 hover:text-blue-800 mt-3 inline-block">
                    {t('developers.viewDocs')}
                  </a>
                </div>

                <div className="border rounded-lg p-5">
                  <h3 className="text-lg font-medium mb-2">Mobile SDKs</h3>
                  <p className="text-gray-600 mb-4">{t('developers.mobileSdkDescription')}</p>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="px-3 py-1 bg-gray-200 rounded-md text-sm">
                      iOS
                    </a>
                    <a href="#" className="px-3 py-1 bg-gray-200 rounded-md text-sm">
                      Android
                    </a>
                    <a href="#" className="px-3 py-1 bg-gray-200 rounded-md text-sm">
                      React Native
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'smartContracts' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('developers.smartContractDocs')}</h2>
              <div className="prose max-w-none">
                <h3 className="text-xl font-medium mt-6 mb-3">{t('developers.contractOverview')}</h3>
                <p>{t('developers.contractDescription')}</p>

                <h3 className="text-xl font-medium mt-6 mb-3">{t('developers.coreContracts')}</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">DisasterFundEscrow.teal</h4>
                    <p className="text-gray-600 text-sm mt-1">{t('developers.escrowDescription')}</p>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm mt-2 overflow-x-auto">
{`#pragma version 5
txn ApplicationID
bz init
// ... contract logic ...`}
                    </pre>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">VerificationOracle.py</h4>
                    <p className="text-gray-600 text-sm mt-1">{t('developers.oracleDescription')}</p>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm mt-2 overflow-x-auto">
{`from pyteal import *

def verification_oracle():
    # ... oracle logic ...
    return program`}
                    </pre>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">ResourceTracker.asa</h4>
                    <p className="text-gray-600 text-sm mt-1">{t('developers.trackerDescription')}</p>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm mt-2 overflow-x-auto">
{`{
  "name": "ImpactX Resource Token",
  "unit-name": "IRT",
  "total": 1000000,
  "decimals": 0,
  "default-frozen": false
}`}
                    </pre>
                  </div>
                </div>

                <div className="mt-6">
                  <a 
                    href="/docs/smart-contracts.md" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    {t('developers.fullContractDocs')}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('developers.githubIntegration')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">{t('developers.recentCommits')}</h3>
                  <div className="space-y-3">
                    {recentCommits.map(commit => (
                      <div key={commit.id} className="border rounded-lg p-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-sm truncate">{commit.message}</span>
                          <span className="text-xs text-gray-500">{commit.hash.substring(0, 7)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{commit.author}</span>
                          <span>{commit.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <a 
                      href="https://github.com/your-org/impactx/commits" 
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      {t('developers.viewAllCommits')}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">{t('developers.topContributors')}</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Sreejith Nair', commits: 142, avatar: 'SN' },
                      { name: 'Vasudha Sharma', commits: 98, avatar: 'VS' },
                      { name: 'Nikhil Patel', commits: 87, avatar: 'NP' },
                      { name: 'Goodwell Sreejith S', commits: 76, avatar: 'GS' },
                      { name: 'Community Contributors', commits: 234, avatar: 'CC' }
                    ].map((contributor, index) => (
                      <div key={index} className="flex items-center border rounded-lg p-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                          {contributor.avatar}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="font-medium">{contributor.name}</div>
                          <div className="text-sm text-gray-500">{contributor.commits} {t('developers.commits')}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-3">{t('developers.repoStats')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{repoStats.stars}</div>
                    <div className="text-sm text-gray-600">{t('developers.stars')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{repoStats.forks}</div>
                    <div className="text-sm text-gray-600">{t('developers.forks')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{repoStats.contributors}</div>
                    <div className="text-sm text-gray-600">{t('developers.contributors')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{repoStats.commits}</div>
                    <div className="text-sm text-gray-600">{t('developers.commits')}</div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-4">
                  <a 
                    href="https://github.com/your-org/impactx" 
                    className="flex-1 text-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition duration-300"
                  >
                    {t('developers.viewOnGithub')}
                  </a>
                  <a 
                    href="https://github.com/your-org/impactx/issues" 
                    className="flex-1 text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                  >
                    {t('developers.reportIssue')}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Developers;