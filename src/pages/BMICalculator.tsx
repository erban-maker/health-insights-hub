import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calculator, Info } from 'lucide-react';

const bmiCategories = [
  { range: '< 18.5', label: 'Underweight', color: 'hsl(200, 70%, 50%)', desc: 'You may need to gain weight. Consult a dietitian for a healthy meal plan.' },
  { range: '18.5 – 24.9', label: 'Normal', color: 'hsl(152, 60%, 40%)', desc: 'You are within a healthy weight range. Maintain your diet and exercise routine.' },
  { range: '25 – 29.9', label: 'Overweight', color: 'hsl(36, 90%, 55%)', desc: 'You are above the healthy range. Regular exercise and balanced diet can help.' },
  { range: '≥ 30', label: 'Obese', color: 'hsl(0, 72%, 51%)', desc: 'Health risk is elevated. Consult a healthcare professional for guidance.' },
];

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: typeof bmiCategories[0] } | null>(null);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return;
    const bmi = Math.round((w / (h * h)) * 10) / 10;
    const cat = bmi < 18.5 ? bmiCategories[0] : bmi < 25 ? bmiCategories[1] : bmi < 30 ? bmiCategories[2] : bmiCategories[3];
    setResult({ bmi, category: cat });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold">BMI Calculator</h1>
          <p className="text-muted-foreground mt-2">Calculate your Body Mass Index to understand your weight category</p>
        </div>

        <Card className="border-0 shadow-[var(--shadow-lg)] mb-6">
          <CardHeader>
            <CardTitle className="font-display text-lg">Enter Your Details</CardTitle>
            <CardDescription>BMI = Weight (kg) ÷ Height² (m²)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="bmi-height">Height (cm)</Label>
                <Input id="bmi-height" type="number" min="100" max="250" placeholder="e.g. 170" value={height} onChange={e => setHeight(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bmi-weight">Weight (kg)</Label>
                <Input id="bmi-weight" type="number" min="30" max="300" placeholder="e.g. 70" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
            </div>
            <Button onClick={calculate} className="w-full" disabled={!height || !weight}>Calculate BMI</Button>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card className="border-0 shadow-[var(--shadow-lg)] mb-6 animate-scale-in">
            <CardContent className="py-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 mb-3" style={{ borderColor: result.category.color }}>
                <p className="text-4xl font-display font-extrabold" style={{ color: result.category.color }}>{result.bmi}</p>
              </div>
              <p className="text-xl font-display font-bold" style={{ color: result.category.color }}>{result.category.label}</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">{result.category.desc}</p>
            </CardContent>
          </Card>
        )}

        {/* Reference Table */}
        <Card className="border-0 shadow-[var(--shadow-md)]">
          <CardHeader>
            <CardTitle className="font-display text-lg">BMI Categories Reference</CardTitle>
            <CardDescription>Understanding what your BMI number means</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bmiCategories.map(cat => (
                <div key={cat.label} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{cat.label}</span>
                      <span className="text-xs text-muted-foreground">BMI {cat.range}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 rounded-lg bg-muted/50 border p-4 flex gap-3">
          <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">BMI is a screening tool, not a diagnostic measure. It does not account for muscle mass, bone density, or body composition. Athletes may have a high BMI due to muscle weight.</p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
