
import React from 'react';
import { BANNER_SIZES } from '../constants';
import SparklesIcon from './icons/SparklesIcon';

interface AdDisplayProps {
  isLoading: boolean;
  error: string | null;
  imageUrl: string | null;
}

const AdDisplay: React.FC<AdDisplayProps> = ({ isLoading, error, imageUrl }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h3 className="text-lg font-semibold text-white">Generating Your Ads...</h3>
          <p className="text-gray-400">The AI is warming up. This might take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-red-900/20 rounded-lg p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-white">An Error Occurred</h3>
          <p className="text-red-300">{error}</p>
        </div>
      );
    }

    if (imageUrl) {
      return (
        <div className="p-1">
          <h2 className="text-xl font-bold mb-6 text-center text-white">Generated Ad Previews</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {BANNER_SIZES.map((size) => (
              <div key={size.name} className="flex flex-col items-center">
                <h3 className="text-sm font-semibold text-gray-300 mb-2">{`${size.name} (${size.width}x${size.height})`}</h3>
                <div
                  className="bg-gray-700 shadow-lg rounded-md overflow-hidden"
                  style={{ width: `${size.width}px`, height: `${size.height}px` }}
                >
                  <img
                    src={imageUrl}
                    alt={`Ad preview for ${size.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <SparklesIcon className="w-16 h-16 text-indigo-400 mb-4" />
        <h3 className="text-xl font-semibold text-white">Ready to Create?</h3>
        <p className="text-gray-400 max-w-sm">
          Fill in your product details on the left to generate a suite of professional banner ads instantly.
        </p>
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-auto p-4 md:p-8 custom-scrollbar">
      {renderContent()}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4f46e5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6366f1;
        }
      `}</style>
    </div>
  );
};

export default AdDisplay;
