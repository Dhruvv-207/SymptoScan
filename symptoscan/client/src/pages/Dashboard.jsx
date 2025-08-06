import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaStethoscope, 
  FaChartLine, 
  FaCalendarAlt,
  FaHeart,
  FaUser,
  FaHistory,
  FaPlus,
  FaEye,
  FaDownload
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { symptomsAPI } from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDiagnoses: 0,
    recentSymptoms: [],
    lastCheckDate: null
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await symptomsAPI.getHistory();
      const history = response.data.history || [];
      
      setDiagnosisHistory(history);
      
      // Calculate stats
      const recentSymptoms = history.length > 0 ? history[0].symptoms : [];
      const lastCheckDate = history.length > 0 ? new Date(history[0].createdAt) : null;
      
      setStats({
        totalDiagnoses: history.length,
        recentSymptoms: recentSymptoms.slice(0, 3),
        lastCheckDate
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-500 bg-red-500/20';
      case 'High': return 'text-orange-500 bg-orange-500/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/20';
      case 'Low': return 'text-green-500 bg-green-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-16 h-16 mb-4"></div>
          <p className="text-white text-xl">Loading your dashboard...</p>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-300 text-lg">
            Here's your health overview and recent activity
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <div className="p-3 glass-dark rounded-full w-fit mx-auto mb-4">
              <FaStethoscope className="text-2xl text-neon-blue" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalDiagnoses}</div>
            <div className="text-gray-400 text-sm">Total Diagnoses</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <div className="p-3 glass-dark rounded-full w-fit mx-auto mb-4">
              <FaCalendarAlt className="text-2xl text-neon-green" />
            </div>
            <div className="text-lg font-bold text-white mb-1">
              {stats.lastCheckDate ? formatDate(stats.lastCheckDate).split(',')[0] : 'Never'}
            </div>
            <div className="text-gray-400 text-sm">Last Check</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <div className="p-3 glass-dark rounded-full w-fit mx-auto mb-4">
              <FaHeart className="text-2xl text-neon-pink" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.recentSymptoms.length}</div>
            <div className="text-gray-400 text-sm">Recent Symptoms</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <div className="p-3 glass-dark rounded-full w-fit mx-auto mb-4">
              <FaChartLine className="text-2xl text-neon-purple" />
            </div>
            <div className="text-lg font-bold text-white mb-1">Improving</div>
            <div className="text-gray-400 text-sm">Health Trend</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Diagnoses */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
                  <FaHistory className="text-neon-blue" />
                  <span>Recent Diagnoses</span>
                </h2>
                <Link
                  to="/symptom-checker"
                  className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center space-x-2"
                >
                  <FaPlus />
                  <span>New Check</span>
                </Link>
              </div>

              <div className="space-y-4">
                {diagnosisHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <FaStethoscope className="text-6xl text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">
                      No diagnoses yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Start by checking your symptoms to see your health insights
                    </p>
                    <Link
                      to="/symptom-checker"
                      className="btn-primary px-6 py-3 rounded-lg font-semibold text-white inline-flex items-center space-x-2"
                    >
                      <FaStethoscope />
                      <span>Start Symptom Check</span>
                    </Link>
                  </div>
                ) : (
                  diagnosisHistory.slice(0, 5).map((diagnosis, index) => (
                    <div
                      key={index}
                      className="glass-dark rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(diagnosis.severity)}`}>
                              {diagnosis.severity}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {formatDate(diagnosis.createdAt)}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {diagnosis.symptoms.slice(0, 3).map((symptom, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-neon-blue/20 border border-neon-blue/50 rounded text-neon-blue text-xs"
                              >
                                {symptom}
                              </span>
                            ))}
                            {diagnosis.symptoms.length > 3 && (
                              <span className="px-2 py-1 bg-gray-600/20 border border-gray-600/50 rounded text-gray-400 text-xs">
                                +{diagnosis.symptoms.length - 3} more
                              </span>
                            )}
                          </div>
                          <div className="text-white font-medium">
                            Top condition: {diagnosis.possibleDiseases[0]?.name || 'N/A'}
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-white transition-colors duration-300">
                          <FaEye />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/symptom-checker"
                  className="w-full p-3 btn-primary rounded-lg text-white font-medium flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
                >
                  <FaStethoscope />
                  <span>New Symptom Check</span>
                </Link>
                <Link
                  to="/contact"
                  className="w-full p-3 glass-dark rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
                >
                  <FaUser />
                  <span>Contact Support</span>
                </Link>
                <button className="w-full p-3 glass-dark rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
                  <FaDownload />
                  <span>Export Data</span>
                </button>
              </div>
            </motion.div>

            {/* Health Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Health Tips</h3>
              <div className="space-y-4">
                <div className="p-4 glass-dark rounded-lg">
                  <div className="text-neon-green text-sm font-medium mb-2">💡 Daily Tip</div>
                  <p className="text-gray-300 text-sm">
                    Stay hydrated! Drink at least 8 glasses of water daily to maintain optimal health.
                  </p>
                </div>
                <div className="p-4 glass-dark rounded-lg">
                  <div className="text-neon-blue text-sm font-medium mb-2">🏃 Exercise</div>
                  <p className="text-gray-300 text-sm">
                    Regular physical activity can help prevent many health conditions and improve your mood.
                  </p>
                </div>
                <div className="p-4 glass-dark rounded-lg">
                  <div className="text-neon-purple text-sm font-medium mb-2">😴 Sleep</div>
                  <p className="text-gray-300 text-sm">
                    Aim for 7-9 hours of quality sleep each night for better health and recovery.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Profile Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-xl" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{user?.name}</div>
                    <div className="text-gray-400 text-sm">{user?.email}</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="text-gray-400 text-sm mb-2">Member since</div>
                  <div className="text-white">
                    {user?.createdAt ? formatDate(user.createdAt).split(',')[0] : 'Recently'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;