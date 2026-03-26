import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/useFormData';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, ArrowRight, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PersonalDetails = () => {
  const { user } = useAuth();
  const { formData, updateFormData } = useFormData();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleNext = () => {
    if (!formData.age || !formData.gender) {
      toast({ title: 'Incomplete', description: 'Please fill in both age and gender', variant: 'destructive' });
      return;
    }
    navigate('/physical-health');
  };

  if (!user) return null;

  const age = parseInt(formData.age);

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <User className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold">Personal Details</h1>
          <p className="text-muted-foreground mt-2">Step 1 of 6 — Basic information for demographic-based risk analysis</p>
        </div>

        {/* Progress */}
        <div className="w-full bg-muted rounded-full h-2 mb-8">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: '16%' }} />
        </div>

        <Card className="border-0 shadow-[var(--shadow-lg)]">
          <CardHeader>
            <CardTitle className="font-display text-lg">Tell Us About Yourself</CardTitle>
            <CardDescription>Age and gender help us analyze demographic-specific health risks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input id="age" type="number" min="10" max="100" placeholder="e.g. 30" value={formData.age} onChange={e => updateFormData({ age: e.target.value })} />
              {age > 0 && (
                <p className="text-xs text-muted-foreground">
                  {age < 25 ? '🟢 Young adults generally have lower disease risk' :
                   age < 40 ? '🟡 Risk factors begin increasing — regular checkups recommended' :
                   age < 60 ? '🟠 Age is a significant risk factor — prevention is key' :
                   '🔴 Higher age increases risk for most lifestyle diseases'}
                </p>
              )}
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

            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 flex gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold">Why we ask this</p>
                <p className="text-xs text-muted-foreground mt-0.5">Age and gender are key demographic factors that influence the likelihood of lifestyle diseases. For example, men over 45 and women over 55 have higher cardiovascular risk.</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNext} className="gap-1.5">
                Next: Physical Health <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PersonalDetails;
