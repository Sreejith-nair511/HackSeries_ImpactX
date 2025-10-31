import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ImpactAcademy = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('courses');

  // Mock data for certification modules
  const courses = [
    {
      id: 1,
      title: t('academy.blockchainTransparency'),
      instructor: "Dr. Sarah Johnson",
      duration: "8 weeks",
      level: "Intermediate",
      students: 1240,
      rating: 4.8,
      description: t('academy.blockchainDesc'),
      modules: 12
    },
    {
      id: 2,
      title: t('academy.climateData'),
      instructor: "Prof. Michael Chen",
      duration: "6 weeks",
      level: "Beginner",
      students: 2150,
      rating: 4.9,
      description: t('academy.climateDesc'),
      modules: 8
    },
    {
      id: 3,
      title: t('academy.ethics'),
      instructor: "Dr. Priya Sharma",
      duration: "4 weeks",
      level: "All Levels",
      students: 3420,
      rating: 4.7,
      description: t('academy.ethicsDesc'),
      modules: 6
    }
  ];

  // Mock data for virtual classrooms
  const classrooms = [
    { id: 1, name: "NGO Partnerships", partner: "UNICEF", nextSession: "2024-03-20", participants: 45 },
    { id: 2, name: "Blockchain for Social Impact", partner: "Ethereum Foundation", nextSession: "2024-03-22", participants: 78 },
    { id: 3, name: "Data Privacy in Humanitarian Work", partner: "Red Cross", nextSession: "2024-03-25", participants: 32 }
  ];

  // Mock data for learning rewards
  const rewards = [
    { id: 1, name: "Course Completion", tokens: 50, requirement: t('academy.completeCourse') },
    { id: 2, name: "Quiz Mastery", tokens: 25, requirement: t('academy.score90') },
    { id: 3, name: "Community Contribution", tokens: 75, requirement: t('academy.helpOthers') },
    { id: 4, name: "Certification", tokens: 100, requirement: t('academy.earnCert') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            {t('academy.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('academy.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('courses')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'courses'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('academy.courses')}
              </button>
              <button
                onClick={() => setActiveTab('classrooms')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'classrooms'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('academy.virtualClassrooms')}
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'rewards'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('academy.learningRewards')}
              </button>
              <button
                onClick={() => setActiveTab('partners')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'partners'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('academy.partnerships')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'courses' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('academy.certificationModules')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          course.level === 'Beginner' 
                            ? 'bg-green-100 text-green-800' 
                            : course.level === 'Intermediate' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {course.level}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{course.duration} • {course.modules} {t('academy.modules')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="text-gray-900 font-medium">{course.rating}</span>
                          <span className="text-gray-500 ml-1">({course.students} {t('academy.students')})</span>
                        </div>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                          {t('academy.enroll')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('academy.learningPath')}
                  </h3>
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600" style={{ width: '65%' }}></div>
                    </div>
                    <div className="ml-4 text-sm text-gray-600">
                      {t('academy.completed')} 2 {t('academy.of')} 5 {t('academy.courses')}
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button className="px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                      {t('academy.continueLearning')}
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      {t('academy.viewProgress')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'classrooms' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('academy.virtualClassrooms')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {classrooms.map((classroom) => (
                    <div key={classroom.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{classroom.name}</h3>
                          <p className="text-indigo-600">{classroom.partner}</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {t('academy.active')}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>{t('academy.nextSession')}: {classroom.nextSession}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          <span className="text-gray-600">{classroom.participants} {t('academy.participants')}</span>
                        </div>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                          {t('academy.joinClass')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('academy.upcomingClasses')}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <div>
                        <div className="font-medium text-gray-900">{t('academy.blockchainWorkshop')}</div>
                        <div className="text-sm text-gray-600">{t('academy.apr5')} • 2:00 PM UTC</div>
                      </div>
                      <button className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
                        {t('academy.register')}
                      </button>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <div>
                        <div className="font-medium text-gray-900">{t('academy.dataPrivacySeminar')}</div>
                        <div className="text-sm text-gray-600">{t('academy.apr12')} • 3:00 PM UTC</div>
                      </div>
                      <button className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
                        {t('academy.register')}
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">{t('academy.ethicsPanel')}</div>
                        <div className="text-sm text-gray-600">{t('academy.apr18')} • 1:00 PM UTC</div>
                      </div>
                      <button className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
                        {t('academy.register')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('academy.learnAndEarn')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {rewards.map((reward) => (
                    <div key={reward.id} className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                      <div className="text-3xl font-bold mb-2">{reward.tokens} IMPX</div>
                      <h3 className="text-lg font-semibold mb-2">{reward.name}</h3>
                      <p className="text-indigo-100 text-sm">{reward.requirement}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('academy.yourProgress')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <div className="text-2xl font-bold text-gray-900">1250</div>
                      <div className="text-sm text-gray-600">{t('academy.totalEarned')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <div className="text-2xl font-bold text-gray-900">4</div>
                      <div className="text-sm text-gray-600">{t('academy.coursesCompleted')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <div className="text-2xl font-bold text-gray-900">18</div>
                      <div className="text-sm text-gray-600">{t('academy.quizzesPassed')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <div className="text-2xl font-bold text-gray-900">2450</div>
                      <div className="text-sm text-gray-600">{t('academy.communityPoints')}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('academy.redeemRewards')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-1">{t('academy.courseDiscount')}</div>
                      <div className="text-sm text-gray-600 mb-2">500 IMPX</div>
                      <button className="w-full py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
                        {t('academy.redeem')}
                      </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-1">{t('academy.premiumAccess')}</div>
                      <div className="text-sm text-gray-600 mb-2">1000 IMPX</div>
                      <button className="w-full py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
                        {t('academy.redeem')}
                      </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="font-medium text-gray-900 mb-1">{t('academy.certification')}</div>
                      <div className="text-sm text-gray-600 mb-2">750 IMPX</div>
                      <button className="w-full py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
                        {t('academy.redeem')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'partners' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('academy.globalPartnerships')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('academy.ngoPartners')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">UNICEF</div>
                          <div className="text-sm text-gray-600">{t('academy.childWelfare')}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">Red Cross</div>
                          <div className="text-sm text-gray-600">{t('academy.disasterResponse')}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">Doctors Without Borders</div>
                          <div className="text-sm text-gray-600">{t('academy.medicalAid')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('academy.academicPartners')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">MIT</div>
                          <div className="text-sm text-gray-600">{t('academy.technologyResearch')}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">Stanford University</div>
                          <div className="text-sm text-gray-600">{t('academy.socialImpact')}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">Oxford</div>
                          <div className="text-sm text-gray-600">{t('academy.policyResearch')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('academy.becomePartner')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('academy.partnerDesc')}
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    {t('academy.contactUs')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactAcademy;