import { useState, useEffect } from 'react';

const IndianFlag = ({ size = 'medium', interactive = false }) => {
  const [isWaving, setIsWaving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // Start waving animation after component mounts
    const timer = setTimeout(() => {
      setIsWaving(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'w-12 h-8';
      case 'large': return 'w-20 h-12';
      default: return 'w-16 h-10';
    }
  };
  
  const handleFlagClick = () => {
    if (interactive) {
      setIsWaving(!isWaving);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`relative overflow-hidden rounded ${getSizeClasses()} ${isWaving ? 'animate-flag-wave' : ''} ${isHovered ? 'scale-110' : ''} transition-transform duration-300 cursor-pointer`}
        onClick={handleFlagClick}
        onMouseEnter={() => interactive && setIsHovered(true)}
        onMouseLeave={() => interactive && setIsHovered(false)}
      >
        {/* Saffron stripe */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-[#FF9933]"></div>
        
        {/* White stripe */}
        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white">
          {/* Ashoka Chakra */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#000080]">
            {/* Chakra spokes */}
            {[...Array(24)].map((_, i) => (
              <div 
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-0.5 bg-[#000080]"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
                  transformOrigin: 'center'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Green stripe */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#138808]"></div>
      </div>
      
      <style jsx>{`
        @keyframes flag-wave {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-2deg); }
          100% { transform: rotate(0deg); }
        }
        
        .animate-flag-wave {
          animation: flag-wave 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Export the component
export default IndianFlag;