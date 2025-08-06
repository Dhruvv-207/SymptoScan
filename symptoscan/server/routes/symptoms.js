import express from 'express';
import Symptom from '../models/Symptom.js';
import DiagnosisResult from '../models/DiagnosisResult.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all symptoms
router.get('/', async (req, res) => {
  try {
    const symptoms = await Symptom.find({}).select('name description category');
    res.json({ symptoms });
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    res.status(500).json({ message: 'Server error fetching symptoms' });
  }
});

// Get symptoms by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const symptoms = await Symptom.find({ category }).select('name description category');
    res.json({ symptoms });
  } catch (error) {
    console.error('Error fetching symptoms by category:', error);
    res.status(500).json({ message: 'Server error fetching symptoms' });
  }
});

// Perform diagnosis
router.post('/diagnose', authenticateToken, async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ message: 'At least one symptom is required' });
    }

    // Find related diseases for the symptoms
    const symptomData = await Symptom.find({ 
      name: { $in: symptoms } 
    });

    if (symptomData.length === 0) {
      return res.status(404).json({ message: 'No matching symptoms found' });
    }

    // Calculate disease probabilities
    const diseaseMap = new Map();
    
    symptomData.forEach(symptom => {
      symptom.relatedDiseases.forEach(disease => {
        const diseaseName = disease.name;
        if (diseaseMap.has(diseaseName)) {
          const existing = diseaseMap.get(diseaseName);
          existing.count += 1;
          existing.totalProbability += disease.probability;
        } else {
          diseaseMap.set(diseaseName, {
            name: diseaseName,
            count: 1,
            totalProbability: disease.probability,
            description: disease.description
          });
        }
      });
    });

    // Sort diseases by relevance (count * average probability)
    const possibleDiseases = Array.from(diseaseMap.values())
      .map(disease => ({
        name: disease.name,
        probability: Math.round((disease.count / symptoms.length) * (disease.totalProbability / disease.count) * 100),
        description: disease.description
      }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 5); // Top 5 results

    // Determine severity based on top probability
    let severity = 'Low';
    if (possibleDiseases.length > 0) {
      const topProbability = possibleDiseases[0].probability;
      if (topProbability >= 80) severity = 'Critical';
      else if (topProbability >= 60) severity = 'High';
      else if (topProbability >= 40) severity = 'Medium';
    }

    // Generate recommendations
    const recommendations = [
      'Consult with a healthcare professional for proper diagnosis',
      'Monitor your symptoms and note any changes',
      'Maintain a healthy lifestyle with proper diet and exercise',
      'Get adequate rest and stay hydrated'
    ];

    if (severity === 'High' || severity === 'Critical') {
      recommendations.unshift('Seek immediate medical attention');
    }

    // Save diagnosis result
    const diagnosisResult = new DiagnosisResult({
      user: req.user._id,
      symptoms,
      possibleDiseases,
      recommendations,
      severity
    });

    await diagnosisResult.save();

    // Update user's diagnosis history
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        diagnosisHistory: {
          symptoms,
          results: possibleDiseases.map(d => d.name),
          date: new Date()
        }
      }
    });

    res.json({
      message: 'Diagnosis completed',
      result: {
        symptoms,
        possibleDiseases,
        recommendations,
        severity,
        disclaimer: 'This is not a medical diagnosis. Please consult with a healthcare professional.'
      }
    });

  } catch (error) {
    console.error('Diagnosis error:', error);
    res.status(500).json({ message: 'Server error during diagnosis' });
  }
});

// Get user's diagnosis history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const results = await DiagnosisResult.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({ history: results });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ message: 'Server error fetching history' });
  }
});

export default router;