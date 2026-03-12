
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Brain, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

const diseases = [
  {
    title: 'Diabetes (Type 2)',
    icon: Activity,
    color: 'hsl(36, 90%, 55%)',
    description: 'Type 2 diabetes occurs when the body becomes resistant to insulin or doesn\'t produce enough insulin. It\'s closely linked to lifestyle factors.',
    causes: ['Obesity and excess body fat', 'Physical inactivity', 'Poor diet high in sugar and refined carbs', 'Family history of diabetes', 'Age over 45 years'],
    symptoms: ['Increased thirst and frequent urination', 'Fatigue and blurred vision', 'Slow-healing wounds', 'Numbness in hands or feet'],
    prevention: ['Maintain healthy body weight', 'Exercise at least 150 minutes per week', 'Eat a balanced diet rich in fiber', 'Get regular blood sugar screenings'],
    stat: '422 million people affected worldwide',
  },
  {
    title: 'Heart Disease',
    icon: Heart,
    color: 'hsl(0, 72%, 51%)',
    description: 'Cardiovascular disease is the leading cause of death globally. It includes conditions like coronary artery disease, heart attacks, and stroke.',
    causes: ['High blood pressure and cholesterol', 'Smoking and tobacco use', 'Physical inactivity', 'Obesity', 'Excessive alcohol consumption'],
    symptoms: ['Chest pain or discomfort', 'Shortness of breath', 'Pain in neck, jaw, or back', 'Irregular heartbeat'],
    prevention: ['Quit smoking', 'Exercise regularly', 'Eat heart-healthy foods (low sodium, healthy fats)', 'Manage stress levels', 'Monitor blood pressure'],
    stat: '#1 cause of death worldwide — 17.9M deaths/year',
  },
  {
    title: 'Obesity',
    icon: Scale,
    color: 'hsl(174, 62%, 38%)',
    description: 'Obesity is a complex disease involving excessive body fat that increases the risk of heart disease, diabetes, high blood pressure, and certain cancers.',
    causes: ['Consuming more calories than burned', 'Sedentary lifestyle', 'Genetic predisposition', 'Poor sleep patterns', 'Stress and emotional eating'],
    symptoms: ['BMI of 30 or higher', 'Breathlessness during light activity', 'Excessive sweating', 'Joint and back pain', 'Low self-esteem'],
    prevention: ['Follow a balanced, calorie-controlled diet', 'Engage in 60+ minutes of daily physical activity', 'Limit processed and sugary foods', 'Get 7-8 hours of sleep', 'Track your BMI regularly'],
    stat: '1 in 8 people globally are now living with obesity',
  },
  {
    title: 'Stress & Mental Health',
    icon: Brain,
    color: 'hsl(270, 60%, 55%)',
    description: 'Chronic stress can lead to serious physical and mental health problems, including anxiety, depression, digestive issues, heart disease, and weakened immunity.',
    causes: ['Work pressure and long hours', 'Financial difficulties', 'Relationship problems', 'Lack of sleep and rest', 'Excessive screen time'],
    symptoms: ['Constant anxiety or worry', 'Headaches and muscle tension', 'Difficulty sleeping', 'Irritability and mood swings', 'Fatigue and lack of motivation'],
    prevention: ['Practice meditation or mindfulness daily', 'Exercise regularly — natural stress reliever', 'Maintain social connections', 'Limit screen time before bed', 'Seek professional help when needed'],
    stat: '1 in 4 people will be affected by mental disorders at some point',
  },
];

const DiseaseInfo = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold">Disease Information</h1>
          <p className="text-muted-foreground mt-2">Learn about common lifestyle diseases, their causes, symptoms, and prevention</p>
        </div>

        <div className="space-y-8">
          {diseases.map((d, idx) => (
            <Card key={idx} className="border-0 shadow-[var(--shadow-lg)] overflow-hidden">
              <div className="h-1" style={{ backgroundColor: d.color }} />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${d.color}15` }}>
                    <d.icon className="w-6 h-6" style={{ color: d.color }} />
                  </div>
                  <div>
                    <CardTitle className="font-display text-xl">{d.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{d.stat}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-destructive/5 border border-destructive/10 p-4">
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-4 h-4 text-destructive" /> Causes
                    </h4>
                    <ul className="space-y-1">
                      {d.causes.map((c, i) => <li key={i} className="text-xs text-muted-foreground">• {c}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-accent/5 border border-accent/10 p-4">
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                      <Activity className="w-4 h-4 text-accent" /> Symptoms
                    </h4>
                    <ul className="space-y-1">
                      {d.symptoms.map((s, i) => <li key={i} className="text-xs text-muted-foreground">• {s}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                      <CheckCircle className="w-4 h-4 text-primary" /> Prevention
                    </h4>
                    <ul className="space-y-1">
                      {d.prevention.map((p, i) => <li key={i} className="text-xs text-muted-foreground">• {p}</li>)}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiseaseInfo;
