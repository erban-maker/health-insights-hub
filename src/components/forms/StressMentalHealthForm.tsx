import { useFormData } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, Info, Monitor, HeartPulse } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const StressMentalHealthForm = ({ onNext, onBack }: Props) => {
  const { formData, updateFormData } = useFormData();
  const isValid = formData.stressLevel && formData.screenTime;

  const screenHrs = parseFloat(formData.screenTime);
  const screenFeedback = screenHrs
    ? screenHrs <= 2 ? { text: 'Low screen time – great for eye & mental health', color: 'text-success' }
      : screenHrs <= 6 ? { text: 'Moderate – take regular breaks every 20 minutes', color: 'text-warning' }
      : { text: 'Excessive – high risk for eye strain, insomnia & anxiety', color: 'text-destructive' }
    : null;

  return (
    <Card className="animate-scale-in border-0 shadow-[var(--shadow-lg)]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-display">Stress & Mental Health</CardTitle>
            <CardDescription>Mental well-being significantly impacts physical health outcomes</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Mind-Body Connection</p>
            <p className="text-xs text-muted-foreground mt-1">Chronic stress raises cortisol levels, which increases blood pressure, blood sugar, and inflammation. People with high stress are 2x more likely to develop heart disease. Excessive screen time disrupts sleep patterns and contributes to anxiety.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><HeartPulse className="w-3.5 h-3.5 text-muted-foreground" /> Stress Level</Label>
            <Select value={formData.stressLevel} onValueChange={v => updateFormData({ stressLevel: v })}>
              <SelectTrigger><SelectValue placeholder="How stressed?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="very_high">Very High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="screen" className="flex items-center gap-1.5"><Monitor className="w-3.5 h-3.5 text-muted-foreground" /> Daily Screen Time (hours)</Label>
            <Input id="screen" type="number" placeholder="e.g. 6" value={formData.screenTime} onChange={e => updateFormData({ screenTime: e.target.value })} />
            {screenFeedback && <p className={`text-[11px] font-medium ${screenFeedback.color}`}>{screenFeedback.text}</p>}
          </div>
        </div>

        {/* Stress management tips */}
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-foreground mb-2">💡 Quick Stress Management Tips</p>
          <ul className="space-y-1.5">
            <li className="text-xs text-muted-foreground flex items-start gap-2"><span className="text-primary">•</span>Practice deep breathing for 5 minutes daily</li>
            <li className="text-xs text-muted-foreground flex items-start gap-2"><span className="text-primary">•</span>Follow the 20-20-20 rule for screen breaks</li>
            <li className="text-xs text-muted-foreground flex items-start gap-2"><span className="text-primary">•</span>Regular meditation reduces cortisol by 25%</li>
            <li className="text-xs text-muted-foreground flex items-start gap-2"><span className="text-primary">•</span>Physical activity is the most effective stress reliever</li>
          </ul>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={onNext} disabled={!isValid} className="px-8">Next Step</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StressMentalHealthForm;
