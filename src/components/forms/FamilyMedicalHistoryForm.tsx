import { useFormData } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const FamilyMedicalHistoryForm = ({ onNext, onBack }: Props) => {
  const { formData, updateFormData } = useFormData();

  const conditions = [
    { key: 'familyDiabetes' as const, label: 'Diabetes' },
    { key: 'familyHypertension' as const, label: 'Hypertension' },
    { key: 'familyHeartDisease' as const, label: 'Heart Disease' },
    { key: 'familyObesity' as const, label: 'Obesity' },
    { key: 'familyCancer' as const, label: 'Cancer' },
  ];

  return (
    <Card className="animate-scale-in border-0 shadow-[var(--shadow-lg)]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-display">Family & Medical History</CardTitle>
            <CardDescription>Hereditary conditions help predict genetic risk factors</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <Label className="text-base font-semibold">Family History of Diseases</Label>
          <p className="text-sm text-muted-foreground mb-4">Select conditions that run in your family</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conditions.map(c => (
              <label key={c.key} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 cursor-pointer transition-colors">
                <Checkbox
                  checked={formData[c.key]}
                  onCheckedChange={(checked) => updateFormData({ [c.key]: !!checked })}
                />
                <span className="text-sm font-medium">{c.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="existing">Any Existing Medical Conditions</Label>
          <Input id="existing" placeholder="e.g. Asthma, Thyroid (leave blank if none)" value={formData.existingConditions} onChange={e => updateFormData({ existingConditions: e.target.value })} />
        </div>
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={onNext} className="px-8">Review Answers</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyMedicalHistoryForm;
