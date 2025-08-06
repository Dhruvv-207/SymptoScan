import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUserMd, 
  FaHeart, 
  FaShieldAlt, 
  FaRocket,
  FaUsers,
  FaAward,
  FaGlobe,
  FaChartLine
} from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: FaHeart,
      title: 'Patient-Centered Care',
      description: 'We put your health and well-being at the center of everything we do.',
      color: 'text-neon-pink'
    },
    {
      icon: FaShieldAlt,
      title: 'Privacy & Security',
      description: 'Your health data is protected with enterprise-grade security and encryption.',
      color: 'text-neon-green'
    },
    {
      icon: FaRocket,
      title: 'Innovation',
      description: 'We continuously improve our AI technology to provide better health insights.',
      color: 'text-neon-blue'
    },
    {
      icon: FaUsers,
      title: 'Accessibility',
      description: 'Making healthcare insights available to everyone, everywhere.',
      color: 'text-neon-purple'
    }
  ];

  const stats = [
    { number: '100K+', label: 'Users Worldwide', icon: FaUsers },
    { number: '1M+', label: 'Symptoms Analyzed', icon: FaChartLine },
    { number: '50+', label: 'Medical Conditions', icon: FaUserMd },
    { number: '99.9%', label: 'Uptime', icon: FaGlobe }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      description: 'Board-certified physician with 15+ years in digital health and AI-powered diagnostics.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-Founder',
      description: 'Former Google AI engineer specializing in machine learning and healthcare applications.',
      avatar: '👨‍💻'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Head of Research',
      description: 'PhD in Biomedical Informatics, leading our symptom analysis and disease prediction algorithms.',
      avatar: '👩‍🔬'
    },
    {
      name: 'David Park',
      role: 'Head of Product',
      description: 'Healthcare product expert focused on creating intuitive user experiences.',
      avatar: '👨‍💼'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 glass-dark rounded-full">
                <FaUserMd className="text-5xl text-neon-blue" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              About SymptoScan
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing healthcare by making AI-powered symptom analysis 
              accessible to everyone. Our mission is to empower individuals with instant, 
              accurate health insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 glass-dark">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold gradient-text mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                At SymptoScan, we believe that everyone deserves access to reliable health information. 
                Our advanced AI technology analyzes symptoms and provides personalized insights, 
                helping you make informed decisions about your health.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                We're not replacing doctors – we're empowering you with the knowledge to have 
                better conversations with your healthcare providers and take proactive steps 
                toward better health.
              </p>
              <div className="flex items-center space-x-4">
                <div className="p-3 glass rounded-full">
                  <FaAward className="text-2xl text-neon-blue" />
                </div>
                <div>
                  <div className="text-white font-semibold">FDA Compliant</div>
                  <div className="text-gray-400 text-sm">Following healthcare regulations</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">What We Do</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaChartLine className="text-neon-blue text-xl mt-1" />
                  <div>
                    <div className="text-white font-medium">AI-Powered Analysis</div>
                    <div className="text-gray-400 text-sm">Advanced algorithms analyze symptom patterns</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaShieldAlt className="text-neon-green text-xl mt-1" />
                  <div>
                    <div className="text-white font-medium">Secure & Private</div>
                    <div className="text-gray-400 text-sm">Your health data is always protected</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaUsers className="text-neon-purple text-xl mt-1" />
                  <div>
                    <div className="text-white font-medium">Expert-Backed</div>
                    <div className="text-gray-400 text-sm">Developed with medical professionals</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaGlobe className="text-neon-pink text-xl mt-1" />
                  <div>
                    <div className="text-white font-medium">Globally Accessible</div>
                    <div className="text-gray-400 text-sm">Available 24/7 from anywhere</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Our Impact</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by thousands of users worldwide for reliable health insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="p-4 glass-dark rounded-full w-fit mx-auto mb-4">
                  <stat.icon className="text-3xl text-neon-blue" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 glass-dark">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-4 glass-dark rounded-full ${value.color}`}>
                    <value.icon className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experts in healthcare, AI, and technology working together to improve global health
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 text-center card-hover"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <div className="text-neon-blue font-medium mb-3">{member.role}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 glass-dark">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Our Technology</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Built on cutting-edge AI and machine learning technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-white mb-3">Machine Learning</h3>
              <p className="text-gray-300 text-sm">
                Advanced neural networks trained on millions of medical cases to provide accurate symptom analysis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-white mb-3">Security First</h3>
              <p className="text-gray-300 text-sm">
                End-to-end encryption and HIPAA-compliant infrastructure to protect your sensitive health data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3">Real-time Analysis</h3>
              <p className="text-gray-300 text-sm">
                Get instant results with our optimized algorithms that process symptoms in milliseconds.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;