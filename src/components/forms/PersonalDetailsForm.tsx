import { useFormData } from '@/contexts/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User } from 'lucide-react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" placeholder="Enter your age" value={formData.age} onChange={e => updateFormData({ age: e.target.value })} />
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
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input id="occupation" placeholder="Enter your occupation" value={formData.occupation} onChange={e => updateFormData({ occupation: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter your city" value={formData.location} onChange={e => updateFormData({ location: e.target.value })} />
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
