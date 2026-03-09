import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/FormContext';
import { calculateRisk } from '@/lib/riskCalculator';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Stethoscope, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HealthCheck = () => {
  const { user } = useAuth();
  const { formData, updateFormData, addPrediction, resetForm } = useFormData();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const bmi = formData.height && formData.weight
    ? (parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1)
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.age || !formData.gender || !formData.height || !formData.weight || !formData.activityLevel || !formData.sleepDuration || !formData.smokingHabit || !formData.familyHistory) {
      toast({ title: 'Incomplete Form', description: 'Please fill all fields before submitting', variant: 'destructive' });
      return;
    }
    const result = calculateRisk(formData);
    addPrediction(result);
    navigate('/results');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold">Lifestyle Health Check</h1>
          <p className="text-muted-foreground mt-2">Answer 8 simple questions for your AI-powered disease risk prediction</p>
        </div>

        <Card className="border-0 shadow-[var(--shadow-lg)]">
          <CardHeader>
            <CardTitle className="font-display text-lg">Health Assessment Form</CardTitle>
            <CardDescription>All fields are required for accurate prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Age & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input id="age" type="number" min="10" max="100" placeholder="e.g. 30" value={formData.age} onChange={e => updateFormData({ age: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={v => updateFormData({ gender: v })}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Height & Weight */}
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

              {/* BMI Preview */}
              {bmi && (
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 flex items-center gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">Your BMI: {bmi}</p>
                    <p className="text-xs text-muted-foreground">
                      {parseFloat(bmi) < 18.5 ? 'Underweight — consider a nutrient-rich diet' :
                       parseFloat(bmi) < 25 ? 'Normal — great! Keep it up' :
                       parseFloat(bmi) < 30 ? 'Overweight — regular exercise recommended' :
                       'Obese — consult a healthcare professional'}
                    </p>
                  </div>
                </div>
              )}

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
              </div>

              {/* Sleep */}
              <div className="space-y-2">
                <Label htmlFor="sleep">Sleep Hours (per day)</Label>
                <Input id="sleep" type="number" min="1" max="16" step="0.5" placeholder="e.g. 7" value={formData.sleepDuration} onChange={e => updateFormData({ sleepDuration: e.target.value })} />
                {formData.sleepDuration && parseFloat(formData.sleepDuration) < 6 && (
                  <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Less than 6 hours of sleep increases disease risk significantly</p>
                )}
              </div>

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
              </div>

              <Button type="submit" size="lg" className="w-full text-base font-semibold">
                Get AI Prediction
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 rounded-lg bg-muted/50 border p-4 flex gap-3">
          <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">Your data is processed locally and used only for risk prediction. We do not share your health information with third parties.</p>
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;
