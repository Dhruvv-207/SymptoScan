import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className={`spinner ${sizeClasses[size]} mb-4`}></div>
      <p className="text-white text-lg font-medium animate-pulse">{text}</p>
    </div>
  );
};

export default LoadingSpinner;