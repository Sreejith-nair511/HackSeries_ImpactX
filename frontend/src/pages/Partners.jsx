import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Partners = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('organizations');
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    partnershipType: 'ngo'
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPartnerForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Partner form submitted:', partnerForm);
    alert(t('partners.formSubmitted'));
    setPartnerForm({
      name: '',
      email: '',
      organization: '',
      message: '',
      partnershipType: 'ngo'
    });
  };

  // Mock partner data
  const partners = [
    {
      id: 1,
      name: 'Red Cross Society',
      logo: '/images/partners/red-cross.png',
      type: 'ngo',
      description: t('partners.redCrossDescription'),
      website: 'https://redcross.org'
    },
    {
      id: 2,
      name: 'UNICEF India',
      logo: '/images/partners/unicef.png',
      type: 'ngo',
      description: t('partners.unicefDescription'),
      website: 'https://unicef.in'
    },
    {
      id: 3,
      name: 'National Disaster Response Force',
      logo: '/images/partners/ndrf.png',
      type: 'government',
      description: t('partners.ndrfDescription'),
      website: 'https://ndrf.gov.in'
    },
    {
      id: 4,
      name: 'Google.org',
      logo: '/images/partners/google-org.png',
      type: 'corporate',
      description: t('partners.googleOrgDescription'),
      website: 'https://google.org'
    },
    {
      id: 5,
      name: 'World Food Programme',
      logo: '/images/partners/wfp.png',
      type: 'ngo',
      description: t('partners.wfpDescription'),
      website: 'https://wfp.org'
    },
    {
      id: 6,
      name: 'Ministry of Home Affairs',
      logo: '/images/partners/mha.png',
      type: 'government',
      description: t('partners.mhaDescription'),
      website: 'https://mha.gov.in'
    },
    {
      id: 7,
      name: 'Microsoft Philanthropies',
      logo: '/images/partners/microsoft.png',
      type: 'corporate',
      description: t('partners.microsoftDescription'),
      website: 'https://microsoft.com/philanthropies'
    },
    {
      id: 8,
      name: 'Oxfam India',
      logo: '/images/partners/oxfam.png',
      type: 'ngo',
      description: t('partners.oxfamDescription'),
      website: 'https://oxfam.org.in'
    }
  ];

  const partnerTypes = [
    { id: 'ngo', name: t('partners.ngoPartners') },
    { id: 'government', name: t('partners.governmentPartners') },
    { id: 'corporate', name: t('partners.corporatePartners') },
    { id: 'academic', name: t('partners.academicPartners') }
  ];

  const [selectedType, setSelectedType] = useState('all');

  const filteredPartners = selectedType === 'all' 
    ? partners 
    : partners.filter(partner => partner.type === selectedType);

  return (
    <div className="partners-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{t('partners.title')}</h1>
        <p className="text-gray-600 mb-8">{t('partners.subtitle')}</p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">42</div>
            <div className="text-gray-600">{t('partners.ngoPartnersCount')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">18</div>
            <div className="text-gray-600">{t('partners.governmentPartnersCount')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24</div>
            <div className="text-gray-600">{t('partners.corporatePartnersCount')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
            <div className="text-gray-600">{t('partners.academicPartnersCount')}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b">
          <nav className="flex space-x-8">
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'organizations' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('organizations')}
            >
              {t('partners.partnerOrganizations')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'collaboration' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('collaboration')}
            >
              {t('partners.collaboration')}
            </button>
            <button
              className={`py-2 px-1 font-medium text-sm ${activeTab === 'contact' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('contact')}
            >
              {t('partners.becomePartner')}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'organizations' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">{t('partners.ourPartners')}</h2>
              
              {/* Partner Type Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedType === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setSelectedType('all')}
                >
                  {t('partners.allPartners')}
                </button>
                {partnerTypes.map(type => (
                  <button
                    key={type.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedType === type.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    {type.name}
                  </button>
                ))}
              </div>

              {/* Partners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.map(partner => (
                  <div key={partner.id} className="border rounded-lg p-5 hover:shadow-md transition duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div className="ml-4">
                        <h3 className="font-medium text-lg">{partner.name}</h3>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          partner.type === 'ngo' ? 'bg-blue-100 text-blue-800' :
                          partner.type === 'government' ? 'bg-green-100 text-green-800' :
                          partner.type === 'corporate' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {partner.type === 'ngo' ? t('partners.ngo') :
                           partner.type === 'government' ? t('partners.government') :
                           partner.type === 'corporate' ? t('partners.corporate') :
                           t('partners.academic')}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      {t('partners.visitWebsite')}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'collaboration' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('partners.collaborationTitle')}</h2>
              <div className="prose max-w-none">
                <h3 className="text-xl font-medium mt-6 mb-3">{t('partners.collaborationBenefits')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-5">
                    <h4 className="font-medium text-lg mb-2">{t('partners.transparency')}</h4>
                    <p className="text-gray-600">{t('partners.transparencyDescription')}</p>
                  </div>
                  <div className="border rounded-lg p-5">
                    <h4 className="font-medium text-lg mb-2">{t('partners.verification')}</h4>
                    <p className="text-gray-600">{t('partners.verificationDescription')}</p>
                  </div>
                  <div className="border rounded-lg p-5">
                    <h4 className="font-medium text-lg mb-2">{t('partners.efficiency')}</h4>
                    <p className="text-gray-600">{t('partners.efficiencyDescription')}</p>
                  </div>
                  <div className="border rounded-lg p-5">
                    <h4 className="font-medium text-lg mb-2">{t('partners.scalability')}</h4>
                    <p className="text-gray-600">{t('partners.scalabilityDescription')}</p>
                  </div>
                </div>

                <h3 className="text-xl font-medium mt-8 mb-3">{t('partners.collaborationModels')}</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-lg mb-2">{t('partners.fundingPartnership')}</h4>
                    <p className="text-gray-600 mb-3">{t('partners.fundingDescription')}</p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>{t('partners.fundingBenefit1')}</li>
                      <li>{t('partners.fundingBenefit2')}</li>
                      <li>{t('partners.fundingBenefit3')}</li>
                      <li>{t('partners.fundingBenefit4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-2">{t('partners.technicalPartnership')}</h4>
                    <p className="text-gray-600 mb-3">{t('partners.technicalDescription')}</p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>{t('partners.technicalBenefit1')}</li>
                      <li>{t('partners.technicalBenefit2')}</li>
                      <li>{t('partners.technicalBenefit3')}</li>
                      <li>{t('partners.technicalBenefit4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-2">{t('partners.implementationPartnership')}</h4>
                    <p className="text-gray-600 mb-3">{t('partners.implementationDescription')}</p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>{t('partners.implementationBenefit1')}</li>
                      <li>{t('partners.implementationBenefit2')}</li>
                      <li>{t('partners.implementationBenefit3')}</li>
                      <li>{t('partners.implementationBenefit4')}</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-5 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">{t('partners.successStory')}</h3>
                  <p className="text-blue-700">{t('partners.successStoryDescription')}</p>
                  <blockquote className="border-l-4 border-blue-500 pl-4 mt-3 italic">
                    "Partnering with ImpactX has transformed how we track and verify our disaster relief efforts. The transparency and accountability provided by their blockchain-based system has significantly improved donor trust and allowed us to allocate resources more effectively."
                  </blockquote>
                  <p className="text-blue-700 mt-2">- {t('partners.successStoryAttribution')}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('partners.becomePartnerTitle')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('partners.fullName')}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={partnerForm.name}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('partners.email')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={partnerForm.email}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('partners.organization')}
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={partnerForm.organization}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('partners.partnershipType')}
                      </label>
                      <select
                        name="partnershipType"
                        value={partnerForm.partnershipType}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="ngo">{t('partners.ngo')}</option>
                        <option value="government">{t('partners.government')}</option>
                        <option value="corporate">{t('partners.corporate')}</option>
                        <option value="academic">{t('partners.academic')}</option>
                        <option value="other">{t('partners.other')}</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('partners.message')}
                      </label>
                      <textarea
                        name="message"
                        value={partnerForm.message}
                        onChange={handleFormChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                      >
                        {t('partners.submitInquiry')}
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">{t('partners.partnershipBenefits')}</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">{t('partners.benefitTransparency')}</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">{t('partners.benefitVerification')}</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">{t('partners.benefitReporting')}</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">{t('partners.benefitNetwork')}</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">{t('partners.benefitImpact')}</p>
                    </li>
                  </ul>

                  <div className="mt-8 p-5 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">{t('partners.contactInfo')}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span>partnerships@impactx.example.com</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>123 Disaster Relief Blvd, Mumbai, India</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Partners;