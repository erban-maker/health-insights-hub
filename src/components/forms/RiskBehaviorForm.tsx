import { useFormData } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, Info, Cigarette, Wine } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const RiskBehaviorForm = ({ onNext, onBack }: Props) => {
  const { formData, updateFormData } = useFormData();
  const isValid = formData.smokingStatus && formData.alcoholConsumption;

  const smokingWarning = formData.smokingStatus === 'regular'
    ? 'Regular smoking increases lung cancer risk by 15-30x and heart disease by 2-4x.'
    : formData.smokingStatus === 'occasional'
    ? 'Even occasional smoking damages blood vessels and increases cancer risk.'
    : null;

  const alcoholWarning = formData.alcoholConsumption === 'heavy'
    ? 'Heavy drinking causes liver disease, increases cancer risk, and weakens immunity.'
    : formData.alcoholConsumption === 'moderate'
    ? 'Moderate consumption still carries risks for liver and cardiovascular health.'
    : null;

  return (
    <Card className="animate-scale-in border-0 shadow-[var(--shadow-lg)]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <CardTitle className="font-display">Risk Behaviors</CardTitle>
            <CardDescription>Smoking and alcohol consumption are major risk factors</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg bg-destructive/5 border border-destructive/10 p-4 flex gap-3">
          <Info className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">High-Impact Risk Factors</p>
            <p className="text-xs text-muted-foreground mt-1">Tobacco and alcohol are among the top 5 risk factors for premature death worldwide. Together they contribute to cardiovascular disease, respiratory disorders, liver disease, and multiple types of cancer.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><Cigarette className="w-3.5 h-3.5 text-muted-foreground" /> Smoking Status</Label>
            <Select value={formData.smokingStatus} onValueChange={v => updateFormData({ smokingStatus: v })}>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never Smoked</SelectItem>
                <SelectItem value="former">Former Smoker</SelectItem>
                <SelectItem value="occasional">Occasional Smoker</SelectItem>
                <SelectItem value="regular">Regular Smoker</SelectItem>
              </SelectContent>
            </Select>
            {smokingWarning && <p className="text-[11px] font-medium text-destructive">{smokingWarning}</p>}
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><Wine className="w-3.5 h-3.5 text-muted-foreground" /> Alcohol Consumption</Label>
            <Select value={formData.alcoholConsumption} onValueChange={v => updateFormData({ alcoholConsumption: v })}>
              <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="occasional">Occasional</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="heavy">Heavy</SelectItem>
              </SelectContent>
            </Select>
            {alcoholWarning && <p className="text-[11px] font-medium text-destructive">{alcoholWarning}</p>}
          </div>
        </div>

        {/* Impact stats */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          <div className="text-center p-3 rounded-lg bg-destructive/5">
            <p className="text-lg font-bold font-display text-destructive">8M+</p>
            <p className="text-[10px] text-muted-foreground">Tobacco deaths/year</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-destructive/5">
            <p className="text-lg font-bold font-display text-destructive">3M+</p>
            <p className="text-[10px] text-muted-foreground">Alcohol deaths/year</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-destructive/5">
            <p className="text-lg font-bold font-display text-destructive">15x</p>
            <p className="text-[10px] text-muted-foreground">Lung cancer risk (smokers)</p>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={onNext} disabled={!isValid} className="px-8">Next Step</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskBehaviorForm;
