const express = require('express');
const Prediction = require('../models/Prediction');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const isValidPredictionPayload = (result) => {
  if (!result || typeof result !== 'object') return false;
  if (!['Low', 'Medium', 'High'].includes(result.riskLevel)) return false;
  if (typeof result.healthScore !== 'number') return false;
  if (typeof result.bmi !== 'number') return false;
  if (typeof result.bmiCategory !== 'string') return false;
  if (!Array.isArray(result.predictedDiseases)) return false;
  if (!Array.isArray(result.suggestions)) return false;
  if (!Array.isArray(result.categoryScores)) return false;
  return true;
};

router.get('/', requireAuth, async (req, res) => {
  try {
    const docs = await Prediction.find({ user: req.auth.userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const predictions = docs.map((doc) => ({
      riskLevel: doc.riskLevel,
      healthScore: doc.healthScore,
      predictedDiseases: doc.predictedDiseases || [],
      suggestions: doc.suggestions || [],
      bmi: doc.bmi,
      bmiCategory: doc.bmiCategory,
      categoryScores: doc.categoryScores || [],
      timestamp: new Date(doc.createdAt).toISOString(),
    }));

    return res.status(200).json(predictions);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch predictions.' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const formData = req.body.formData;
    const result = req.body.result;

    if (!formData || typeof formData !== 'object') {
      return res.status(422).json({ message: 'formData is required.' });
    }

    if (!isValidPredictionPayload(result)) {
      return res.status(422).json({ message: 'Invalid prediction payload.' });
    }

    const saved = await Prediction.create({
      user: req.auth.userId,
      formData,
      riskLevel: result.riskLevel,
      healthScore: result.healthScore,
      predictedDiseases: result.predictedDiseases,
      suggestions: result.suggestions,
      bmi: result.bmi,
      bmiCategory: result.bmiCategory,
      categoryScores: result.categoryScores,
    });

    return res.status(201).json({
      riskLevel: saved.riskLevel,
      healthScore: saved.healthScore,
      predictedDiseases: saved.predictedDiseases || [],
      suggestions: saved.suggestions || [],
      bmi: saved.bmi,
      bmiCategory: saved.bmiCategory,
      categoryScores: saved.categoryScores || [],
      timestamp: new Date(saved.createdAt).toISOString(),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save prediction.' });
  }
});

module.exports = router;
