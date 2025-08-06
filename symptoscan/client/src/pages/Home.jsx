import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaStethoscope, 
  FaUserMd, 
  FaShieldAlt, 
  FaChartLine, 
  FaRocket,
  FaClock,
  FaHeart,
  FaArrowRight
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: FaStethoscope,
      title: 'AI-Powered Analysis',
      description: 'Advanced algorithms analyze your symptoms to provide accurate health insights and potential diagnoses.',
      color: 'text-neon-blue'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and protected. We never share your personal information with third parties.',
      color: 'text-neon-green'
    },
    {
      icon: FaChartLine,
      title: 'Track Your Health',
      description: 'Monitor your symptoms over time and track your health journey with detailed history and insights.',
      color: 'text-neon-purple'
    },
    {
      icon: FaClock,
      title: '24/7 Available',
      description: 'Get instant health insights anytime, anywhere. No appointments needed, no waiting rooms.',
      color: 'text-neon-pink'
    }
  ];

  const stats = [
    { number: '100K+', label: 'Users Helped', icon: FaUserMd },
    { number: '50+', label: 'Conditions Analyzed', icon: FaStethoscope },
    { number: '99%', label: 'User Satisfaction', icon: FaHeart },
    { number: '24/7', label: 'Always Available', icon: FaClock }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-blue/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-neon-pink/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <div className="p-6 glass-dark rounded-full animate-float">
                <FaUserMd className="text-6xl text-neon-blue" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 leading-tight">
              Your AI Health
              <br />
              <span className="text-white">Companion</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get instant, personalized health insights powered by advanced AI. 
              Analyze your symptoms, understand potential conditions, and take control of your health journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            {isAuthenticated ? (
              <Link
                to="/symptom-checker"
                className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold text-white flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
              >
                <FaStethoscope />
                <span>Start Symptom Check</span>
                <FaArrowRight />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold text-white flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
                >
                  <FaRocket />
                  <span>Get Started Free</span>
                  <FaArrowRight />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 glass rounded-lg text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
                >
                  Sign In
                </Link>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass rounded-2xl p-6 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="text-3xl text-neon-blue mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Why Choose SymptoScan?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of healthcare with our cutting-edge AI technology 
              designed to give you instant, accurate health insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 card-hover"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-4 glass-dark rounded-full ${feature.color}`}>
                    <feature.icon className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 glass-dark">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get personalized health insights in just three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Select Symptoms',
                description: 'Choose from our comprehensive database of symptoms and conditions',
                icon: FaStethoscope
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our advanced AI analyzes your symptoms and medical patterns',
                icon: FaChartLine
              },
              {
                step: '03',
                title: 'Get Results',
                description: 'Receive instant insights, recommendations, and next steps',
                icon: FaUserMd
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto mb-4 neon-blue">
                    <item.icon className="text-3xl text-neon-blue" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Ready to Take Control?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust SymptoScan for their health insights. 
              Start your journey to better health today.
            </p>
            
            {isAuthenticated ? (
              <Link
                to="/symptom-checker"
                className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold text-white inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
              >
                <FaStethoscope />
                <span>Check Your Symptoms</span>
                <FaArrowRight />
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold text-white inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
                >
                  <FaRocket />
                  <span>Start Free Today</span>
                  <FaArrowRight />
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 glass rounded-lg text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;