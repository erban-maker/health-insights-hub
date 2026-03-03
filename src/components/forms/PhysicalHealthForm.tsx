import { useFormData } from '@/contexts/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { useEffect } from 'react';

interface Props { onNext: () => void; onBack: () => void; }

const PhysicalHealthForm = ({ onNext, onBack }: Props) => {
  const { formData, updateFormData } = useFormData();

  useEffect(() => {
    const h = parseFloat(formData.height);
    const w = parseFloat(formData.weight);
    if (h > 0 && w > 0) {
      const heightM = h / 100;
      const bmi = (w / (heightM * heightM)).toFixed(1);
      updateFormData({ bmi });
    }
  }, [formData.height, formData.weight]);

  const isValid = formData.height && formData.weight;

  const getBmiCategory = () => {
    const bmi = parseFloat(formData.bmi);
    if (!bmi) return null;
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-warning' };
    if (bmi < 25) return { label: 'Normal', color: 'text-success' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-warning' };
    return { label: 'Obese', color: 'text-danger' };
  };

  const cat = getBmiCategory();

  return (
    <Card className="animate-scale-in border-0 shadow-[var(--shadow-lg)]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-display">Physical Health</CardTitle>
            <CardDescription>Your body measurements help identify obesity-related risks</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" type="number" placeholder="e.g. 170" value={formData.height} onChange={e => updateFormData({ height: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" placeholder="e.g. 70" value={formData.weight} onChange={e => updateFormData({ weight: e.target.value })} />
          </div>
        </div>
        {formData.bmi && (
          <div className="bg-muted rounded-xl p-4 text-center animate-fade-in">
            <p className="text-sm text-muted-foreground">Your BMI</p>
            <p className="text-3xl font-bold font-display text-foreground">{formData.bmi}</p>
            {cat && <p className={`text-sm font-semibold ${cat.color}`}>{cat.label}</p>}
          </div>
        )}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={onNext} disabled={!isValid} className="px-8">Next Step</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhysicalHealthForm;
