import { FormData, PredictionResult } from '@/contexts/FormContext';

function calcBMI(height: string, weight: string): number {
  const h = parseFloat(height) / 100; // cm to m
  const w = parseFloat(weight);
  if (!h || !w) return 0;
  return Math.round((w / (h * h)) * 10) / 10;
}

function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function calculateRisk(data: FormData): PredictionResult {
  const bmi = calcBMI(data.height, data.weight);
  const age = parseInt(data.age) || 25;

  // BMI score (0-25)
  let bmiScore = 0;
  if (bmi < 18.5) bmiScore = 10;
  else if (bmi < 25) bmiScore = 0;
  else if (bmi < 30) bmiScore = 15;
  else bmiScore = 25;

  // Age score (0-15)
  let ageScore = 0;
  if (age > 60) ageScore = 15;
  else if (age > 45) ageScore = 10;
  else if (age > 35) ageScore = 5;

  // Activity score (0-20)
  let activityScore = 0;
  if (data.activityLevel === 'low') activityScore = 20;
  else if (data.activityLevel === 'moderate') activityScore = 8;
  else activityScore = 0;

  // Sleep score (0-15)
  let sleepScore = 0;
  const sleep = parseFloat(data.sleepDuration) || 7;
  if (sleep < 5) sleepScore = 15;
  else if (sleep < 6) sleepScore = 10;
  else if (sleep > 9) sleepScore = 8;
  else sleepScore = 0;

  // Smoking score (0-15)
  const smokingScore = data.smokingHabit === 'yes' ? 15 : 0;

  // Family history score (0-10)
  const familyScore = data.familyHistory === 'yes' ? 10 : 0;

  const totalRisk = bmiScore + ageScore + activityScore + sleepScore + smokingScore + familyScore;
  const healthScore = Math.max(0, Math.min(100, 100 - totalRisk));

  const riskLevel: 'Low' | 'Medium' | 'High' = healthScore >= 70 ? 'Low' : healthScore >= 40 ? 'Medium' : 'High';

  // Predicted diseases
  const predictedDiseases: string[] = [];
  if (bmi >= 30) predictedDiseases.push('Obesity');
  if (bmi >= 25 || data.activityLevel === 'low') predictedDiseases.push('Heart Disease');
  if (bmi >= 25 && (data.familyHistory === 'yes' || age > 45)) predictedDiseases.push('Type 2 Diabetes');
  if (data.smokingHabit === 'yes') predictedDiseases.push('Respiratory Disease');
  if (sleep < 6 || data.activityLevel === 'low') predictedDiseases.push('Stress & Mental Health Issues');
  if (bmi >= 25 && age > 40) predictedDiseases.push('Hypertension');
  if (predictedDiseases.length === 0) predictedDiseases.push('No significant risk detected');

  // Suggestions
  const suggestions: string[] = [];
  if (bmi >= 25) suggestions.push('Maintain a balanced diet and aim for a healthy BMI between 18.5-24.9');
  if (data.activityLevel === 'low') suggestions.push('Increase physical activity to at least 30 minutes of moderate exercise daily');
  if (sleep < 6) suggestions.push('Aim for 7-8 hours of quality sleep each night');
  if (sleep > 9) suggestions.push('Oversleeping can indicate health issues — aim for 7-8 hours');
  if (data.smokingHabit === 'yes') suggestions.push('Quit smoking — it significantly reduces heart and lung disease risk');
  if (data.familyHistory === 'yes') suggestions.push('Schedule regular health screenings due to family history of diseases');
  if (age > 45) suggestions.push('Get annual health checkups including blood pressure, sugar, and cholesterol');
  if (suggestions.length === 0) suggestions.push('Keep maintaining your healthy lifestyle!', 'Stay hydrated and eat more fruits and vegetables');

  const clampCategoryScore = (value: number): number => Math.max(0, Math.min(25, Math.round(value)));
  const catLevel = (score: number): 'Low' | 'Medium' | 'High' => {
    if (score <= 8) return 'Low';
    if (score <= 16) return 'Medium';
    return 'High';
  };

  const bmiCategoryScore = clampCategoryScore(bmiScore);
  const heartCategoryScore = clampCategoryScore(bmiScore + activityScore);
  const diabetesCategoryScore = clampCategoryScore(bmiScore + familyScore + ageScore);
  const lifestyleCategoryScore = clampCategoryScore(activityScore + sleepScore);
  const mentalWellnessCategoryScore = clampCategoryScore(sleepScore + activityScore);

  const categoryScores = [
    { name: 'BMI & Obesity', score: bmiCategoryScore, level: catLevel(bmiCategoryScore) },
    { name: 'Heart Health', score: heartCategoryScore, level: catLevel(heartCategoryScore) },
    { name: 'Diabetes Risk', score: diabetesCategoryScore, level: catLevel(diabetesCategoryScore) },
    { name: 'Lifestyle', score: lifestyleCategoryScore, level: catLevel(lifestyleCategoryScore) },
    { name: 'Mental Wellness', score: mentalWellnessCategoryScore, level: catLevel(mentalWellnessCategoryScore) },
  ];

  return {
    riskLevel,
    healthScore,
    predictedDiseases: [...new Set(predictedDiseases)],
    suggestions,
    bmi,
    bmiCategory: bmiCategory(bmi),
    categoryScores,
    timestamp: new Date().toISOString(),
  };
}
