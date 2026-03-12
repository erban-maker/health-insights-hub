import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/FormContext';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ShieldAlert, ArrowRight, ArrowLeft, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RiskBehavior = () => {
  const { user } = useAuth();
  const { formData, updateFormData } = useFormData();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleNext = () => {
    if (!formData.smokingHabit || !formData.alcoholConsumption) {
      toast({ title: 'Incomplete', description: 'Please answer all questions', variant: 'destructive' });
      return;
    }
    navigate('/family-history');
  };

  if (!user) return null;

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold">Risk Behavior</h1>
          <p className="text-muted-foreground mt-2">Step 4 of 6 — Behavioral habits that affect disease risk</p>
        </div>

        <div className="w-full bg-muted rounded-full h-2 mb-8">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: '66%' }} />
        </div>

        <Card className="border-0 shadow-[var(--shadow-lg)]">
          <CardHeader>
            <CardTitle className="font-display text-lg">Behavioral Risk Factors</CardTitle>
            <CardDescription>Smoking and alcohol consumption are leading modifiable risk factors for chronic diseases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Smoking */}
            <div className="space-y-3">
              <Label>Do you smoke?</Label>
              <RadioGroup value={formData.smokingHabit} onValueChange={v => updateFormData({ smokingHabit: v })} className="flex gap-4">
                {['yes', 'no'].map(val => (
                  <Label key={val} htmlFor={`smoke-${val}`} className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${formData.smokingHabit === val ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                    <RadioGroupItem value={val} id={`smoke-${val}`} />
                    <span className="text-sm font-medium capitalize">{val}</span>
                  </Label>
                ))}
              </RadioGroup>
              {formData.smokingHabit === 'yes' && (
                <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3">
                  <p className="text-xs text-destructive font-medium flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> Smoking increases risk of heart disease by 2-4x and is the leading cause of preventable death worldwide.
                  </p>
                </div>
              )}
            </div>

            {/* Alcohol */}
            <div className="space-y-3">
              <Label>Do you consume alcohol regularly?</Label>
              <RadioGroup value={formData.alcoholConsumption} onValueChange={v => updateFormData({ alcoholConsumption: v })} className="flex gap-4">
                {['yes', 'no'].map(val => (
                  <Label key={val} htmlFor={`alcohol-${val}`} className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${formData.alcoholConsumption === val ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                    <RadioGroupItem value={val} id={`alcohol-${val}`} />
                    <span className="text-sm font-medium capitalize">{val}</span>
                  </Label>
                ))}
              </RadioGroup>
              {formData.alcoholConsumption === 'yes' && (
                <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3">
                  <p className="text-xs text-destructive font-medium flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> Regular alcohol intake increases risk of liver disease, high blood pressure, and certain cancers.
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 flex gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold">Why these questions matter</p>
                <p className="text-xs text-muted-foreground mt-0.5">Smoking and alcohol are two of the most significant modifiable risk factors. Eliminating these can reduce your risk of chronic diseases by up to 40%.</p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/lifestyle-habits')} className="gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <Button onClick={handleNext} className="gap-1.5">
                Next: Family History <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RiskBehavior;
