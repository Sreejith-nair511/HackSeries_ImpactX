import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CommunityFeedbackSystem = () => {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    category: 'general',
    rating: 5,
    comment: '',
    location: ''
  });
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('submit');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  // Mock feedback data for demonstration
  const mockFeedbackData = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      category: 'disaster_response',
      rating: 4,
      comment: 'The flood response was quick, but communication could be better.',
      location: 'Kolkata',
      date: '2023-07-15',
      status: 'resolved'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      category: 'platform_usability',
      rating: 5,
      comment: 'Very easy to use platform for reporting disasters.',
      location: 'Mumbai',
      date: '2023-07-10',
      status: 'resolved'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      category: 'resource_allocation',
      rating: 3,
      comment: 'Resources took too long to reach our area after the cyclone.',
      location: 'Ahmedabad',
      date: '2023-06-22',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Sunita Devi',
      email: 'sunita@example.com',
      category: 'general',
      rating: 4,
      comment: 'Good initiative, but more awareness is needed in rural areas.',
      location: 'Patna',
      date: '2023-06-18',
      status: 'resolved'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      category: 'disaster_response',
      rating: 2,
      comment: 'Response time was too slow during the earthquake.',
      location: 'Delhi',
      date: '2023-05-30',
      status: 'in_progress'
    }
  ];

  useEffect(() => {
    // Load mock data on component mount
    setSubmittedFeedback(mockFeedbackData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add new feedback to the list
      const newFeedback = {
        id: submittedFeedback.length + 1,
        ...feedback,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      
      setSubmittedFeedback(prev => [newFeedback, ...prev]);
      setSubmitSuccess(true);
      setFeedback({
        name: '',
        email: '',
        category: 'general',
        rating: 5,
        comment: '',
        location: ''
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackCategories = [
    { value: 'general', label: t('feedback.categories.general') },
    { value: 'disaster_response', label: t('feedback.categories.disaster_response') },
    { value: 'platform_usability', label: t('feedback.categories.platform_usability') },
    { value: 'resource_allocation', label: t('feedback.categories.resource_allocation') },
    { value: 'communication', label: t('feedback.categories.communication') },
    { value: 'volunteer_coordination', label: t('feedback.categories.volunteer_coordination') }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter feedback based on selected filters
  const filteredFeedback = submittedFeedback.filter(item => {
    const categoryMatch = filterCategory === 'all' || item.category === filterCategory;
    const ratingMatch = filterRating === 'all' || item.rating.toString() === filterRating;
    return categoryMatch && ratingMatch;
  });

  // Calculate feedback statistics
  const feedbackStats = {
    total: submittedFeedback.length,
    resolved: submittedFeedback.filter(item => item.status === 'resolved').length,
    pending: submittedFeedback.filter(item => item.status === 'pending').length,
    inProgress: submittedFeedback.filter(item => item.status === 'in_progress').length,
    averageRating: submittedFeedback.length > 0 
      ? (submittedFeedback.reduce((sum, item) => sum + item.rating, 0) / submittedFeedback.length).toFixed(1)
      : 0
  };

  // Prepare data for charts
  const categoryData = feedbackCategories
    .filter(cat => cat.value !== 'general')
    .map(cat => ({
      name: cat.label,
      value: submittedFeedback.filter(item => item.category === cat.value).length
    }));

  const ratingData = [1, 2, 3, 4, 5].map(rating => ({
    name: `${rating} ${t('feedback.stars')}`,
    value: submittedFeedback.filter(item => item.rating === rating).length
  }));

  const statusData = [
    { name: t('feedback.status.resolved'), value: feedbackStats.resolved },
    { name: t('feedback.status.pending'), value: feedbackStats.pending },
    { name: t('feedback.status.in_progress'), value: feedbackStats.inProgress }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('feedback.title')}</h2>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('submit')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'submit'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('feedback.submit_feedback')}
          </button>
          <button
            onClick={() => setActiveTab('view')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'view'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('feedback.view_feedback')}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('feedback.analytics')}
          </button>
        </nav>
      </div>

      {/* Submit Feedback Tab */}
      {activeTab === 'submit' && (
        <div>
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              {t('feedback.submission_success')}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('feedback.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={feedback.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('feedback.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={feedback.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('feedback.category')}
                </label>
                <select
                  id="category"
                  name="category"
                  value={feedback.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {feedbackCategories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('feedback.location')}
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={feedback.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('feedback.rating')}
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= feedback.rating ? '★' : '☆'}
                  </button>
                ))}
                <span className="ml-2 text-gray-600">
                  {feedback.rating} {t('feedback.stars')}
                </span>
              </div>
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                {t('feedback.comment')}
              </label>
              <textarea
                id="comment"
                name="comment"
                value={feedback.comment}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? t('feedback.submitting') : t('feedback.submit')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* View Feedback Tab */}
      {activeTab === 'view' && (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {t('feedback.feedback_list')}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">{t('feedback.all_categories')}</option>
                {feedbackCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">{t('feedback.all_ratings')}</option>
                {[1, 2, 3, 4, 5].map(rating => (
                  <option key={rating} value={rating}>
                    {rating} {t('feedback.stars')}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredFeedback.length > 0 ? (
              filteredFeedback.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.email} • {item.location}</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-2 md:mt-0">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {t(`feedback.status.${item.status}`)}
                      </span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < item.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {feedbackCategories.find(cat => cat.value === item.category)?.label}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-2">{item.comment}</p>
                  
                  <p className="text-sm text-gray-500">
                    {t('feedback.submitted_on')} {item.date}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t('feedback.no_feedback_found')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            {t('feedback.feedback_analytics')}
          </h3>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-1">{t('feedback.total_feedback')}</h4>
              <p className="text-2xl font-bold text-blue-900">{feedbackStats.total}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="text-sm font-medium text-green-800 mb-1">{t('feedback.resolved')}</h4>
              <p className="text-2xl font-bold text-green-900">{feedbackStats.resolved}</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <h4 className="text-sm font-medium text-yellow-800 mb-1">{t('feedback.in_progress')}</h4>
              <p className="text-2xl font-bold text-yellow-900">{feedbackStats.inProgress}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h4 className="text-sm font-medium text-purple-800 mb-1">{t('feedback.average_rating')}</h4>
              <p className="text-2xl font-bold text-purple-900">{feedbackStats.averageRating}</p>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-800 mb-4">{t('feedback.category_distribution')}</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-4">{t('feedback.rating_distribution')}</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ratingData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name={t('feedback.feedback_count')} fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="font-medium text-gray-800 mb-4">{t('feedback.status_distribution')}</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name={t('feedback.feedback_count')} fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityFeedbackSystem;