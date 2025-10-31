import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ApiPlayground = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('rest');
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock API endpoints
  const restEndpoints = [
    {
      id: 1,
      method: 'GET',
      path: '/api/v1/users/profile',
      description: 'Retrieve authenticated user\'s profile',
      category: 'User Management'
    },
    {
      id: 2,
      method: 'POST',
      path: '/api/v1/auth/login',
      description: 'Authenticate user and receive access token',
      category: 'Authentication'
    },
    {
      id: 3,
      method: 'GET',
      path: '/api/v1/projects',
      description: 'List projects with filtering',
      category: 'Project Management'
    },
    {
      id: 4,
      method: 'POST',
      path: '/api/v1/projects',
      description: 'Create a new project',
      category: 'Project Management'
    },
    {
      id: 5,
      method: 'GET',
      path: '/api/v1/resources',
      description: 'List resources with filtering and search',
      category: 'Resource Tracking'
    },
    {
      id: 6,
      method: 'POST',
      path: '/api/v1/proposals',
      description: 'Create a new governance proposal',
      category: 'Governance'
    }
  ];

  const graphqlEndpoints = [
    {
      id: 1,
      name: 'getUserProfile',
      description: 'Fetch user profile information',
      query: `query GetUserProfile {
  user {
    id
    email
    firstName
    lastName
    organization
    role
  }
}`
    },
    {
      id: 2,
      name: 'listProjects',
      description: 'List projects with optional filtering',
      query: `query ListProjects($status: String, $limit: Int) {
  projects(status: $status, limit: $limit) {
    id
    title
    description
    status
    priority
    progress
  }
}`
    },
    {
      id: 3,
      name: 'createProject',
      description: 'Create a new project',
      query: `mutation CreateProject($input: ProjectInput!) {
  createProject(input: $input) {
    id
    title
    description
    status
  }
}`
    }
  ];

  // Mock API response
  const mockApiResponse = {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer <token>',
      'X-Rate-Limit-Limit': '1000',
      'X-Rate-Limit-Remaining': '999'
    },
    body: {
      success: true,
      data: {
        user: {
          id: "user123",
          email: "user@example.com",
          firstName: "John",
          lastName: "Doe",
          organization: "Helping Hands Foundation",
          role: "volunteer"
        }
      }
    }
  };

  const handleApiCall = (endpoint) => {
    setIsLoading(true);
    setSelectedEndpoint(endpoint);
    
    // Simulate API call delay
    setTimeout(() => {
      setApiResponse(JSON.stringify(mockApiResponse, null, 2));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('apiPlayground.title')}</h1>
          <p className="mt-2 text-gray-600">{t('apiPlayground.description')}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('rest')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rest'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('apiPlayground.restApi')}
            </button>
            <button
              onClick={() => setActiveTab('graphql')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'graphql'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('apiPlayground.graphql')}
            </button>
            <button
              onClick={() => setActiveTab('authentication')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'authentication'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('apiPlayground.authentication')}
            </button>
            <button
              onClick={() => setActiveTab('documentation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documentation'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('apiPlayground.documentation')}
            </button>
          </nav>
        </div>

        {/* REST API Tab */}
        {activeTab === 'rest' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('apiPlayground.restEndpoints')}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('apiPlayground.method')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('apiPlayground.endpoint')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('apiPlayground.description')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('apiPlayground.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {restEndpoints.map((endpoint) => (
                      <tr key={endpoint.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            endpoint.method === 'GET' 
                              ? 'bg-green-100 text-green-800' 
                              : endpoint.method === 'POST' 
                                ? 'bg-blue-100 text-blue-800' 
                                : endpoint.method === 'PUT' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-red-100 text-red-800'
                          }`}>
                            {endpoint.method}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                          {endpoint.path}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {endpoint.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleApiCall(endpoint)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            {t('apiPlayground.tryIt')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedEndpoint ? `${selectedEndpoint.method} ${selectedEndpoint.path}` : t('apiPlayground.apiResponse')}
                </h3>
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : apiResponse ? (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <pre className="bg-gray-800 text-gray-100 p-4 text-sm overflow-x-auto max-h-96">
                      {apiResponse}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {t('apiPlayground.selectEndpoint')}
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('apiPlayground.requestHeaders')}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-gray-700">Authorization</span>
                    <span className="font-mono text-sm text-gray-500">Bearer &lt;token&gt;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-gray-700">Content-Type</span>
                    <span className="font-mono text-sm text-gray-500">application/json</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-gray-700">Accept</span>
                    <span className="font-mono text-sm text-gray-500">application/json</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GraphQL Tab */}
        {activeTab === 'graphql' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('apiPlayground.graphqlEndpoints')}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {graphqlEndpoints.map((endpoint) => (
                  <div key={endpoint.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{endpoint.name}</h3>
                      <button
                        onClick={() => handleApiCall(endpoint)}
                        className="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        {t('apiPlayground.tryIt')}
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{endpoint.description}</p>
                    <div className="mt-4">
                      <pre className="bg-gray-800 text-gray-100 p-4 text-sm rounded-lg overflow-x-auto">
                        {endpoint.query}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('apiPlayground.graphqlPlayground')}</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 text-gray-100 p-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-300 mb-1">Query</label>
                        <textarea
                          className="w-full bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm"
                          rows="8"
                          defaultValue={`query GetUserProfile {
  user {
    id
    email
    firstName
    lastName
    organization
    role
  }
}`}
                        ></textarea>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-300 mb-1">Variables</label>
                        <textarea
                          className="w-full bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm"
                          rows="8"
                          placeholder='{ "id": "user123" }'
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        {t('apiPlayground.executeQuery')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('apiPlayground.response')}</h3>
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : apiResponse ? (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <pre className="bg-gray-800 text-gray-100 p-4 text-sm overflow-x-auto max-h-64">
                      {apiResponse}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {t('apiPlayground.executeQuery')}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Authentication Tab */}
        {activeTab === 'authentication' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('apiPlayground.tokenBasedAuth')}</h3>
                <div className="prose max-w-none">
                  <p>{t('apiPlayground.tokenAuthDescription')}</p>
                  <h4 className="text-md font-medium text-gray-900 mt-4">{t('apiPlayground.gettingToken')}</h4>
                  <p>{t('apiPlayground.tokenRequestDescription')}</p>
                  <div className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-2">
                    <pre className="text-sm">
{`POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}`}
                    </pre>
                  </div>
                  <h4 className="text-md font-medium text-gray-900 mt-4">{t('apiPlayground.usingToken')}</h4>
                  <p>{t('apiPlayground.tokenUsageDescription')}</p>
                  <div className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-2">
                    <pre className="text-sm">
{`GET /api/v1/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                    </pre>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('apiPlayground.rateLimiting')}</h3>
                <div className="prose max-w-none">
                  <p>{t('apiPlayground.rateLimitingDescription')}</p>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900">{t('apiPlayground.rateLimitHeaders')}</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="font-mono text-sm">X-Rate-Limit-Limit</span>
                        <span className="text-sm text-gray-600">{t('apiPlayground.requestsPerHour')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-sm">X-Rate-Limit-Remaining</span>
                        <span className="text-sm text-gray-600">{t('apiPlayground.requestsRemaining')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-sm">X-Rate-Limit-Reset</span>
                        <span className="text-sm text-gray-600">{t('apiPlayground.resetTime')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('apiPlayground.authenticationDemo')}</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      {t('apiPlayground.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      {t('apiPlayground.password')}
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {t('apiPlayground.getToken')}
                  </button>
                </form>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('apiPlayground.authStats')}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('apiPlayground.activeTokens')}</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('apiPlayground.apiCallsToday')}</span>
                    <span className="font-medium">8,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('apiPlayground.successRate')}</span>
                    <span className="font-medium">98.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('apiPlayground.averageResponseTime')}</span>
                    <span className="font-medium">142ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === 'documentation' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t('apiPlayground.documentationTopics')}</h3>
              <nav className="space-y-1">
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50">
                  {t('apiPlayground.gettingStarted')}
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  {t('apiPlayground.authentication')}
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  {t('apiPlayground.userManagement')}
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  {t('apiPlayground.projectManagement')}
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  {t('apiPlayground.resourceTracking')}
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  {t('apiPlayground.governance')}
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  {t('apiPlayground.errorHandling')}
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  {t('apiPlayground.rateLimiting')}
                </a>
              </nav>
            </div>
            
            <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('apiPlayground.gettingStarted')}</h2>
              
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-900">{t('apiPlayground.introduction')}</h3>
                <p>{t('apiPlayground.apiIntroduction')}</p>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6">{t('apiPlayground.baseUrls')}</h3>
                <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">{t('apiPlayground.production')}:</span>
                      <code className="ml-2 bg-gray-200 px-2 py-1 rounded">https://api.impactx.org/v1</code>
                    </div>
                    <div>
                      <span className="font-medium">{t('apiPlayground.staging')}:</span>
                      <code className="ml-2 bg-gray-200 px-2 py-1 rounded">https://staging-api.impactx.org/v1</code>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6">{t('apiPlayground.authentication')}</h3>
                <p>{t('apiPlayground.authDescription')}</p>
                <div className="mt-2 bg-gray-800 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">
{`# Using cURL
curl -H "Authorization: Bearer YOUR_TOKEN" \\
     https://api.impactx.org/v1/users/profile

# Using JavaScript fetch
fetch('https://api.impactx.org/v1/users/profile', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})`}
                  </pre>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6">{t('apiPlayground.commonResponseFormats')}</h3>
                <p>{t('apiPlayground.responseFormatDescription')}</p>
                <div className="mt-2 bg-gray-800 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">
{`// Success response
{
  "success": true,
  "data": {
    // Resource data
  }
}

// Error response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  }
}`}
                  </pre>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6">{t('apiPlayground.pagination')}</h3>
                <p>{t('apiPlayground.paginationDescription')}</p>
                <div className="mt-2 bg-gray-800 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">
{`GET /api/v1/projects?page=2&limit=20

// Response includes pagination info
{
  "success": true,
  "data": {
    "projects": [...],
    "pagination": {
      "currentPage": 2,
      "totalPages": 15,
      "totalItems": 285,
      "itemsPerPage": 20
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-medium text-indigo-800">{t('apiPlayground.needHelp')}</h4>
                  <p className="mt-1 text-indigo-700">
                    {t('apiPlayground.supportInfo')}{' '}
                    <a href="mailto:support@impactx.org" className="underline">
                      support@impactx.org
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiPlayground;