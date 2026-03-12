import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/FormContext';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, ArrowRight, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const riskColors = { Low: 'hsl(152, 60%, 40%)', Medium: 'hsl(36, 90%, 55%)', High: 'hsl(0, 72%, 51%)' };

const Results = () => {
  const { user } = useAuth();
  const { predictions, resetForm } = useFormData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const result = predictions[0];

  if (!user || !result) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-display font-bold mb-4">No Results Yet</h2>
          <p className="text-muted-foreground mb-6">Complete the health check form to see your results.</p>
          <Button onClick={() => navigate('/personal-details')}>Take Health Check</Button>
        </div>
      </div>
    );
  }

  const radarData = result.categoryScores.map(c => ({ name: c.name, score: c.score, fullMark: 25 }));
  const barData = result.categoryScores.map(c => ({ name: c.name, score: c.score, level: c.level }));
  const scoreColor = riskColors[result.riskLevel];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Risk Prediction Results</h1>
            <p className="text-muted-foreground mt-1">Based on your lifestyle assessment</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { resetForm(); navigate('/personal-details'); }} className="gap-1.5">
              <RotateCcw className="w-4 h-4" /> Retake
            </Button>
            <Button size="sm" onClick={() => navigate('/dashboard')} className="gap-1.5">
              Dashboard <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Alert */}
        <div className={`rounded-xl p-4 mb-8 flex gap-3 border ${result.riskLevel === 'High' ? 'bg-destructive/5 border-destructive/20' : result.riskLevel === 'Medium' ? 'bg-accent/10 border-accent/30' : 'bg-primary/5 border-primary/20'}`}>
          {result.riskLevel === 'High' ? <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" /> : <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />}
          <div>
            <p className="text-sm font-semibold">{result.riskLevel === 'High' ? 'High Risk Detected — Immediate attention recommended' : result.riskLevel === 'Medium' ? 'Moderate Risk — Some lifestyle improvements needed' : 'Low Risk — Keep up the great work!'}</p>
            <p className="text-xs text-muted-foreground mt-0.5">This is a rule-based simulation. Consult a doctor for medical advice.</p>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-[var(--shadow-lg)] text-center">
            <CardContent className="py-8">
              <p className="text-sm text-muted-foreground mb-3">Health Score</p>
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 mb-3" style={{ borderColor: scoreColor }}>
                <div>
                  <p className="text-4xl font-display font-extrabold" style={{ color: scoreColor }}>{result.healthScore}</p>
                  <p className="text-xs text-muted-foreground">/100</p>
                </div>
              </div>
              <p className="text-lg font-display font-bold" style={{ color: scoreColor }}>{result.riskLevel} Risk</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[var(--shadow-md)]">
            <CardContent className="py-8">
              <p className="text-sm text-muted-foreground mb-3">BMI Analysis</p>
              <p className="text-4xl font-display font-extrabold text-foreground">{result.bmi}</p>
              <p className="text-sm font-medium mt-1" style={{ color: result.bmi < 18.5 || result.bmi >= 25 ? riskColors.Medium : riskColors.Low }}>{result.bmiCategory}</p>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${Math.min((result.bmi / 40) * 100, 100)}%`, backgroundColor: result.bmi < 18.5 || result.bmi >= 30 ? riskColors.High : result.bmi >= 25 ? riskColors.Medium : riskColors.Low }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[var(--shadow-md)]">
            <CardContent className="py-8">
              <p className="text-sm text-muted-foreground mb-3">Predicted Diseases</p>
              <div className="space-y-2">
                {result.predictedDiseases.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    <span className="text-sm font-medium">{d}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-[var(--shadow-md)]">
            <CardHeader><CardTitle className="font-display text-base">Risk Radar Chart</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(195, 20%, 88%)" />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(200, 10%, 45%)' }} />
                  <PolarRadiusAxis domain={[0, 25]} tick={false} axisLine={false} />
                  <Radar dataKey="score" stroke="hsl(174, 62%, 38%)" fill="hsl(174, 62%, 38%)" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[var(--shadow-md)]">
            <CardHeader><CardTitle className="font-display text-base">Category Risk Scores</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(195, 20%, 88%)" />
                  <XAxis type="number" domain={[0, 25]} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={riskColors[entry.level]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {Object.entries(riskColors).map(([label, color]) => (
                  <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} /> {label}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggestions */}
        <Card className="border-0 shadow-[var(--shadow-md)] mb-8">
          <CardHeader><CardTitle className="font-display text-base">Personalized Health Suggestions</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm">{s}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="rounded-lg bg-muted/50 border p-4 flex gap-3">
          <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold">Disclaimer</p>
            <p className="text-xs text-muted-foreground mt-0.5">This is a rule-based simulation tool for educational purposes. It does not replace professional medical diagnosis. Always consult a qualified healthcare provider.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
