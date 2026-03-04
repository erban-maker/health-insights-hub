import { useFormData } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, Info, Dna } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const FamilyMedicalHistoryForm = ({ onNext, onBack }: Props) => {
  const { formData, updateFormData } = useFormData();

  const conditions = [
    { key: 'familyDiabetes' as const, label: 'Diabetes', risk: 'Increases your risk by 2-6x' },
    { key: 'familyHypertension' as const, label: 'Hypertension', risk: 'Increases your risk by 2-3x' },
    { key: 'familyHeartDisease' as const, label: 'Heart Disease', risk: 'Increases your risk by 2x' },
    { key: 'familyObesity' as const, label: 'Obesity', risk: 'Genetic component accounts for 40-70%' },
    { key: 'familyCancer' as const, label: 'Cancer', risk: 'Some cancers have strong hereditary links' },
  ];

  const selectedCount = conditions.filter(c => formData[c.key]).length;

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
        <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 flex gap-3">
          <Dna className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Genetics & Disease Risk</p>
            <p className="text-xs text-muted-foreground mt-1">Family history is one of the strongest predictors of chronic disease. If a first-degree relative (parent/sibling) has a condition, your risk increases significantly. However, lifestyle modifications can offset up to 80% of genetic risk.</p>
          </div>
        </div>

        <div>
          <Label className="text-base font-semibold">Family History of Diseases</Label>
          <p className="text-sm text-muted-foreground mb-4">Select conditions present in your immediate family (parents, siblings)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conditions.map(c => (
              <label key={c.key} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${formData[c.key] ? 'bg-primary/5 border-primary/30' : 'bg-card hover:bg-muted/50'}`}>
                <Checkbox
                  checked={formData[c.key]}
                  onCheckedChange={(checked) => updateFormData({ [c.key]: !!checked })}
                  className="mt-0.5"
                />
                <div>
                  <span className="text-sm font-medium">{c.label}</span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{c.risk}</p>
                </div>
              </label>
            ))}
          </div>
          {selectedCount > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              {selectedCount} hereditary condition{selectedCount > 1 ? 's' : ''} selected — this will be factored into your risk analysis
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="existing">Any Existing Medical Conditions</Label>
          <Input id="existing" placeholder="e.g. Asthma, Thyroid (leave blank if none)" value={formData.existingConditions} onChange={e => updateFormData({ existingConditions: e.target.value })} />
          <p className="text-[11px] text-muted-foreground">Pre-existing conditions will enhance prediction accuracy</p>
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
