import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AIImpactAnalyst = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('assistant');
  const [query, setQuery] = useState('');

  // Mock data for natural language queries
  const sampleQueries = [
    "What is the current funding status for Kerala flood relief?",
    "Show me high-impact projects in Africa",
    "Which regions need immediate attention based on recent disasters?",
    "Predict the resource requirements for the upcoming hurricane season"
  ];

  // Mock data for predictive modeling
  const predictions = [
    { id: 1, project: "Monsoon Relief - Bangladesh", risk: "High", allocation: "$2.4M", confidence: 92 },
    { id: 2, project: "Drought Response - Kenya", risk: "Medium", allocation: "$1.8M", confidence: 85 },
    { id: 3, project: "Earthquake Recovery - Turkey", risk: "Low", allocation: "$3.1M", confidence: 78 }
  ];

  // Mock data for AI reports
  const reports = [
    { id: 1, title: "Q3 Impact Report - South Asia", date: "2024-03-15", status: "Generated" },
    { id: 2, title: "Resource Allocation Analysis - Africa", date: "2024-03-10", status: "Generated" },
    { id: 3, title: "Disaster Response Efficiency Report", date: "2024-03-05", status: "Generating" }
  ];

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the query to an AI service
    alert(`Query submitted: ${query}`);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('aiAnalyst.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('aiAnalyst.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('assistant')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'assistant'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('aiAnalyst.askImpactX')}
              </button>
              <button
                onClick={() => setActiveTab('predictions')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'predictions'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('aiAnalyst.predictiveModeling')}
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('aiAnalyst.aiReports')}
              </button>
              <button
                onClick={() => setActiveTab('visualizations')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'visualizations'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('aiAnalyst.visualizations')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'assistant' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('aiAnalyst.naturalLanguageAssistant')}
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
                  <form onSubmit={handleQuerySubmit}>
                    <div className="flex">
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t('aiAnalyst.askQuestion')}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
                      >
                        {t('aiAnalyst.ask')}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('aiAnalyst.sampleQuestions')}
                    </h3>
                    <div className="space-y-3">
                      {sampleQueries.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(question)}
                          className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('aiAnalyst.howItWorks')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">{t('aiAnalyst.step1')}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">2</span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">{t('aiAnalyst.step2')}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">3</span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">{t('aiAnalyst.step3')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'predictions' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('aiAnalyst.predictiveAllocationModeling')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('aiAnalyst.riskScoring')}
                    </h3>
                    <div className="space-y-4">
                      {predictions.map((prediction) => (
                        <div key={prediction.id} className="flex items-center justify-between pb-3 border-b border-gray-200">
                          <div>
                            <div className="font-medium text-gray-900">{prediction.project}</div>
                            <div className="text-sm text-gray-600">
                              {t('aiAnalyst.confidence')}: {prediction.confidence}%
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              prediction.risk === 'High' 
                                ? 'bg-red-100 text-red-800' 
                                : prediction.risk === 'Medium' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-green-100 text-green-800'
                            }`}>
                              {prediction.risk}
                            </div>
                            <div className="text-sm font-medium text-gray-900">{prediction.allocation}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('aiAnalyst.modelPerformance')}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{t('aiAnalyst.accuracy')}</span>
                          <span className="text-gray-900 font-medium">94.2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{t('aiAnalyst.precision')}</span>
                          <span className="text-gray-900 font-medium">91.7%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '91.7%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{t('aiAnalyst.recall')}</span>
                          <span className="text-gray-900 font-medium">89.3%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '89.3%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{t('aiAnalyst.f1Score')}</span>
                          <span className="text-gray-900 font-medium">90.5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '90.5%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('aiAnalyst.predictionFeatures')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('aiAnalyst.feature1')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('aiAnalyst.feature2')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('aiAnalyst.feature3')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('aiAnalyst.feature4')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('aiAnalyst.aiGeneratedReports')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {reports.map((report) => (
                    <div key={report.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          report.status === 'Generated' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        {t('aiAnalyst.generatedOn')}: {report.date}
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                          {t('aiAnalyst.viewReport')}
                        </button>
                        <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('aiAnalyst.reportCustomization')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="font-medium text-gray-900 mb-2">{t('aiAnalyst.timeRange')}</div>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>{t('aiAnalyst.last7Days')}</option>
                        <option>{t('aiAnalyst.last30Days')}</option>
                        <option>{t('aiAnalyst.lastQuarter')}</option>
                        <option>{t('aiAnalyst.lastYear')}</option>
                      </select>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="font-medium text-gray-900 mb-2">{t('aiAnalyst.regions')}</div>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>{t('aiAnalyst.allRegions')}</option>
                        <option>{t('aiAnalyst.southAsia')}</option>
                        <option>{t('aiAnalyst.africa')}</option>
                        <option>{t('aiAnalyst.middleEast')}</option>
                      </select>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="font-medium text-gray-900 mb-2">{t('aiAnalyst.reportType')}</div>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>{t('aiAnalyst.impactReport')}</option>
                        <option>{t('aiAnalyst.allocationReport')}</option>
                        <option>{t('aiAnalyst.efficiencyReport')}</option>
                        <option>{t('aiAnalyst.riskReport')}</option>
                      </select>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    {t('aiAnalyst.generateCustomReport')}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'visualizations' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('aiAnalyst.projectVisualizations')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('aiAnalyst.impactHeatmap')}
                    </h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                          </svg>
                        </div>
                        <p className="text-gray-600">{t('aiAnalyst.heatmapVisualization')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('aiAnalyst.resourceAllocationChart')}
                    </h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <p className="text-gray-600">{t('aiAnalyst.allocationVisualization')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('aiAnalyst.visualizationFeatures')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('aiAnalyst.vizFeature1')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('aiAnalyst.vizFeature2')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('aiAnalyst.vizFeature3')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{t('aiAnalyst.vizFeature4')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImpactAnalyst;