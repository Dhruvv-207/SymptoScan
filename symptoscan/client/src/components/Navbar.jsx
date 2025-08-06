import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaUserMd, 
  FaSignOutAlt, 
  FaUser,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaStethoscope,
  FaTachometerAlt
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const publicLinks = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/about', label: 'About', icon: FaInfoCircle },
    { path: '/contact', label: 'Contact', icon: FaEnvelope },
  ];

  const privateLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { path: '/symptom-checker', label: 'Symptom Checker', icon: FaStethoscope },
  ];

  return (
    <nav className="glass sticky top-0 z-50 px-4 py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaUserMd className="text-3xl text-neon-blue" />
            <span className="text-2xl font-bold gradient-text">
              SymptoScan
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {publicLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive(path)
                    ? 'text-neon-blue neon-blue'
                    : 'text-white hover:text-neon-blue hover:bg-white/10'
                }`}
              >
                <Icon className="text-sm" />
                <span>{label}</span>
              </Link>
            ))}

            {isAuthenticated && (
              <>
                {privateLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive(path)
                        ? 'text-neon-blue neon-blue'
                        : 'text-white hover:text-neon-blue hover:bg-white/10'
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span>{label}</span>
                  </Link>
                ))}
              </>
            )}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-white flex items-center space-x-2">
                  <FaUser className="text-neon-green" />
                  <span className="hidden lg:inline">Welcome, {user?.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white hover:text-neon-blue transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 btn-primary rounded-lg text-white font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 glass-dark rounded-lg p-4"
          >
            <div className="flex flex-col space-y-4">
              {publicLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive(path)
                      ? 'text-neon-blue bg-white/10'
                      : 'text-white hover:text-neon-blue hover:bg-white/10'
                  }`}
                >
                  <Icon />
                  <span>{label}</span>
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  {privateLinks.map(({ path, label, icon: Icon }) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                        isActive(path)
                          ? 'text-neon-blue bg-white/10'
                          : 'text-white hover:text-neon-blue hover:bg-white/10'
                      }`}
                    >
                      <Icon />
                      <span>{label}</span>
                    </Link>
                  ))}
                  
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex items-center space-x-2 px-3 py-2 text-white">
                      <FaUser className="text-neon-green" />
                      <span>Welcome, {user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 text-white"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}

              {!isAuthenticated && (
                <div className="border-t border-white/20 pt-4 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-3 py-2 text-center text-white hover:text-neon-blue transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-3 py-2 btn-primary rounded-lg text-center text-white font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;