import { useFormData } from '@/contexts/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, Info, Ruler, Weight } from 'lucide-react';
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
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-warning', desc: 'You may need to gain weight for optimal health.' };
    if (bmi < 25) return { label: 'Normal', color: 'text-success', desc: 'Great! You are in a healthy weight range.' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-warning', desc: 'Consider lifestyle changes to reduce weight.' };
    return { label: 'Obese', color: 'text-danger', desc: 'Higher risk for diabetes, heart disease & hypertension.' };
  };

  const cat = getBmiCategory();

  const bmiRanges = [
    { range: '< 18.5', label: 'Underweight', active: cat?.label === 'Underweight' },
    { range: '18.5 – 24.9', label: 'Normal', active: cat?.label === 'Normal' },
    { range: '25 – 29.9', label: 'Overweight', active: cat?.label === 'Overweight' },
    { range: '≥ 30', label: 'Obese', active: cat?.label === 'Obese' },
  ];

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
        <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Automatic BMI Calculation</p>
            <p className="text-xs text-muted-foreground mt-1">Body Mass Index (BMI) is calculated automatically from your height and weight. BMI is a key indicator used worldwide to classify underweight, normal, overweight, and obesity levels.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="height" className="flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-muted-foreground" /> Height (cm)
            </Label>
            <Input id="height" type="number" placeholder="e.g. 170" value={formData.height} onChange={e => updateFormData({ height: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-1.5">
              <Weight className="w-3.5 h-3.5 text-muted-foreground" /> Weight (kg)
            </Label>
            <Input id="weight" type="number" placeholder="e.g. 70" value={formData.weight} onChange={e => updateFormData({ weight: e.target.value })} />
          </div>
        </div>

        {formData.bmi && (
          <div className="bg-muted rounded-xl p-5 text-center animate-fade-in">
            <p className="text-sm text-muted-foreground">Your Calculated BMI</p>
            <p className="text-4xl font-bold font-display text-foreground mt-1">{formData.bmi}</p>
            {cat && (
              <>
                <p className={`text-sm font-semibold mt-1 ${cat.color}`}>{cat.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
              </>
            )}
          </div>
        )}

        {/* BMI Reference Table */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">BMI Reference Chart</p>
          <div className="grid grid-cols-4 gap-2">
            {bmiRanges.map(r => (
              <div key={r.label} className={`text-center p-2.5 rounded-lg border text-xs transition-colors ${r.active ? 'bg-primary/10 border-primary ring-1 ring-primary' : 'bg-muted/30'}`}>
                <p className="font-bold">{r.range}</p>
                <p className="text-muted-foreground mt-0.5">{r.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={onNext} disabled={!isValid} className="px-8">Next Step</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhysicalHealthForm;
