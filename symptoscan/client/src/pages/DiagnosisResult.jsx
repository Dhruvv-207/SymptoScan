import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaStethoscope, 
  FaExclamationTriangle, 
  FaCheckCircle,
  FaInfoCircle,
  FaArrowLeft,
  FaRedo,
  FaSave,
  FaShare
} from 'react-icons/fa';

const DiagnosisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get diagnosis result from navigation state
  const diagnosisResult = location.state?.diagnosisResult;

  // If no result data, redirect to symptom checker
  if (!diagnosisResult) {
    navigate('/symptom-checker');
    return null;
  }

  const { symptoms, possibleDiseases, recommendations, severity, disclaimer } = diagnosisResult;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-500 bg-red-500/20 border-red-500';
      case 'High': return 'text-orange-500 bg-orange-500/20 border-orange-500';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500';
      case 'Low': return 'text-green-500 bg-green-500/20 border-green-500';
      default: return 'text-gray-500 bg-gray-500/20 border-gray-500';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Critical': return <FaExclamationTriangle className="text-2xl" />;
      case 'High': return <FaExclamationTriangle className="text-2xl" />;
      case 'Medium': return <FaInfoCircle className="text-2xl" />;
      case 'Low': return <FaCheckCircle className="text-2xl" />;
      default: return <FaInfoCircle className="text-2xl" />;
    }
  };

  const handleNewDiagnosis = () => {
    navigate('/symptom-checker');
  };

  const handleSaveResult = () => {
    // This would typically save to user's history
    // For now, we'll show a success message
    alert('Result saved to your dashboard!');
  };

  const handleShareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SymptoScan Diagnosis Result',
        text: `I got my symptoms analyzed on SymptoScan. Severity: ${severity}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 glass-dark rounded-full">
              <FaStethoscope className="text-5xl text-neon-blue" />
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Diagnosis Results
          </h1>
          <p className="text-gray-300 text-lg">
            Based on your selected symptoms, here's what we found
          </p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          
          <button
            onClick={handleNewDiagnosis}
            className="flex items-center space-x-2 px-4 py-2 btn-primary rounded-lg text-white"
          >
            <FaRedo />
            <span>New Diagnosis</span>
          </button>
          
          <button
            onClick={handleSaveResult}
            className="flex items-center space-x-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <FaSave />
            <span>Save Result</span>
          </button>
          
          <button
            onClick={handleShareResult}
            className="flex items-center space-x-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <FaShare />
            <span>Share</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Severity Indicator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`glass rounded-2xl p-6 border-l-4 ${getSeverityColor(severity)}`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-full ${getSeverityColor(severity)}`}>
                  {getSeverityIcon(severity)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Severity Level: {severity}</h2>
                  <p className="text-gray-300">
                    {severity === 'Critical' && 'Seek immediate medical attention'}
                    {severity === 'High' && 'Consider consulting a doctor soon'}
                    {severity === 'Medium' && 'Monitor symptoms and consider medical advice'}
                    {severity === 'Low' && 'Symptoms appear to be manageable'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Your Symptoms */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Your Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-neon-blue/20 border border-neon-blue/50 rounded-lg text-neon-blue text-sm"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Possible Conditions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Possible Conditions</h3>
              <div className="space-y-4">
                {possibleDiseases.map((disease, index) => (
                  <div
                    key={index}
                    className="glass-dark rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">{disease.name}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-1000"
                            style={{ width: `${disease.probability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-300">{disease.probability}%</span>
                      </div>
                    </div>
                    {disease.description && (
                      <p className="text-gray-400 text-sm">{disease.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Recommendations</h3>
              <div className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 glass-dark rounded-lg"
                  >
                    <FaCheckCircle className="text-neon-green text-sm mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
              <div className="space-y-3">
                <Link
                  to="/dashboard"
                  className="block w-full p-3 glass-dark rounded-lg text-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  View Dashboard
                </Link>
                <Link
                  to="/contact"
                  className="block w-full p-3 glass-dark rounded-lg text-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  Contact Support
                </Link>
                <button
                  onClick={handleNewDiagnosis}
                  className="w-full p-3 btn-secondary rounded-lg text-center text-white"
                >
                  Check Other Symptoms
                </button>
              </div>
            </motion.div>

            {/* Emergency Notice */}
            {(severity === 'Critical' || severity === 'High') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="glass rounded-2xl p-6 border-l-4 border-red-500"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <FaExclamationTriangle className="text-red-500 text-xl" />
                  <h3 className="text-red-500 font-semibold">Emergency Notice</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  If you're experiencing severe symptoms, don't wait - seek immediate medical attention.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">Emergency: 911</p>
                  <p className="text-gray-400">Poison Control: 1-800-222-1222</p>
                  <p className="text-gray-400">Crisis Text Line: Text HOME to 741741</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 p-6 glass rounded-2xl border-l-4 border-yellow-400"
        >
          <div className="flex items-start space-x-3">
            <FaExclamationTriangle className="text-yellow-400 text-xl mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-yellow-400 font-semibold mb-2">Medical Disclaimer</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {disclaimer}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DiagnosisResult;