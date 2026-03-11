import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/FormContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ShieldAlert, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RiskFactors = () => {
  const { user } = useAuth();
  const { formData, updateFormData } = useFormData();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleNext = () => {
    if (!formData.smokingHabit || !formData.familyHistory) {
      toast({ title: 'Incomplete', description: 'Please answer both questions', variant: 'destructive' });
      return;
    }
    navigate('/review');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold">Risk Factors</h1>
          <p className="text-muted-foreground mt-2">Step 4 of 5 — Smoking habits and family medical history</p>
        </div>

        <div className="w-full bg-muted rounded-full h-2 mb-8">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: '80%' }} />
        </div>

        <Card className="border-0 shadow-[var(--shadow-lg)]">
          <CardHeader>
            <CardTitle className="font-display text-lg">Behavioral & Genetic Risk</CardTitle>
            <CardDescription>Smoking and family history are strong predictors of chronic disease</CardDescription>
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
                  <p className="text-xs text-destructive font-medium">🚬 Smoking increases risk of heart disease by 2-4x and is the leading cause of preventable death worldwide.</p>
                </div>
              )}
            </div>

            {/* Family History */}
            <div className="space-y-3">
              <Label>Family history of diseases? <span className="text-xs text-muted-foreground">(diabetes, heart disease, etc.)</span></Label>
              <RadioGroup value={formData.familyHistory} onValueChange={v => updateFormData({ familyHistory: v })} className="flex gap-4">
                {['yes', 'no'].map(val => (
                  <Label key={val} htmlFor={`family-${val}`} className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${formData.familyHistory === val ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                    <RadioGroupItem value={val} id={`family-${val}`} />
                    <span className="text-sm font-medium capitalize">{val}</span>
                  </Label>
                ))}
              </RadioGroup>
              {formData.familyHistory === 'yes' && (
                <div className="rounded-lg bg-accent/10 border border-accent/20 p-3">
                  <p className="text-xs font-medium" style={{ color: 'hsl(36, 90%, 40%)' }}>🧬 Having a family history of chronic disease increases your risk. Regular screenings and early prevention are strongly recommended.</p>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 flex gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold">Why these questions matter</p>
                <p className="text-xs text-muted-foreground mt-0.5">Smoking directly damages blood vessels and lungs. Family history reveals genetic predisposition — even if you live healthy, hereditary factors can influence disease risk.</p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/lifestyle-habits')} className="gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <Button onClick={handleNext} className="gap-1.5">
                Next: Review <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskFactors;
