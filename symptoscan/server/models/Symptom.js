import mongoose from 'mongoose';

const symptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  relatedDiseases: [{
    name: {
      type: String,
      required: true
    },
    probability: {
      type: Number,
      default: 1
    },
    description: {
      type: String,
      default: ''
    }
  }],
  category: {
    type: String,
    enum: ['General', 'Respiratory', 'Cardiovascular', 'Neurological', 'Gastrointestinal', 'Musculoskeletal', 'Other'],
    default: 'General'
  }
}, {
  timestamps: true
});

export default mongoose.model('Symptom', symptomSchema);