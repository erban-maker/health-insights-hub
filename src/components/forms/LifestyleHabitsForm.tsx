import { useFormData } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dumbbell, Info, Moon, Zap } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const LifestyleHabitsForm = ({ onNext, onBack }: Props) => {
  const { formData, updateFormData } = useFormData();
  const isValid = formData.exerciseFrequency && formData.activityLevel && formData.sleepDuration;

  const sleepHrs = parseFloat(formData.sleepDuration);
  const sleepFeedback = sleepHrs
    ? sleepHrs < 6 ? { text: 'Insufficient – increases risk of obesity & heart disease', color: 'text-destructive' }
      : sleepHrs <= 8 ? { text: 'Optimal – supports healthy immune function', color: 'text-success' }
      : { text: 'Excessive – may indicate underlying health issues', color: 'text-warning' }
    : null;

  return (
    <Card className="animate-scale-in border-0 shadow-[var(--shadow-lg)]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-display">Lifestyle Habits</CardTitle>
            <CardDescription>Your daily routine and activity levels affect your health</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Did you know?</p>
            <p className="text-xs text-muted-foreground mt-1">Just 150 minutes of moderate exercise per week can reduce the risk of heart disease by 30-40% and diabetes by 58%. Sleep quality is equally important — poor sleep doubles the risk of cardiovascular events.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-muted-foreground" /> Exercise Frequency</Label>
            <Select value={formData.exerciseFrequency} onValueChange={v => updateFormData({ exerciseFrequency: v })}>
              <SelectTrigger><SelectValue placeholder="How often?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="regularly">3-5 times/week</SelectItem>
                <SelectItem value="sometimes">1-2 times/week</SelectItem>
                <SelectItem value="rarely">Rarely</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><Dumbbell className="w-3.5 h-3.5 text-muted-foreground" /> Activity Level</Label>
            <Select value={formData.activityLevel} onValueChange={v => updateFormData({ activityLevel: v })}>
              <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="very_active">Very Active</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="sedentary">Sedentary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sleep" className="flex items-center gap-1.5"><Moon className="w-3.5 h-3.5 text-muted-foreground" /> Sleep Duration (hours/day)</Label>
            <Input id="sleep" type="number" placeholder="e.g. 7" value={formData.sleepDuration} onChange={e => updateFormData({ sleepDuration: e.target.value })} />
            {sleepFeedback && <p className={`text-[11px] font-medium ${sleepFeedback.color}`}>{sleepFeedback.text}</p>}
          </div>
          <div className="space-y-2">
            <Label>Daily Routine</Label>
            <Select value={formData.dailyRoutine} onValueChange={v => updateFormData({ dailyRoutine: v })}>
              <SelectTrigger><SelectValue placeholder="Your typical day" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="desk_job">Mostly Sitting (Desk Job)</SelectItem>
                <SelectItem value="mixed">Mix of Sitting & Moving</SelectItem>
                <SelectItem value="active_job">Physically Active Job</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recommended targets */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-lg font-bold font-display text-primary">150</p>
            <p className="text-[10px] text-muted-foreground">Min exercise/week recommended</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-lg font-bold font-display text-primary">7-9</p>
            <p className="text-[10px] text-muted-foreground">Hrs sleep recommended</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-lg font-bold font-display text-primary">10K</p>
            <p className="text-[10px] text-muted-foreground">Steps/day ideal target</p>
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

export default LifestyleHabitsForm;
