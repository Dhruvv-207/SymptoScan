# 🏥 SymptoScan - AI-Powered Healthcare Assistant

A dynamic and visually stunning MERN stack healthcare web application that provides AI-powered symptom analysis and personalized health insights.

![SymptoScan](https://img.shields.io/badge/Status-Complete-brightgreen)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🔐 Authentication & Security
- **Secure User Registration & Login** with form validation
- **JWT-based authentication** with protected routes
- **Password hashing** using bcrypt
- **Session management** with token verification

### 🧠 AI-Powered Health Analysis
- **Dynamic Symptom Checker** with 10+ categories
- **Smart Disease Matching** algorithm
- **Severity Assessment** (Low, Medium, High, Critical)
- **Personalized Recommendations**
- **Medical Disclaimers** for user safety

### 📱 Premium User Experience
- **Lamborghini-style UI** with glassmorphism effects
- **Neon accents** and smooth animations
- **Fully responsive design** for all devices
- **Framer Motion animations** for smooth transitions
- **Toast notifications** for user feedback

### 📊 User Dashboard
- **Health Overview** with statistics
- **Diagnosis History** tracking
- **Quick Actions** for easy navigation
- **Health Tips** and recommendations

### 📞 Communication
- **Contact Form** with backend integration
- **FAQ Section** for common questions
- **Emergency Contact Information**
- **Support Resources**

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for styling with custom themes
- **Framer Motion** for animations
- **React Router DOM** for navigation
- **Axios** for API communication
- **React Hot Toast** for notifications
- **React Icons** for consistent iconography

### Backend
- **Node.js** with Express framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests
- **dotenv** for environment management

### Database Schema
- **User Model**: Authentication and profile data
- **Symptom Model**: Symptom definitions and disease mappings
- **DiagnosisResult Model**: User diagnosis history
- **ContactMessage Model**: Contact form submissions

## 📁 Project Structure

```
symptoscan/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth)
│   │   ├── pages/          # Page components
│   │   ├── utils/          # API utilities
│   │   └── index.css       # Global styles
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # Express routes
│   ├── middleware/         # Custom middleware
│   ├── seedData.js         # Database seeder
│   └── server.js           # Main server file
├── start.sh                # Startup script
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn** package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd symptoscan
   ```

2. **Start MongoDB**
   ```bash
   # Option 1: Using systemctl (Linux)
   sudo systemctl start mongod
   
   # Option 2: Direct command
   mongod --dbpath /path/to/your/db
   ```

3. **Use the startup script (Recommended)**
   ```bash
   ./start.sh
   ```
   
   This script will:
   - Check system requirements
   - Install dependencies
   - Seed the database
   - Start both frontend and backend

4. **Manual Setup (Alternative)**
   ```bash
   # Backend setup
   cd server
   npm install
   npm run seed    # Seed database with sample data
   npm run dev     # Start backend server
   
   # Frontend setup (new terminal)
   cd client
   npm install
   npm run dev     # Start frontend server
   ```

### 🌐 Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🎯 Usage Guide

### For New Users
1. **Visit the homepage** to learn about SymptoScan
2. **Sign up** for a free account
3. **Complete your profile** with basic information
4. **Start using the symptom checker**

### Using the Symptom Checker
1. **Navigate** to the Symptom Checker page
2. **Select symptoms** from the categorized list
3. **Use search** to find specific symptoms
4. **Filter by category** to narrow options
5. **Click "Get Diagnosis"** for AI analysis
6. **Review results** including severity and recommendations

### Dashboard Features
- **View statistics** of your health checks
- **Access diagnosis history** for tracking
- **Use quick actions** for common tasks
- **Read health tips** for wellness

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/symptoscan
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

### Database Seeding
The application includes sample data for:
- **10 common symptoms** (Headache, Fever, Fatigue, etc.)
- **Multiple disease mappings** per symptom
- **Probability scores** for accurate matching
- **Medical descriptions** for each condition

## 🔒 Security Features

- **Password hashing** with bcrypt (10 rounds)
- **JWT token authentication** with expiration
- **Protected API routes** with middleware
- **Input validation** on all forms
- **CORS configuration** for secure requests
- **Environment variable protection**

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach** using Tailwind CSS
- **Flexible grid layouts** that adapt to screen sizes
- **Touch-friendly interfaces** for mobile users
- **Optimized images** and assets
- **Fast loading times** with Vite optimization

## 🎨 UI/UX Features

### Design Elements
- **Glassmorphism effects** for modern appearance
- **Neon color scheme** with blue, purple, pink, and green accents
- **Smooth animations** using Framer Motion
- **Consistent iconography** with React Icons
- **Loading states** and feedback for all actions

### Accessibility
- **Semantic HTML** structure
- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **High contrast** color combinations
- **Responsive text sizing**

## 🧪 Sample Data

The application includes comprehensive sample data:

```javascript
// Example symptom with disease mappings
{
  "name": "Headache",
  "description": "Pain in the head or upper neck",
  "category": "Neurological",
  "relatedDiseases": [
    {
      "name": "Migraine",
      "probability": 0.8,
      "description": "Severe recurring headache..."
    },
    // ... more diseases
  ]
}
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/verify` - Verify JWT token

### Symptoms & Diagnosis
- `GET /api/symptoms` - Get all symptoms
- `GET /api/symptoms/category/:category` - Get symptoms by category
- `POST /api/symptoms/diagnose` - Perform diagnosis
- `GET /api/symptoms/history` - Get user's diagnosis history

### Contact
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get contact messages (admin)

## 🚨 Medical Disclaimer

**Important**: SymptoScan is for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding medical conditions.

### Emergency Situations
- **Call 911** for medical emergencies
- **Contact Poison Control**: 1-800-222-1222
- **Crisis Text Line**: Text HOME to 741741

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Medical data** sourced from reputable healthcare databases
- **UI inspiration** from modern healthcare applications
- **Icons** provided by React Icons
- **Animations** powered by Framer Motion
- **Styling** enhanced with Tailwind CSS

## 📞 Support

If you encounter any issues or have questions:

- **Email**: support@symptoscan.com
- **Phone**: +1 (555) 123-4567
- **Hours**: Monday-Friday, 9AM-6PM EST

---

**Made with ❤️ for better healthcare accessibility**
