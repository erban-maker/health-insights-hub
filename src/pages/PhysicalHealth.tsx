import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/FormContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Ruler, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PhysicalHealth = () => {
  const { user } = useAuth();
  const { formData, updateFormData } = useFormData();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const bmi = formData.height && formData.weight
    ? (parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1)
    : null;

  const handleNext = () => {
    if (!formData.height || !formData.weight) {
      toast({ title: 'Incomplete', description: 'Please fill in both height and weight', variant: 'destructive' });
      return;
    }
    navigate('/lifestyle-habits');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Ruler className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold">Physical Health</h1>
          <p className="text-muted-foreground mt-2">Step 2 of 6 — Height & weight for BMI calculation</p>
        </div>

        <div className="w-full bg-muted rounded-full h-2 mb-8">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: '33%' }} />
        </div>

        <Card className="border-0 shadow-[var(--shadow-lg)]">
          <CardHeader>
            <CardTitle className="font-display text-lg">Body Measurements</CardTitle>
            <CardDescription>We calculate your BMI automatically from these values</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" min="100" max="250" placeholder="e.g. 170" value={formData.height} onChange={e => updateFormData({ height: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" min="30" max="300" placeholder="e.g. 70" value={formData.weight} onChange={e => updateFormData({ weight: e.target.value })} />
              </div>
            </div>

            {bmi && (
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-5">
                <p className="text-sm font-semibold mb-1">Your BMI: {bmi}</p>
                <p className="text-xs text-muted-foreground">
                  {parseFloat(bmi) < 18.5 ? '⚠️ Underweight — consider a nutrient-rich diet' :
                   parseFloat(bmi) < 25 ? '✅ Normal — great! Keep it up' :
                   parseFloat(bmi) < 30 ? '⚠️ Overweight — regular exercise recommended' :
                   '🔴 Obese — consult a healthcare professional'}
                </p>
                <div className="mt-3 grid grid-cols-4 gap-1 text-[10px] text-center">
                  {[
                    { label: 'Underweight', range: '< 18.5', color: 'hsl(200, 70%, 50%)' },
                    { label: 'Normal', range: '18.5–24.9', color: 'hsl(152, 60%, 40%)' },
                    { label: 'Overweight', range: '25–29.9', color: 'hsl(36, 90%, 55%)' },
                    { label: 'Obese', range: '≥ 30', color: 'hsl(0, 72%, 51%)' },
                  ].map(c => (
                    <div key={c.label}>
                      <div className="h-2 rounded-full mb-1" style={{ backgroundColor: c.color }} />
                      <p className="font-medium">{c.label}</p>
                      <p className="text-muted-foreground">{c.range}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 flex gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">BMI (Body Mass Index) is a screening tool that helps identify weight-related health risks. A BMI over 25 increases the chance of heart disease, diabetes, and hypertension.</p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/personal-details')} className="gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <Button onClick={handleNext} className="gap-1.5">
                Next: Lifestyle <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PhysicalHealth;
