import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/FormContext';
import { calculateRisk } from '@/lib/riskCalculator';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ClipboardCheck, ArrowLeft, Edit, Send } from 'lucide-react';

const ReviewSubmit = () => {
  const { user } = useAuth();
  const { formData, addPrediction } = useFormData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const bmi = formData.height && formData.weight
    ? (parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1)
    : '—';

  const isComplete = formData.age && formData.gender && formData.height && formData.weight && formData.activityLevel && formData.sleepDuration && formData.smokingHabit && formData.alcoholConsumption && formData.familyHistory && formData.existingConditions;

  const handleSubmit = () => {
    const result = calculateRisk(formData);
    addPrediction(result);
    navigate('/results');
  };

  const sections = [
    {
      title: 'Personal Details',
      editPath: '/personal-details',
      fields: [
        { label: 'Age', value: formData.age ? `${formData.age} years` : '—' },
        { label: 'Gender', value: formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : '—' },
      ],
    },
    {
      title: 'Physical Health',
      editPath: '/physical-health',
      fields: [
        { label: 'Height', value: formData.height ? `${formData.height} cm` : '—' },
        { label: 'Weight', value: formData.weight ? `${formData.weight} kg` : '—' },
        { label: 'BMI', value: bmi },
      ],
    },
    {
      title: 'Lifestyle Habits',
      editPath: '/lifestyle-habits',
      fields: [
        { label: 'Activity Level', value: formData.activityLevel ? formData.activityLevel.charAt(0).toUpperCase() + formData.activityLevel.slice(1) : '—' },
        { label: 'Sleep Hours', value: formData.sleepDuration ? `${formData.sleepDuration} hrs/day` : '—' },
      ],
    },
    {
      title: 'Risk Factors',
      editPath: '/risk-factors',
      fields: [
        { label: 'Smoking', value: formData.smokingHabit ? formData.smokingHabit.charAt(0).toUpperCase() + formData.smokingHabit.slice(1) : '—' },
        { label: 'Family History', value: formData.familyHistory ? formData.familyHistory.charAt(0).toUpperCase() + formData.familyHistory.slice(1) : '—' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ClipboardCheck className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold">Review & Submit</h1>
          <p className="text-muted-foreground mt-2">Step 5 of 5 — Verify your data before generating the prediction</p>
        </div>

        <div className="w-full bg-muted rounded-full h-2 mb-8">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: '100%' }} />
        </div>

        <div className="space-y-4 mb-8">
          {sections.map((section) => (
            <Card key={section.title} className="border-0 shadow-[var(--shadow-md)]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-base">{section.title}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate(section.editPath)} className="gap-1 text-xs text-muted-foreground hover:text-primary">
                    <Edit className="w-3 h-3" /> Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {section.fields.map(f => (
                    <div key={f.label} className="rounded-lg bg-muted/50 p-3">
                      <p className="text-[11px] text-muted-foreground">{f.label}</p>
                      <p className="text-sm font-semibold mt-0.5">{f.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/risk-factors')} className="gap-1.5">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Button onClick={handleSubmit} disabled={!isComplete} size="lg" className="gap-1.5 font-semibold">
            <Send className="w-4 h-4" /> Get Prediction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
