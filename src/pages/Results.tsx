import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/FormContext';
import { calculateRisk, RiskResult } from '@/lib/riskCalculator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogOut, RotateCcw, ArrowLeft } from 'lucide-react';
import { useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const riskColors = { Low: 'hsl(152, 60%, 40%)', Moderate: 'hsl(36, 90%, 55%)', High: 'hsl(0, 72%, 51%)' };

const Results = () => {
  const { user, logout } = useAuth();
  const { formData, resetForm } = useFormData();
  const navigate = useNavigate();

  const result: RiskResult = useMemo(() => calculateRisk(formData), [formData]);

  const radarData = result.categories.map(c => ({ name: c.name, score: c.score, fullMark: 10 }));
  const barData = result.categories.map(c => ({ name: c.name, score: c.score, level: c.level }));

  const handleRetake = () => {
    resetForm();
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-display font-bold">HealthPredict</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold">Risk Analysis Results</h1>
            <p className="text-sm text-muted-foreground">Based on your lifestyle assessment</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')} className="gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button variant="outline" size="sm" onClick={handleRetake} className="gap-1.5">
              <RotateCcw className="w-4 h-4" /> Retake
            </Button>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="border-0 shadow-[var(--shadow-lg)] mb-6">
          <CardContent className="py-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">Overall Disease Risk</p>
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 mb-3" style={{ borderColor: riskColors[result.overallRisk] }}>
              <div>
                <p className="text-3xl font-display font-extrabold" style={{ color: riskColors[result.overallRisk] }}>{result.overallScore}</p>
                <p className="text-xs text-muted-foreground">/10</p>
              </div>
            </div>
            <p className="text-xl font-display font-bold" style={{ color: riskColors[result.overallRisk] }}>{result.overallRisk} Risk</p>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-0 shadow-[var(--shadow-md)]">
            <CardHeader><CardTitle className="font-display text-base">Risk Radar</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(195, 20%, 88%)" />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(200, 10%, 45%)' }} />
                  <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar dataKey="score" stroke="hsl(174, 62%, 38%)" fill="hsl(174, 62%, 38%)" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[var(--shadow-md)]">
            <CardHeader><CardTitle className="font-display text-base">Category Scores</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(195, 20%, 88%)" />
                  <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={riskColors[entry.level]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="border-0 shadow-[var(--shadow-md)]">
          <CardHeader><CardTitle className="font-display text-base">Personalized Recommendations</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.categories.map(cat => (
                <div key={cat.name} className="rounded-xl border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: riskColors[cat.level] }} />
                    <h4 className="font-semibold text-sm font-display">{cat.name}</h4>
                    <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${riskColors[cat.level]}20`, color: riskColors[cat.level] }}>
                      {cat.level}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {cat.recommendations.map((rec, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span> {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
