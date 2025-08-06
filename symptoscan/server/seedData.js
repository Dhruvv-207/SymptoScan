import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Symptom from './models/Symptom.js';

dotenv.config();

const sampleSymptoms = [
  {
    name: "Headache",
    description: "Pain in the head or upper neck",
    category: "Neurological",
    relatedDiseases: [
      { name: "Migraine", probability: 0.8, description: "Severe recurring headache with nausea and light sensitivity" },
      { name: "Tension Headache", probability: 0.9, description: "Most common type of headache caused by stress or muscle tension" },
      { name: "Brain Tumor", probability: 0.1, description: "Rare but serious condition requiring immediate medical attention" },
      { name: "Sinusitis", probability: 0.6, description: "Inflammation of sinus cavities causing head pain" }
    ]
  },
  {
    name: "Fever",
    description: "Body temperature above normal range",
    category: "General",
    relatedDiseases: [
      { name: "Flu", probability: 0.8, description: "Viral infection affecting respiratory system" },
      { name: "COVID-19", probability: 0.7, description: "Coronavirus infection with various symptoms" },
      { name: "Malaria", probability: 0.3, description: "Mosquito-borne infectious disease" },
      { name: "Pneumonia", probability: 0.6, description: "Infection of the lungs" }
    ]
  },
  {
    name: "Fatigue",
    description: "Extreme tiredness or lack of energy",
    category: "General",
    relatedDiseases: [
      { name: "Anemia", probability: 0.7, description: "Low red blood cell count or hemoglobin" },
      { name: "Thyroid Disorder", probability: 0.6, description: "Overactive or underactive thyroid gland" },
      { name: "Diabetes", probability: 0.5, description: "High blood sugar levels" },
      { name: "Depression", probability: 0.6, description: "Mental health condition affecting mood and energy" }
    ]
  },
  {
    name: "Cough",
    description: "Sudden expulsion of air from the lungs",
    category: "Respiratory",
    relatedDiseases: [
      { name: "Common Cold", probability: 0.9, description: "Viral upper respiratory tract infection" },
      { name: "Bronchitis", probability: 0.7, description: "Inflammation of the bronchial tubes" },
      { name: "Asthma", probability: 0.6, description: "Chronic respiratory condition" },
      { name: "Pneumonia", probability: 0.5, description: "Infection of the lungs" }
    ]
  },
  {
    name: "Chest Pain",
    description: "Pain or discomfort in the chest area",
    category: "Cardiovascular",
    relatedDiseases: [
      { name: "Heart Attack", probability: 0.3, description: "Blocked blood flow to heart muscle - EMERGENCY" },
      { name: "Angina", probability: 0.5, description: "Chest pain due to reduced blood flow to heart" },
      { name: "Acid Reflux", probability: 0.7, description: "Stomach acid backing up into esophagus" },
      { name: "Muscle Strain", probability: 0.6, description: "Strained chest muscles from overuse" }
    ]
  },
  {
    name: "Nausea",
    description: "Feeling of sickness with urge to vomit",
    category: "Gastrointestinal",
    relatedDiseases: [
      { name: "Food Poisoning", probability: 0.8, description: "Illness from contaminated food" },
      { name: "Gastroenteritis", probability: 0.7, description: "Inflammation of stomach and intestines" },
      { name: "Migraine", probability: 0.6, description: "Severe headache often accompanied by nausea" },
      { name: "Pregnancy", probability: 0.5, description: "Morning sickness during early pregnancy" }
    ]
  },
  {
    name: "Shortness of Breath",
    description: "Difficulty breathing or feeling breathless",
    category: "Respiratory",
    relatedDiseases: [
      { name: "Asthma", probability: 0.8, description: "Chronic respiratory condition" },
      { name: "Heart Disease", probability: 0.6, description: "Various conditions affecting heart function" },
      { name: "Pneumonia", probability: 0.7, description: "Infection of the lungs" },
      { name: "Anxiety", probability: 0.5, description: "Mental health condition causing physical symptoms" }
    ]
  },
  {
    name: "Dizziness",
    description: "Feeling lightheaded or unsteady",
    category: "Neurological",
    relatedDiseases: [
      { name: "Low Blood Pressure", probability: 0.7, description: "Blood pressure below normal range" },
      { name: "Inner Ear Problem", probability: 0.6, description: "Issues with balance organs in ear" },
      { name: "Dehydration", probability: 0.8, description: "Lack of adequate body fluids" },
      { name: "Anemia", probability: 0.5, description: "Low red blood cell count" }
    ]
  },
  {
    name: "Joint Pain",
    description: "Pain in one or more joints",
    category: "Musculoskeletal",
    relatedDiseases: [
      { name: "Arthritis", probability: 0.8, description: "Inflammation of joints" },
      { name: "Fibromyalgia", probability: 0.6, description: "Chronic widespread muscle pain" },
      { name: "Lupus", probability: 0.3, description: "Autoimmune disease affecting joints and organs" },
      { name: "Gout", probability: 0.5, description: "Buildup of uric acid crystals in joints" }
    ]
  },
  {
    name: "Skin Rash",
    description: "Red, itchy, or irritated skin",
    category: "Other",
    relatedDiseases: [
      { name: "Allergic Reaction", probability: 0.8, description: "Immune response to allergens" },
      { name: "Eczema", probability: 0.7, description: "Chronic skin condition" },
      { name: "Psoriasis", probability: 0.5, description: "Autoimmune skin condition" },
      { name: "Contact Dermatitis", probability: 0.6, description: "Skin reaction to irritants" }
    ]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Clear existing symptoms
    await Symptom.deleteMany({});
    console.log('Cleared existing symptoms');

    // Insert sample symptoms
    await Symptom.insertMany(sampleSymptoms);
    console.log(`Inserted ${sampleSymptoms.length} symptoms successfully`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seeder if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export { seedDatabase, sampleSymptoms };