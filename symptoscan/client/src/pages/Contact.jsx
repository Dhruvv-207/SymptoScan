import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaUser,
  FaComments,
  FaPaperPlane,
  FaClock,
  FaQuestionCircle,
  FaHeadset
} from 'react-icons/fa';
import { contactAPI } from '../utils/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await contactAPI.submitMessage(formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email Us',
      info: 'support@symptoscan.com',
      description: 'Send us an email anytime',
      color: 'text-neon-blue'
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9AM-6PM EST',
      color: 'text-neon-green'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      info: '123 Health Street',
      description: 'Medical City, HC 12345',
      color: 'text-neon-purple'
    }
  ];

  const faqItems = [
    {
      question: 'How accurate is SymptoScan?',
      answer: 'Our AI system has been trained on millions of medical cases and provides highly accurate symptom analysis. However, it should not replace professional medical advice.'
    },
    {
      question: 'Is my health data secure?',
      answer: 'Yes, we use enterprise-grade encryption and follow HIPAA compliance standards to protect your personal health information.'
    },
    {
      question: 'How much does SymptoScan cost?',
      answer: 'SymptoScan offers a free tier with basic symptom checking. Premium features are available with our subscription plans.'
    },
    {
      question: 'Can I use this for emergencies?',
      answer: 'No, SymptoScan is not intended for medical emergencies. If you\'re experiencing a medical emergency, please call 911 immediately.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 glass-dark rounded-full">
                <FaHeadset className="text-5xl text-neon-blue" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions about SymptoScan? Need support? We're here to help! 
              Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <FaComments className="text-neon-blue" />
              <span>Send us a Message</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input w-full pl-10 pr-4 py-3 rounded-lg ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input w-full pl-10 pr-4 py-3 rounded-lg ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`form-input w-full px-4 py-3 rounded-lg resize-none ${
                    errors.message ? 'border-red-500' : ''
                  }`}
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="spinner w-5 h-5"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Response Time Notice */}
            <div className="mt-6 p-4 glass-dark rounded-lg">
              <div className="flex items-center space-x-3">
                <FaClock className="text-neon-green text-xl" />
                <div>
                  <div className="text-white font-medium">Quick Response</div>
                  <div className="text-gray-400 text-sm">
                    We typically respond within 24 hours during business days
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Other Ways to Reach Us</h2>
              
              {contactInfo.map((contact, index) => (
                <div key={index} className="glass rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 glass-dark rounded-full ${contact.color}`}>
                      <contact.icon className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{contact.title}</h3>
                      <div className="text-neon-blue font-medium mb-1">{contact.info}</div>
                      <div className="text-gray-400 text-sm">{contact.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <FaQuestionCircle className="text-neon-purple" />
                <span>Frequently Asked Questions</span>
              </h2>
              
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div key={index} className="glass-dark rounded-lg p-4">
                    <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Emergency Notice */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass rounded-2xl p-6 border-l-4 border-red-500"
            >
              <div className="flex items-start space-x-3">
                <div className="text-red-500 text-xl">🚨</div>
                <div>
                  <h3 className="text-red-500 font-semibold mb-2">Medical Emergency?</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    If you're experiencing a medical emergency, don't use this contact form. 
                    Call emergency services immediately.
                  </p>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-400">Emergency: <span className="text-white font-medium">911</span></p>
                    <p className="text-gray-400">Poison Control: <span className="text-white font-medium">1-800-222-1222</span></p>
                    <p className="text-gray-400">Crisis Text Line: <span className="text-white font-medium">Text HOME to 741741</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold gradient-text text-center mb-8">
            More Ways We Can Help
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-white mb-3">Help Center</h3>
              <p className="text-gray-400 text-sm mb-4">
                Browse our comprehensive help articles and tutorials
              </p>
              <button className="btn-secondary px-4 py-2 rounded-lg text-white text-sm">
                Visit Help Center
              </button>
            </div>

            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-white mb-3">Live Chat</h3>
              <p className="text-gray-400 text-sm mb-4">
                Chat with our support team in real-time
              </p>
              <button className="btn-secondary px-4 py-2 rounded-lg text-white text-sm">
                Start Chat
              </button>
            </div>

            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-white mb-3">Webinars</h3>
              <p className="text-gray-400 text-sm mb-4">
                Join our educational webinars about health and wellness
              </p>
              <button className="btn-secondary px-4 py-2 rounded-lg text-white text-sm">
                View Schedule
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;