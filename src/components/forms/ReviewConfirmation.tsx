import { useFormData } from '@/contexts/FormContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ClipboardCheck, Edit } from 'lucide-react';

interface Props { onSubmit: () => void; onBack: () => void; onEdit: (step: number) => void; }

const ReviewConfirmation = ({ onSubmit, onBack, onEdit }: Props) => {
  const { formData } = useFormData();

  const sections = [
    {
      title: 'Personal Details', step: 0, fields: [
        { label: 'Age', value: formData.age },
        { label: 'Gender', value: formData.gender },
        { label: 'Occupation', value: formData.occupation },
        { label: 'Location', value: formData.location },
      ]
    },
    {
      title: 'Physical Health', step: 1, fields: [
        { label: 'Height', value: `${formData.height} cm` },
        { label: 'Weight', value: `${formData.weight} kg` },
        { label: 'BMI', value: formData.bmi },
      ]
    },
    {
      title: 'Lifestyle Habits', step: 2, fields: [
        { label: 'Exercise', value: formData.exerciseFrequency },
        { label: 'Activity Level', value: formData.activityLevel },
        { label: 'Sleep', value: `${formData.sleepDuration} hrs` },
      ]
    },
    {
      title: 'Dietary Pattern', step: 3, fields: [
        { label: 'Meals/Day', value: formData.mealsPerDay },
        { label: 'Junk Food', value: formData.junkFoodFrequency },
        { label: 'Fruits & Vegs', value: formData.fruitVegIntake },
        { label: 'Water', value: `${formData.waterIntake} glasses` },
      ]
    },
    {
      title: 'Risk Behaviors', step: 4, fields: [
        { label: 'Smoking', value: formData.smokingStatus },
        { label: 'Alcohol', value: formData.alcoholConsumption },
      ]
    },
    {
      title: 'Stress & Mental Health', step: 5, fields: [
        { label: 'Stress Level', value: formData.stressLevel },
        { label: 'Screen Time', value: `${formData.screenTime} hrs` },
      ]
    },
    {
      title: 'Family History', step: 6, fields: [
        { label: 'Diabetes', value: formData.familyDiabetes ? 'Yes' : 'No' },
        { label: 'Hypertension', value: formData.familyHypertension ? 'Yes' : 'No' },
        { label: 'Heart Disease', value: formData.familyHeartDisease ? 'Yes' : 'No' },
        { label: 'Obesity', value: formData.familyObesity ? 'Yes' : 'No' },
        { label: 'Cancer', value: formData.familyCancer ? 'Yes' : 'No' },
      ]
    },
  ];

  return (
    <Card className="animate-scale-in border-0 shadow-[var(--shadow-lg)]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-display">Review & Confirmation</CardTitle>
            <CardDescription>Verify your information before generating risk analysis</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.map(section => (
          <div key={section.title} className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold font-display text-sm">{section.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => onEdit(section.step)} className="h-7 text-xs gap-1">
                <Edit className="w-3 h-3" /> Edit
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {section.fields.map(f => (
                <div key={f.label}>
                  <p className="text-xs text-muted-foreground">{f.label}</p>
                  <p className="text-sm font-medium capitalize">{f.value?.replace(/_/g, ' ') || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={onSubmit} className="px-8 bg-primary shadow-glow">Generate Risk Analysis</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewConfirmation;
