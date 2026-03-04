import { useFormData } from '@/contexts/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Info, MapPin, Briefcase } from 'lucide-react';

interface Props { onNext: () => void; }

const PersonalDetailsForm = ({ onNext }: Props) => {
  const { formData, updateFormData } = useFormData();
  const isValid = formData.age && formData.gender && formData.occupation && formData.location;

  return (
    <Card className="animate-scale-in border-0 shadow-[var(--shadow-lg)]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-display">Personal Details</CardTitle>
            <CardDescription>Tell us about yourself to analyze demographic-based health risks</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Why we collect this */}
        <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Why do we need this?</p>
            <p className="text-xs text-muted-foreground mt-1">Age, gender, and occupation significantly influence disease risk patterns. For example, sedentary desk jobs increase cardiovascular risks by up to 30%, while age is the strongest predictor for most chronic diseases.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="age" className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-muted-foreground" /> Age
            </Label>
            <Input id="age" type="number" placeholder="Enter your age" value={formData.age} onChange={e => updateFormData({ age: e.target.value })} />
            <p className="text-[11px] text-muted-foreground">Risk factors change significantly after age 40</p>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-muted-foreground" /> Gender
            </Label>
            <Select value={formData.gender} onValueChange={v => updateFormData({ gender: v })}>
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[11px] text-muted-foreground">Certain diseases affect genders differently</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation" className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-muted-foreground" /> Occupation
            </Label>
            <Input id="occupation" placeholder="Enter your occupation" value={formData.occupation} onChange={e => updateFormData({ occupation: e.target.value })} />
            <p className="text-[11px] text-muted-foreground">Work type affects physical activity & stress levels</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" /> Location
            </Label>
            <Input id="location" placeholder="Enter your city" value={formData.location} onChange={e => updateFormData({ location: e.target.value })} />
            <p className="text-[11px] text-muted-foreground">Environmental factors vary by region</p>
          </div>
        </div>

        {/* Quick stat */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-lg font-bold font-display text-primary">41M+</p>
            <p className="text-[10px] text-muted-foreground">NCD deaths/year globally</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-lg font-bold font-display text-primary">80%</p>
            <p className="text-[10px] text-muted-foreground">Are preventable</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-lg font-bold font-display text-primary">30-69</p>
            <p className="text-[10px] text-muted-foreground">Peak risk age group</p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onNext} disabled={!isValid} className="px-8">Next Step</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalDetailsForm;
