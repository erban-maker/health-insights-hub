import { useFormData } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Apple } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const DietaryPatternForm = ({ onNext, onBack }: Props) => {
  const { formData, updateFormData } = useFormData();
  const isValid = formData.mealsPerDay && formData.junkFoodFrequency && formData.fruitVegIntake && formData.waterIntake;

  return (
    <Card className="animate-scale-in border-0 shadow-[var(--shadow-lg)]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Apple className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-display">Dietary Pattern</CardTitle>
            <CardDescription>Your eating habits play a major role in disease prevention</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="meals">Meals Per Day</Label>
            <Input id="meals" type="number" placeholder="e.g. 3" value={formData.mealsPerDay} onChange={e => updateFormData({ mealsPerDay: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Junk Food Consumption</Label>
            <Select value={formData.junkFoodFrequency} onValueChange={v => updateFormData({ junkFoodFrequency: v })}>
              <SelectTrigger><SelectValue placeholder="How often?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="rarely">Rarely</SelectItem>
                <SelectItem value="sometimes">Sometimes</SelectItem>
                <SelectItem value="frequently">Frequently</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Fruit & Vegetable Intake</Label>
            <Select value={formData.fruitVegIntake} onValueChange={v => updateFormData({ fruitVegIntake: v })}>
              <SelectTrigger><SelectValue placeholder="How often?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="often">Often</SelectItem>
                <SelectItem value="sometimes">Sometimes</SelectItem>
                <SelectItem value="rarely">Rarely</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="water">Water Intake (glasses/day)</Label>
            <Input id="water" type="number" placeholder="e.g. 8" value={formData.waterIntake} onChange={e => updateFormData({ waterIntake: e.target.value })} />
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

export default DietaryPatternForm;
