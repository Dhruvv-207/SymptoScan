import mongoose from 'mongoose';

const diagnosisResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symptoms: [{
    type: String,
    required: true
  }],
  possibleDiseases: [{
    name: String,
    probability: Number,
    description: String
  }],
  recommendations: [String],
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Low'
  }
}, {
  timestamps: true
});

export default mongoose.model('DiagnosisResult', diagnosisResultSchema);