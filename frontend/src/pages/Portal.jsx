import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Portal = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('registration');
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    organization: '',
    role: 'ngo',
    skills: [],
    experience: ''
  });
  const [proofData, setProofData] = useState({
    title: '',
    description: '',
    file: null
  });
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Flood Relief Distribution',
      status: 'In Progress',
      progress: 75,
      ngo: 'Red Cross Society',
      volunteers: 12
    },
    {
      id: 2,
      name: 'Earthquake Shelter Setup',
      status: 'Completed',
      progress: 100,
      ngo: 'Disaster Response Team',
      volunteers: 8
    },
    {
      id: 3,
      name: 'Wildfire Recovery Program',
      status: 'Pending',
      progress: 0,
      ngo: 'Environmental Protection Agency',
      volunteers: 0
    }
  ]);

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProofChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setProofData(prev => ({
        ...prev,
        file: files[0]
      }));
    } else {
      setProofData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    console.log('Registration submitted:', registrationData);
    alert(t('portal.registrationSubmitted'));
  };

  const handleProofSubmit = (e) => {
    e.preventDefault();
    console.log('Proof submitted:', proofData);
    alert(t('portal.proofSubmitted'));
  };

  return (
    <div className="portal-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('portal.title')}</h1>
        
        {/* Tab Navigation */}
        <div className="mb-6 border-b">
          <nav className="flex space-x-8">
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'registration' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('registration')}
            >
              {t('portal.registration')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'proof' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('proof')}
            >
              {t('portal.proofSubmission')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'tracking' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('tracking')}
            >
              {t('portal.progressTracking')}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'registration' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('portal.registrationForm')}</h2>
              <form onSubmit={handleRegistrationSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('portal.name')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={registrationData.name}
                      onChange={handleRegistrationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('portal.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={registrationData.email}
                      onChange={handleRegistrationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('portal.organization')}
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={registrationData.organization}
                      onChange={handleRegistrationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('portal.role')}
                    </label>
                    <select
                      name="role"
                      value={registrationData.role}
                      onChange={handleRegistrationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ngo">{t('portal.ngo')}</option>
                      <option value="volunteer">{t('portal.volunteer')}</option>
                      <option value="partner">{t('portal.partner')}</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('portal.skills')}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['Medical', 'Logistics', 'Construction', 'Teaching', 'IT', 'Management', 'Translation', 'Counseling'].map(skill => (
                        <div key={skill} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`skill-${skill}`}
                            value={skill}
                            className="mr-2"
                          />
                          <label htmlFor={`skill-${skill}`} className="text-sm">
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('portal.experience')}
                    </label>
                    <textarea
                      name="experience"
                      value={registrationData.experience}
                      onChange={handleRegistrationChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    {t('portal.submitRegistration')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'proof' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('portal.proofSubmissionArea')}</h2>
              <form onSubmit={handleProofSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('portal.proofTitle')}
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={proofData.title}
                    onChange={handleProofChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('portal.proofDescription')}
                  </label>
                  <textarea
                    name="description"
                    value={proofData.description}
                    onChange={handleProofChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('portal.proofFile')}
                  </label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleProofChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('portal.proofFileTypes')}
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    {t('portal.submitProof')}
                  </button>
                </div>
              </form>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">{t('portal.submittedProofs')}</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(id => (
                    <div key={id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Flood Relief Distribution - Report #{id}</h4>
                          <p className="text-sm text-gray-600">Submitted on Oct 25, 2023</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verified
                        </span>
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm text-gray-600 mr-4">Report.pdf</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          {t('portal.download')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('portal.progressTracking')}</h2>
              <div className="space-y-6">
                {projects.map(project => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-medium">{project.name}</h3>
                        <p className="text-sm text-gray-600">{t('portal.managedBy')} {project.ngo}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('portal.progress')}</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <span>{project.volunteers} {t('portal.volunteers')}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        {t('portal.viewDetails')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portal;