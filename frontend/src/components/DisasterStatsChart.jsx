import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DisasterStatsChart = () => {
  const { t } = useTranslation();
  const [chartType, setChartType] = useState('bar');

  // Sample disaster data for India
  const disasterData = [
    { name: t('home.disaster_flood'), frequency: 42, affected: 15.2, funds: 2500 },
    { name: t('home.disaster_earthquake'), frequency: 18, affected: 8.7, funds: 1800 },
    { name: t('home.disaster_cyclone'), frequency: 25, affected: 12.4, funds: 3200 },
    { name: t('home.disaster_drought'), frequency: 35, affected: 22.1, funds: 1900 },
    { name: t('home.disaster_landslide'), frequency: 28, affected: 6.3, funds: 1200 },
    { name: t('home.disaster_fire'), frequency: 38, affected: 4.8, funds: 900 }
  ];

  // Colors for charts
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Render chart based on selected type
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={disasterData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'frequency') return [value, t('home.disaster_frequency')];
                  if (name === 'affected') return [`${value}M`, t('home.people_affected')];
                  if (name === 'funds') return [`₹${value}Cr`, t('home.funds_allocated')];
                  return [value, name];
                }}
              />
              <Legend 
                formatter={(value) => {
                  if (value === 'frequency') return t('home.disaster_frequency');
                  if (value === 'affected') return t('home.people_affected');
                  if (value === 'funds') return t('home.funds_allocated');
                  return value;
                }}
              />
              <Bar dataKey="frequency" name={t('home.disaster_frequency')} fill={COLORS[0]} />
              <Bar dataKey="affected" name={t('home.people_affected')} fill={COLORS[1]} />
              <Bar dataKey="funds" name={t('home.funds_allocated')} fill={COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={disasterData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'frequency') return [value, t('home.disaster_frequency')];
                  if (name === 'affected') return [`${value}M`, t('home.people_affected')];
                  if (name === 'funds') return [`₹${value}Cr`, t('home.funds_allocated')];
                  return [value, name];
                }}
              />
              <Legend 
                formatter={(value) => {
                  if (value === 'frequency') return t('home.disaster_frequency');
                  if (value === 'affected') return t('home.people_affected');
                  if (value === 'funds') return t('home.funds_allocated');
                  return value;
                }}
              />
              <Line type="monotone" dataKey="frequency" name={t('home.disaster_frequency')} stroke={COLORS[0]} strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="affected" name={t('home.people_affected')} stroke={COLORS[1]} strokeWidth={2} />
              <Line type="monotone" dataKey="funds" name={t('home.funds_allocated')} stroke={COLORS[2]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={disasterData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={120}
                fill="#8884d8"
                dataKey="frequency"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {disasterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [value, t('home.disaster_frequency')]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
          {t('home.disaster_statistics')}
        </h2>
        
        {/* Chart type selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setChartType('bar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              chartType === 'bar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {t('home.bar_chart')}
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              chartType === 'line'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {t('home.line_chart')}
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              chartType === 'pie'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {t('home.pie_chart')}
          </button>
        </div>
      </div>
      
      {/* Chart container */}
      <div className="h-96">
        {renderChart()}
      </div>
      
      {/* Chart description */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
          {t('home.disaster_statistics_insight')}
        </h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          {t('home.disaster_statistics_desc')}
        </p>
      </div>
    </div>
  );
};

export default DisasterStatsChart;