import { useFormData } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Apple, Info, Droplets, UtensilsCrossed } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const DietaryPatternForm = ({ onNext, onBack }: Props) => {
  const { formData, updateFormData } = useFormData();
  const isValid = formData.mealsPerDay && formData.junkFoodFrequency && formData.fruitVegIntake && formData.waterIntake;

  const waterGlasses = parseInt(formData.waterIntake);
  const waterFeedback = waterGlasses
    ? waterGlasses < 6 ? { text: 'Below recommended – dehydration increases fatigue & kidney stress', color: 'text-destructive' }
      : waterGlasses <= 10 ? { text: 'Good hydration level!', color: 'text-success' }
      : { text: 'Excellent hydration!', color: 'text-success' }
    : null;

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
        <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Nutrition & Disease Risk</p>
            <p className="text-xs text-muted-foreground mt-1">Poor diet is responsible for more deaths globally than any other risk factor. Diets high in processed food and low in fruits/vegetables increase diabetes risk by 50% and heart disease by 40%.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="meals" className="flex items-center gap-1.5"><UtensilsCrossed className="w-3.5 h-3.5 text-muted-foreground" /> Meals Per Day</Label>
            <Input id="meals" type="number" placeholder="e.g. 3" value={formData.mealsPerDay} onChange={e => updateFormData({ mealsPerDay: e.target.value })} />
            <p className="text-[11px] text-muted-foreground">3 balanced meals with 1-2 healthy snacks is ideal</p>
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
            <Label className="flex items-center gap-1.5"><Apple className="w-3.5 h-3.5 text-muted-foreground" /> Fruit & Vegetable Intake</Label>
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
            <Label htmlFor="water" className="flex items-center gap-1.5"><Droplets className="w-3.5 h-3.5 text-muted-foreground" /> Water Intake (glasses/day)</Label>
            <Input id="water" type="number" placeholder="e.g. 8" value={formData.waterIntake} onChange={e => updateFormData({ waterIntake: e.target.value })} />
            {waterFeedback && <p className={`text-[11px] font-medium ${waterFeedback.color}`}>{waterFeedback.text}</p>}
          </div>
        </div>

        {/* Daily targets */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-lg font-bold font-display text-primary">5+</p>
            <p className="text-[10px] text-muted-foreground">Fruit & veg servings/day</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-lg font-bold font-display text-primary">8-10</p>
            <p className="text-[10px] text-muted-foreground">Glasses of water/day</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-lg font-bold font-display text-primary">&lt;10%</p>
            <p className="text-[10px] text-muted-foreground">Added sugar of daily calories</p>
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
