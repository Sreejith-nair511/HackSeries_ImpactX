import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Transparent & Verifiable Disaster Relief Funding</h1>
        <p className="text-xl text-gray-600 mb-8">
          Empowering donors with blockchain transparency and multi-oracle verification for disaster relief efforts.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/donate" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Donate Now
          </Link>
          <Link 
            to="/campaigns" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            View Campaigns
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 text-3xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold mb-2">Blockchain Transparency</h3>
          <p className="text-gray-600">
            All donations and fund releases are recorded on the Algorand blockchain for complete transparency.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-green-600 text-3xl mb-4">✅</div>
          <h3 className="text-xl font-semibold mb-2">Multi-Oracle Verification</h3>
          <p className="text-gray-600">
            Proof of aid delivery verified by multiple oracles (drones, satellites, IoT) with weighted voting.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-purple-600 text-3xl mb-4">📁</div>
          <h3 className="text-xl font-semibold mb-2">IPFS Storage</h3>
          <p className="text-gray-600">
            Proof documents stored securely on IPFS with hashes anchored to the blockchain.
          </p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">1</div>
            <h3 className="font-semibold">Create Campaign</h3>
            <p className="text-sm text-gray-600">NGOs create disaster relief campaigns</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">2</div>
            <h3 className="font-semibold">Donate</h3>
            <p className="text-sm text-gray-600">Donors contribute funds to escrow</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">3</div>
            <h3 className="font-semibold">Verify</h3>
            <p className="text-sm text-gray-600">Oracles verify proof of aid delivery</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">4</div>
            <h3 className="font-semibold">Release</h3>
            <p className="text-sm text-gray-600">Funds released to NGO upon verification</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;