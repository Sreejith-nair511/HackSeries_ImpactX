import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ImpactAcademy = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([1, 3]);

  // Mock course data
  const courses = [
    {
      id: 1,
      title: 'Introduction to Blockchain for Humanitarian Work',
      description: 'Learn how blockchain technology can revolutionize transparency and accountability in humanitarian aid distribution.',
      instructor: 'Dr. Arjun Patel',
      duration: '4 weeks',
      lessons: 12,
      level: 'Beginner',
      category: 'Blockchain',
      rating: 4.8,
      students: 1247,
      progress: 75,
      certificate: true,
      thumbnail: '/images/blockchain-course.jpg',
      modules: [
        {
          id: 1,
          title: 'Blockchain Fundamentals',
          lessons: [
            { id: 1, title: 'What is Blockchain?', duration: '15 min', completed: true },
            { id: 2, title: 'How Blockchain Works', duration: '20 min', completed: true },
            { id: 3, title: 'Types of Blockchains', duration: '18 min', completed: true }
          ]
        },
        {
          id: 2,
          title: 'Smart Contracts',
          lessons: [
            { id: 4, title: 'Introduction to Smart Contracts', duration: '22 min', completed: true },
            { id: 5, title: 'Writing Your First Contract', duration: '25 min', completed: false },
            { id: 6, title: 'Deploying Smart Contracts', duration: '30 min', completed: false }
          ]
        },
        {
          id: 3,
          title: 'Applications in Humanitarian Aid',
          lessons: [
            { id: 7, title: 'Transparency in Aid Distribution', duration: '20 min', completed: false },
            { id: 8, title: 'Identity Verification', duration: '18 min', completed: false },
            { id: 9, title: 'Supply Chain Tracking', duration: '22 min', completed: false }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Disaster Response and Management',
      description: 'Comprehensive training on disaster response strategies, emergency management, and community resilience building.',
      instructor: 'Dr. Priya Sharma',
      duration: '6 weeks',
      lessons: 18,
      level: 'Intermediate',
      category: 'Disaster Management',
      rating: 4.9,
      students: 892,
      progress: 0,
      certificate: true,
      thumbnail: '/images/disaster-response-course.jpg',
      modules: [
        {
          id: 1,
          title: 'Disaster Preparedness',
          lessons: [
            { id: 1, title: 'Risk Assessment', duration: '25 min', completed: false },
            { id: 2, title: 'Emergency Planning', duration: '30 min', completed: false },
            { id: 3, title: 'Community Engagement', duration: '22 min', completed: false }
          ]
        },
        {
          id: 2,
          title: 'Response Strategies',
          lessons: [
            { id: 4, title: 'Search and Rescue', duration: '35 min', completed: false },
            { id: 5, title: 'Medical Response', duration: '28 min', completed: false },
            { id: 6, title: 'Resource Allocation', duration: '26 min', completed: false }
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Data Analytics for Social Impact',
      description: 'Master data analysis techniques to measure and improve the effectiveness of social impact programs.',
      instructor: 'Rajesh Kumar',
      duration: '5 weeks',
      lessons: 15,
      level: 'Intermediate',
      category: 'Data Analytics',
      rating: 4.7,
      students: 634,
      progress: 40,
      certificate: true,
      thumbnail: '/images/data-analytics-course.jpg',
      modules: [
        {
          id: 1,
          title: 'Data Collection and Cleaning',
          lessons: [
            { id: 1, title: 'Data Sources', duration: '20 min', completed: true },
            { id: 2, title: 'Data Cleaning Techniques', duration: '25 min', completed: true },
            { id: 3, title: 'Data Validation', duration: '18 min', completed: false }
          ]
        },
        {
          id: 2,
          title: 'Statistical Analysis',
          lessons: [
            { id: 4, title: 'Descriptive Statistics', duration: '22 min', completed: false },
            { id: 5, title: 'Inferential Statistics', duration: '30 min', completed: false },
            { id: 6, title: 'Correlation and Regression', duration: '28 min', completed: false }
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'Community Engagement and Leadership',
      description: 'Develop leadership skills and learn effective community engagement strategies for social impact projects.',
      instructor: 'Sneha Reddy',
      duration: '3 weeks',
      lessons: 9,
      level: 'Beginner',
      category: 'Leadership',
      rating: 4.6,
      students: 1156,
      progress: 0,
      certificate: false,
      thumbnail: '/images/community-engagement-course.jpg',
      modules: [
        {
          id: 1,
          title: 'Leadership Fundamentals',
          lessons: [
            { id: 1, title: 'Leadership Styles', duration: '18 min', completed: false },
            { id: 2, title: 'Communication Skills', duration: '22 min', completed: false },
            { id: 3, title: 'Decision Making', duration: '20 min', completed: false }
          ]
        }
      ]
    }
  ];

  // Mock achievements
  const achievements = [
    {
      id: 1,
      title: 'Blockchain Beginner',
      description: 'Completed Introduction to Blockchain course',
      date: '2023-05-15',
      icon: '🔗'
    },
    {
      id: 2,
      title: 'Data Analyst',
      description: 'Completed Data Analytics for Social Impact course',
      date: '2023-04-22',
      icon: '📊'
    },
    {
      id: 3,
      title: 'Quick Learner',
      description: 'Completed 5 courses in 30 days',
      date: '2023-03-10',
      icon: '⚡'
    },
    {
      id: 4,
      title: 'Community Builder',
      description: 'Shared knowledge with 10+ other learners',
      date: '2023-02-28',
      icon: '👥'
    }
  ];

  // Mock learning paths
  const learningPaths = [
    {
      id: 1,
      title: 'Blockchain for Humanitarian Aid',
      description: 'Master blockchain technology applications in humanitarian work',
      courses: [1, 2],
      duration: '10 weeks',
      level: 'Intermediate'
    },
    {
      id: 2,
      title: 'Data-Driven Social Impact',
      description: 'Become proficient in using data to drive social change',
      courses: [3, 4],
      duration: '8 weeks',
      level: 'Beginner'
    }
  ];

  const handleEnroll = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  const handleUnenroll = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter(id => id !== courseId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('impactAcademy.title')}</h1>
          <p className="mt-2 text-gray-600">{t('impactAcademy.description')}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('impactAcademy.courses')}
            </button>
            <button
              onClick={() => setActiveTab('learningPaths')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'learningPaths'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('impactAcademy.learningPaths')}
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'progress'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('impactAcademy.myProgress')}
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'certificates'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('impactAcademy.certificates')}
            </button>
          </nav>
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full bg-indigo-100 flex items-center justify-center"><svg class="h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        course.level === 'Beginner' 
                          ? 'bg-green-100 text-green-800' 
                          : course.level === 'Intermediate' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {course.level}
                      </span>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">{course.title}</h3>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-sm text-gray-500">{course.description}</p>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="ml-1">{course.instructor}</span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-1">{course.duration} • {course.lessons} lessons</span>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="ml-1">{course.students} students</span>
                  </div>
                  
                  {enrolledCourses.includes(course.id) && course.progress > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{t('impactAcademy.progress')}</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 flex justify-between">
                    {enrolledCourses.includes(course.id) ? (
                      <>
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="flex-1 mr-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          {t('impactAcademy.continue')}
                        </button>
                        <button
                          onClick={() => handleUnenroll(course.id)}
                          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          {t('impactAcademy.unenroll')}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id)}
                        className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        {t('impactAcademy.enroll')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Learning Paths Tab */}
        {activeTab === 'learningPaths' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {learningPaths.map((path) => (
              <div key={path.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between">
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      path.level === 'Beginner' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {path.level}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-gray-900">{path.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium text-gray-900">{path.duration}</div>
                    <div className="text-sm text-gray-500">{t('impactAcademy.duration')}</div>
                  </div>
                </div>
                
                <p className="mt-3 text-gray-600">{path.description}</p>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900">{t('impactAcademy.includedCourses')}</h4>
                  <ul className="mt-2 space-y-2">
                    {path.courses.map((courseId) => {
                      const course = courses.find(c => c.id === courseId);
                      return (
                        <li key={courseId} className="flex items-center">
                          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="ml-2 text-sm text-gray-600">{course?.title}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <button className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    {t('impactAcademy.enrollInPath')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('impactAcademy.overallProgress')}</h3>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      ></circle>
                      <circle
                        className="text-indigo-600  progress-ring__circle"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset="75.36"
                        transform="rotate(-90 50 50)"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">70%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">{t('impactAcademy.completedCourses')}</p>
                  <p className="text-lg font-medium text-gray-900">2 of 4</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('impactAcademy.achievements')}</h3>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-lg">{achievement.icon}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t('impactAcademy.courseProgress')}</h3>
              <div className="space-y-6">
                {courses.filter(course => enrolledCourses.includes(course.id)).map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between">
                      <h4 className="text-md font-medium text-gray-900">{course.title}</h4>
                      <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-3 flex justify-between text-sm text-gray-500">
                      <span>{course.modules.length} {t('impactAcademy.modules')}</span>
                      <span>{course.lessons} {t('impactAcademy.lessons')}</span>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        {t('impactAcademy.continueLearning')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.filter(course => course.certificate && enrolledCourses.includes(course.id) && course.progress === 100).map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500">{t('impactAcademy.issuedOn')} {course.modules[0]?.lessons[0]?.completed ? 'May 15, 2023' : 'April 22, 2023'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{t('impactAcademy.issuer')}</p>
                        <p className="text-sm text-gray-500">ImpactX Academy</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{t('impactAcademy.recipient')}</p>
                        <p className="text-sm text-gray-500">User Name</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      {t('impactAcademy.download')}
                    </button>
                    <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      {t('impactAcademy.share')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {courses.filter(course => course.certificate && enrolledCourses.includes(course.id) && course.progress < 100).length > 0 && (
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('impactAcademy.inProgressCertificates')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.filter(course => course.certificate && enrolledCourses.includes(course.id) && course.progress < 100).map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-md bg-yellow-100 flex items-center justify-center">
                            <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-500">{course.progress}% {t('impactAcademy.completed')}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{t('impactAcademy.progressToCertificate')}</span>
                          <span>{100 - course.progress}% {t('impactAcademy.remaining')}</span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-600 h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          {t('impactAcademy.continue')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedCourse.title}</h3>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('impactAcademy.courseOverview')}</h4>
                  <p className="text-gray-600">{selectedCourse.description}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('impactAcademy.courseProgress')}</h4>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{t('impactAcademy.overallProgress')}</span>
                    <span>{selectedCourse.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${selectedCourse.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('impactAcademy.courseContent')}</h4>
                  <div className="space-y-4">
                    {selectedCourse.modules.map((module) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg">
                        <div className="px-4 py-3 bg-white border-b border-gray-200">
                          <h5 className="font-medium text-gray-900">{module.title}</h5>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {module.lessons.map((lesson) => (
                            <div key={lesson.id} className="px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50">
                              <div className="flex items-center">
                                <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                                  lesson.completed ? 'bg-green-100' : 'bg-gray-100'
                                }`}>
                                  {lesson.completed ? (
                                    <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  ) : (
                                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                  )}
                                </div>
                                <span className="ml-3 text-sm font-medium text-gray-900">{lesson.title}</span>
                              </div>
                              <span className="text-xs text-gray-500">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {t('impactAcademy.close')}
                  </button>
                  <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    {t('impactAcademy.continueLearning')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImpactAcademy;