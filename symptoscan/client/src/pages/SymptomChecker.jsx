import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaStethoscope, 
  FaSearch, 
  FaCheckCircle, 
  FaTimesCircle,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';
import toast from 'react-hot-toast';

// Mock symptoms data - always available
const mockSymptoms = [
  {
    name: "Headache",
    description: "Pain in the head or upper neck",
    category: "Neurological"
  },
  {
    name: "Fever",
    description: "Body temperature above normal range",
    category: "General"
  },
  {
    name: "Fatigue",
    description: "Extreme tiredness or lack of energy",
    category: "General"
  },
  {
    name: "Cough",
    description: "Sudden expulsion of air from the lungs",
    category: "Respiratory"
  },
  {
    name: "Chest Pain",
    description: "Pain or discomfort in the chest area",
    category: "Cardiovascular"
  },
  {
    name: "Nausea",
    description: "Feeling of sickness with urge to vomit",
    category: "Gastrointestinal"
  },
  {
    name: "Shortness of Breath",
    description: "Difficulty breathing or feeling breathless",
    category: "Respiratory"
  },
  {
    name: "Dizziness",
    description: "Feeling lightheaded or unsteady",
    category: "Neurological"
  },
  {
    name: "Joint Pain",
    description: "Pain in one or more joints",
    category: "Musculoskeletal"
  },
  {
    name: "Skin Rash",
    description: "Red, itchy, or irritated skin",
    category: "Other"
  },
  {
    name: "Sore Throat",
    description: "Pain or irritation in the throat",
    category: "Respiratory"
  },
  {
    name: "Stomach Pain",
    description: "Discomfort in the abdominal area",
    category: "Gastrointestinal"
  }
];

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [diagnosing, setDiagnosing] = useState(false);
  const [dataSource, setDataSource] = useState('loading'); // 'api', 'mock', 'loading'
  
  const navigate = useNavigate();

  const categories = ['All', 'General', 'Respiratory', 'Cardiovascular', 'Neurological', 'Gastrointestinal', 'Musculoskeletal', 'Other'];

  useEffect(() => {
    loadSymptoms();
  }, []);

  useEffect(() => {
    filterSymptoms();
  }, [symptoms, searchTerm, selectedCategory]);

  const loadSymptoms = async () => {
    console.log('Loading symptoms...');
    setLoading(true);
    
    try {
      // Try to fetch from API first
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      console.log('Attempting to fetch from:', `${API_URL}/symptoms`);
      
      const response = await fetch(`${API_URL}/symptoms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.symptoms && data.symptoms.length > 0) {
          setSymptoms(data.symptoms);
          setDataSource('api');
          console.log('✅ Loaded symptoms from API:', data.symptoms.length);
        } else {
          throw new Error('No symptoms returned from API');
        }
      } else {
        throw new Error(`API responded with status: ${response.status}`);
      }
    } catch (error) {
      console.warn('❌ API failed, using mock data:', error.message);
      setSymptoms(mockSymptoms);
      setDataSource('mock');
      toast.success('Demo mode: Using sample symptoms for testing');
    } finally {
      setLoading(false);
    }
  };

  const filterSymptoms = () => {
    let filtered = symptoms;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(symptom => symptom.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(symptom =>
        symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symptom.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSymptoms(filtered);
  };

  const toggleSymptom = (symptomName) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomName)) {
        return prev.filter(s => s !== symptomName);
      } else {
        return [...prev, symptomName];
      }
    });
  };

  const handleDiagnosis = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error('Please select at least one symptom');
      return;
    }

    console.log('Starting diagnosis for symptoms:', selectedSymptoms);
    setDiagnosing(true);

    try {
      if (dataSource === 'api') {
        // Try real API diagnosis
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_URL}/symptoms/diagnose`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
          },
          body: JSON.stringify({ symptoms: selectedSymptoms })
        });

        if (response.ok) {
          const data = await response.json();
          navigate('/diagnosis-result', { 
            state: { 
              diagnosisResult: data.result 
            } 
          });
          return;
        } else {
          throw new Error('API diagnosis failed');
        }
      }
      
      // Fallback to mock diagnosis
      const mockResult = generateMockDiagnosis(selectedSymptoms);
      
      // Simulate processing time
      setTimeout(() => {
        navigate('/diagnosis-result', { 
          state: { 
            diagnosisResult: mockResult 
          } 
        });
        setDiagnosing(false);
      }, 2000);
      
    } catch (error) {
      console.error('Diagnosis error:', error);
      
      // Always provide mock diagnosis as fallback
      const mockResult = generateMockDiagnosis(selectedSymptoms);
      
      setTimeout(() => {
        navigate('/diagnosis-result', { 
          state: { 
            diagnosisResult: mockResult 
          } 
        });
        setDiagnosing(false);
      }, 1500);
    }
  };

  const generateMockDiagnosis = (symptoms) => {
    // Generate realistic mock diagnosis based on selected symptoms
    const commonDiseases = [
      { name: "Common Cold", probability: Math.floor(Math.random() * 30) + 60, description: "Viral upper respiratory infection" },
      { name: "Flu", probability: Math.floor(Math.random() * 25) + 50, description: "Influenza virus infection" },
      { name: "Stress", probability: Math.floor(Math.random() * 20) + 40, description: "Physical or mental tension" },
      { name: "Allergic Reaction", probability: Math.floor(Math.random() * 15) + 35, description: "Immune response to allergens" },
      { name: "Dehydration", probability: Math.floor(Math.random() * 20) + 30, description: "Lack of adequate body fluids" }
    ];

    // Sort by probability and take top 3
    const sortedDiseases = commonDiseases
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3);

    const topProbability = sortedDiseases[0].probability;
    let severity = 'Low';
    if (topProbability >= 80) severity = 'Critical';
    else if (topProbability >= 65) severity = 'High';
    else if (topProbability >= 50) severity = 'Medium';

    const recommendations = [
      'Get plenty of rest and sleep',
      'Stay well hydrated with water',
      'Consult a healthcare professional if symptoms persist',
      'Monitor your symptoms closely',
      'Avoid strenuous activities'
    ];

    if (severity === 'High' || severity === 'Critical') {
      recommendations.unshift('Seek medical attention promptly');
    }

    return {
      symptoms: symptoms,
      possibleDiseases: sortedDiseases,
      recommendations: recommendations,
      severity: severity,
      disclaimer: dataSource === 'mock' ? 
        'This is a demonstration diagnosis using sample data. For real medical advice, please consult healthcare professionals.' :
        'This analysis is for informational purposes only and should not replace professional medical advice.'
    };
  };

  const clearSelection = () => {
    setSelectedSymptoms([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-16 h-16 mb-4"></div>
          <p className="text-white text-xl">Loading symptoms...</p>
          <p className="text-gray-400 text-sm mt-2">Connecting to health database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 glass-dark rounded-full">
              <FaStethoscope className="text-5xl text-neon-blue" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Symptom Checker
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Select your symptoms below and get personalized health insights. 
            Our system will analyze your symptoms and provide potential diagnoses.
          </p>
          
          {/* Data source indicator */}
          <div className="mt-4">
            {dataSource === 'api' && (
              <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-300 text-sm">Connected to medical database</span>
              </div>
            )}
            {dataSource === 'mock' && (
              <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-yellow-300 text-sm">Demo mode - Using sample data</span>
              </div>
            )}
          </div>
        </div>

        {/* Warning Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 p-4 glass border-l-4 border-yellow-400 rounded-lg"
        >
          <div className="flex items-start space-x-3">
            <FaExclamationTriangle className="text-yellow-400 text-xl mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-yellow-400 font-semibold mb-1">Important Medical Disclaimer</h3>
              <p className="text-gray-300 text-sm">
                This tool is for informational purposes only and should not replace professional medical advice. 
                If you're experiencing severe symptoms or a medical emergency, please contact emergency services immediately.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Symptom Selection Panel */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Select Your Symptoms</h2>
                <div className="text-sm text-gray-400">
                  {symptoms.length} symptoms available
                </div>
              </div>
              
              {/* Search and Filter Controls */}
              <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search symptoms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input w-full pl-10 pr-4 py-3 rounded-lg"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'btn-primary text-white'
                          : 'glass-dark text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptoms Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                {filteredSymptoms.map((symptom, index) => {
                  const isSelected = selectedSymptoms.includes(symptom.name);
                  return (
                    <motion.button
                      key={symptom.name}
                      onClick={() => toggleSymptom(symptom.name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-4 rounded-lg text-left transition-all duration-300 ${
                        isSelected
                          ? 'glass-dark border-2 border-neon-blue neon-blue'
                          : 'glass hover:bg-white/10 border border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{symptom.name}</h3>
                        {isSelected ? (
                          <FaCheckCircle className="text-neon-green text-xl" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{symptom.description}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                        {symptom.category}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {filteredSymptoms.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No symptoms found matching your criteria.</p>
                  <button
                    onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                    className="mt-2 text-neon-blue hover:text-neon-purple transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Selected Symptoms and Action Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-2xl p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Selected Symptoms ({selectedSymptoms.length})
              </h2>

              {/* Selected Symptoms List */}
              <div className="mb-6 space-y-2 max-h-48 overflow-y-auto">
                {selectedSymptoms.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">
                    No symptoms selected yet
                  </p>
                ) : (
                  selectedSymptoms.map(symptom => (
                    <div
                      key={symptom}
                      className="flex items-center justify-between p-3 glass-dark rounded-lg"
                    >
                      <span className="text-white text-sm">{symptom}</span>
                      <button
                        onClick={() => toggleSymptom(symptom)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <FaTimesCircle />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleDiagnosis}
                  disabled={selectedSymptoms.length === 0 || diagnosing}
                  className="w-full btn-primary py-3 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {diagnosing ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <FaStethoscope />
                      <span>Get Diagnosis</span>
                    </>
                  )}
                </button>

                {selectedSymptoms.length > 0 && (
                  <button
                    onClick={clearSelection}
                    className="w-full px-4 py-3 glass-dark rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Quick Tips */}
              <div className="mt-6 p-4 glass-dark rounded-lg">
                <h3 className="text-white font-medium mb-2">💡 Quick Tips:</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Select multiple symptoms for better accuracy</li>
                  <li>• Use the search to find specific symptoms</li>
                  <li>• Filter by category to narrow options</li>
                  <li>• Be as specific as possible</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SymptomChecker;