import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DisasterStatsChart = ({ stateData = null }) => {
  const { t } = useTranslation();
  const [chartType, setChartType] = useState('bar');
  const [dataType, setDataType] = useState('frequency'); // frequency, affected, funds

  // Sample disaster data for India
  const disasterData = [
    { name: t('home.disaster_flood'), frequency: 42, affected: 15.2, funds: 2500 },
    { name: t('home.disaster_earthquake'), frequency: 18, affected: 8.7, funds: 1800 },
    { name: t('home.disaster_cyclone'), frequency: 25, affected: 12.4, funds: 3200 },
    { name: t('home.disaster_drought'), frequency: 35, affected: 22.1, funds: 1900 },
    { name: t('home.disaster_landslide'), frequency: 28, affected: 6.3, funds: 1200 },
    { name: t('home.disaster_fire'), frequency: 38, affected: 4.8, funds: 900 }
  ];

  // Sample state-wise data
  const stateWiseData = stateData || [
    { name: 'Maharashtra', floods: 120, cyclones: 5, earthquakes: 2, droughts: 8 },
    { name: 'West Bengal', floods: 95, cyclones: 12, earthquakes: 1, droughts: 5 },
    { name: 'Odisha', floods: 80, cyclones: 15, earthquakes: 0, droughts: 6 },
    { name: 'Andhra Pradesh', floods: 70, cyclones: 8, earthquakes: 1, droughts: 9 },
    { name: 'Tamil Nadu', floods: 65, cyclones: 7, earthquakes: 3, droughts: 7 },
    { name: 'Uttar Pradesh', floods: 90, cyclones: 2, earthquakes: 4, droughts: 10 },
    { name: 'Bihar', floods: 85, cyclones: 1, earthquakes: 2, droughts: 6 },
    { name: 'Gujarat', floods: 55, cyclones: 6, earthquakes: 5, droughts: 12 },
    { name: 'Kerala', floods: 60, cyclones: 3, earthquakes: 1, droughts: 4 },
    { name: 'Assam', floods: 110, cyclones: 2, earthquakes: 3, droughts: 5 },
  ];

  // Colors for charts
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Render chart based on selected type
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        if (stateData) {
          // State-wise bar chart
          return (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={stateWiseData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="floods" name={t('home.disaster_flood')} fill={COLORS[0]} />
                <Bar dataKey="cyclones" name={t('home.disaster_cyclone')} fill={COLORS[1]} />
                <Bar dataKey="earthquakes" name={t('home.disaster_earthquake')} fill={COLORS[2]} />
                <Bar dataKey="droughts" name={t('home.disaster_drought')} fill={COLORS[3]} />
              </BarChart>
            </ResponsiveContainer>
          );
        } else {
          // Disaster type bar chart
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
        }
      case 'line':
        if (stateData) {
          // State-wise line chart
          return (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={stateWiseData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="floods" name={t('home.disaster_flood')} stroke={COLORS[0]} strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="cyclones" name={t('home.disaster_cyclone')} stroke={COLORS[1]} strokeWidth={2} />
                <Line type="monotone" dataKey="earthquakes" name={t('home.disaster_earthquake')} stroke={COLORS[2]} strokeWidth={2} />
                <Line type="monotone" dataKey="droughts" name={t('home.disaster_drought')} stroke={COLORS[3]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          );
        } else {
          // Disaster type line chart
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
        }
      case 'pie':
        if (stateData) {
          // State-wise pie chart (showing total disasters per state)
          const pieData = stateWiseData.map(state => ({
            name: state.name,
            value: state.floods + state.cyclones + state.earthquakes + state.droughts
          }));
          
          return (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          );
        } else {
          // Disaster type pie chart
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
        }
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
          {stateData ? t('disasterStatistics.tabs.regional') : t('home.disaster_statistics')}
        </h2>
        
        {/* Chart controls */}
        <div className="flex flex-col sm:flex-row gap-3">
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
          {stateData 
            ? t('disasterStatistics.regional.description') 
            : t('home.disaster_statistics_desc')}
        </p>
      </div>
    </div>
  );
};

export default DisasterStatsChart;