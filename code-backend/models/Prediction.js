const mongoose = require('mongoose');

const categoryScoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  level: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
}, { _id: false });

const predictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  formData: {
    type: Object,
    required: true,
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },
  healthScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  predictedDiseases: {
    type: [String],
    default: [],
  },
  suggestions: {
    type: [String],
    default: [],
  },
  bmi: {
    type: Number,
    required: true,
  },
  bmiCategory: {
    type: String,
    required: true,
  },
  categoryScores: {
    type: [categoryScoreSchema],
    default: [],
  },
}, {
  timestamps: true,
});

predictionSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Prediction', predictionSchema);
