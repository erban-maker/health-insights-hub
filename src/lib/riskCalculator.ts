import { FormData } from '@/contexts/FormContext';

export interface RiskResult {
  overallRisk: 'Low' | 'Moderate' | 'High';
  overallScore: number;
  categories: {
    name: string;
    score: number;
    level: 'Low' | 'Moderate' | 'High';
    recommendations: string[];
  }[];
}

function categorize(score: number): 'Low' | 'Moderate' | 'High' {
  if (score <= 3) return 'Low';
  if (score <= 6) return 'Moderate';
  return 'High';
}

export function calculateRisk(data: FormData): RiskResult {
  // BMI Risk
  let bmiScore = 0;
  const bmi = parseFloat(data.bmi);
  if (bmi < 18.5) bmiScore = 3;
  else if (bmi < 25) bmiScore = 0;
  else if (bmi < 30) bmiScore = 4;
  else bmiScore = 8;

  // Age Risk
  let ageScore = 0;
  const age = parseInt(data.age);
  if (age > 60) ageScore = 5;
  else if (age > 45) ageScore = 3;
  else if (age > 30) ageScore = 1;

  // Lifestyle Risk
  let lifestyleScore = 0;
  if (data.exerciseFrequency === 'never') lifestyleScore += 4;
  else if (data.exerciseFrequency === 'rarely') lifestyleScore += 3;
  else if (data.exerciseFrequency === 'sometimes') lifestyleScore += 1;
  if (data.activityLevel === 'sedentary') lifestyleScore += 3;
  else if (data.activityLevel === 'light') lifestyleScore += 1;
  const sleep = parseFloat(data.sleepDuration);
  if (sleep < 5 || sleep > 10) lifestyleScore += 3;
  else if (sleep < 6 || sleep > 9) lifestyleScore += 1;

  // Diet Risk
  let dietScore = 0;
  if (data.junkFoodFrequency === 'daily') dietScore += 4;
  else if (data.junkFoodFrequency === 'frequently') dietScore += 3;
  else if (data.junkFoodFrequency === 'sometimes') dietScore += 1;
  if (data.fruitVegIntake === 'rarely') dietScore += 3;
  else if (data.fruitVegIntake === 'sometimes') dietScore += 1;
  const water = parseInt(data.waterIntake);
  if (water < 4) dietScore += 2;

  // Behavioral Risk
  let behaviorScore = 0;
  if (data.smokingStatus === 'regular') behaviorScore += 5;
  else if (data.smokingStatus === 'occasional') behaviorScore += 3;
  else if (data.smokingStatus === 'former') behaviorScore += 1;
  if (data.alcoholConsumption === 'heavy') behaviorScore += 4;
  else if (data.alcoholConsumption === 'moderate') behaviorScore += 2;
  else if (data.alcoholConsumption === 'occasional') behaviorScore += 1;

  // Mental Health Risk
  let mentalScore = 0;
  if (data.stressLevel === 'very_high') mentalScore += 5;
  else if (data.stressLevel === 'high') mentalScore += 3;
  else if (data.stressLevel === 'moderate') mentalScore += 1;
  const screen = parseInt(data.screenTime);
  if (screen > 10) mentalScore += 3;
  else if (screen > 6) mentalScore += 1;

  // Family History Risk
  let familyScore = 0;
  if (data.familyDiabetes) familyScore += 2;
  if (data.familyHypertension) familyScore += 2;
  if (data.familyHeartDisease) familyScore += 2;
  if (data.familyObesity) familyScore += 1;
  if (data.familyCancer) familyScore += 1;

  const categories = [
    {
      name: 'Obesity & BMI',
      score: Math.min(bmiScore, 10),
      level: categorize(bmiScore),
      recommendations: bmiScore > 3
        ? ['Maintain a balanced diet', 'Exercise at least 30 minutes daily', 'Consult a nutritionist']
        : ['Keep maintaining your healthy weight'],
    },
    {
      name: 'Cardiovascular',
      score: Math.min(Math.round((behaviorScore + bmiScore + ageScore) / 3), 10),
      level: categorize(Math.round((behaviorScore + bmiScore + ageScore) / 3)),
      recommendations: behaviorScore > 3
        ? ['Quit smoking if applicable', 'Limit alcohol intake', 'Regular cardiovascular checkups']
        : ['Maintain your healthy habits'],
    },
    {
      name: 'Diabetes',
      score: Math.min(Math.round((dietScore + bmiScore + familyScore) / 3), 10),
      level: categorize(Math.round((dietScore + bmiScore + familyScore) / 3)),
      recommendations: dietScore > 3
        ? ['Reduce sugar and refined carb intake', 'Monitor blood glucose levels', 'Increase fiber intake']
        : ['Continue healthy eating habits'],
    },
    {
      name: 'Lifestyle & Activity',
      score: Math.min(lifestyleScore, 10),
      level: categorize(lifestyleScore),
      recommendations: lifestyleScore > 3
        ? ['Increase daily physical activity', 'Aim for 7-8 hours of sleep', 'Take regular breaks from sitting']
        : ['Your activity level is good'],
    },
    {
      name: 'Mental Wellness',
      score: Math.min(mentalScore, 10),
      level: categorize(mentalScore),
      recommendations: mentalScore > 3
        ? ['Practice meditation or mindfulness', 'Reduce screen time before bed', 'Seek professional support if needed']
        : ['Your mental wellness indicators are positive'],
    },
    {
      name: 'Genetic Predisposition',
      score: Math.min(familyScore, 10),
      level: categorize(familyScore),
      recommendations: familyScore > 3
        ? ['Get regular health screenings', 'Share family history with your doctor', 'Monitor relevant biomarkers']
        : ['Low genetic risk, continue preventive measures'],
    },
  ];

  const totalScore = categories.reduce((sum, c) => sum + c.score, 0);
  const avgScore = totalScore / categories.length;

  return {
    overallRisk: categorize(avgScore),
    overallScore: Math.round(avgScore * 10) / 10,
    categories,
  };
}
