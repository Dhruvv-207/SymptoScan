import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUserMd, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaHeart,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const legalLinks = [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/disclaimer', label: 'Medical Disclaimer' },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="glass-dark mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaUserMd className="text-3xl text-neon-blue" />
              <span className="text-2xl font-bold gradient-text">
                SymptoScan
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted healthcare companion for symptom analysis and medical guidance. 
              Get personalized health insights powered by advanced AI technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-neon-blue transition-colors duration-300 text-xl"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-gray-300 hover:text-neon-blue transition-colors duration-300 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-gray-300 hover:text-neon-blue transition-colors duration-300 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <FaEnvelope className="text-neon-blue" />
                <span>support@symptoscan.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <FaPhone className="text-neon-blue" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <FaMapMarkerAlt className="text-neon-blue" />
                <span>123 Health St, Medical City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-4 glass rounded-lg">
          <div className="text-center">
            <h4 className="text-yellow-400 font-semibold mb-2">⚠️ Medical Disclaimer</h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              SymptoScan is for informational purposes only and does not provide medical advice, 
              diagnosis, or treatment. Always consult with a qualified healthcare professional 
              for medical concerns. Do not use this tool for emergency situations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} SymptoScan. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>for better healthcare</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;