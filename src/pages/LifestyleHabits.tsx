import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/FormContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Activity, ArrowRight, ArrowLeft, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LifestyleHabits = () => {
  const { user } = useAuth();
  const { formData, updateFormData } = useFormData();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleNext = () => {
    if (!formData.activityLevel || !formData.sleepDuration) {
      toast({ title: 'Incomplete', description: 'Please fill in activity level and sleep hours', variant: 'destructive' });
      return;
    }
    navigate('/risk-factors');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Activity className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold">Lifestyle Habits</h1>
          <p className="text-muted-foreground mt-2">Step 3 of 6 — Exercise and sleep patterns</p>
        </div>

        <div className="w-full bg-muted rounded-full h-2 mb-8">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: '50%' }} />
        </div>

        <Card className="border-0 shadow-[var(--shadow-lg)]">
          <CardHeader>
            <CardTitle className="font-display text-lg">Activity & Sleep</CardTitle>
            <CardDescription>Physical activity and sleep are two of the most impactful lifestyle factors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Activity Level */}
            <div className="space-y-3">
              <Label>Physical Activity Level</Label>
              <RadioGroup value={formData.activityLevel} onValueChange={v => updateFormData({ activityLevel: v })} className="grid grid-cols-3 gap-3">
                {[
                  { value: 'low', label: 'Low', desc: 'Little or no exercise' },
                  { value: 'moderate', label: 'Moderate', desc: '3-5 days/week' },
                  { value: 'high', label: 'High', desc: 'Daily exercise' },
                ].map(opt => (
                  <Label key={opt.value} htmlFor={`act-${opt.value}`} className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.activityLevel === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                    <RadioGroupItem value={opt.value} id={`act-${opt.value}`} className="sr-only" />
                    <span className="text-sm font-semibold">{opt.label}</span>
                    <span className="text-[11px] text-muted-foreground text-center mt-1">{opt.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
              {formData.activityLevel === 'low' && (
                <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> A sedentary lifestyle increases risk of heart disease, diabetes, and obesity by up to 80%</p>
              )}
            </div>

            {/* Sleep */}
            <div className="space-y-2">
              <Label htmlFor="sleep">Sleep Hours (per day)</Label>
              <Input id="sleep" type="number" min="1" max="16" step="0.5" placeholder="e.g. 7" value={formData.sleepDuration} onChange={e => updateFormData({ sleepDuration: e.target.value })} />
              {formData.sleepDuration && parseFloat(formData.sleepDuration) < 6 && (
                <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Less than 6 hours of sleep increases disease risk significantly</p>
              )}
              {formData.sleepDuration && parseFloat(formData.sleepDuration) > 9 && (
                <p className="text-xs text-accent flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Oversleeping can also indicate underlying health issues</p>
              )}
            </div>

            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 flex gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold">Did you know?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Adults who get less than 7 hours of sleep are more likely to develop obesity, diabetes, high blood pressure, and heart disease. Regular exercise improves both sleep quality and overall health.</p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/physical-health')} className="gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <Button onClick={handleNext} className="gap-1.5">
                Next: Risk Factors <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LifestyleHabits;
