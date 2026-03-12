import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/FormContext';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, ArrowRight, Stethoscope, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const riskColors = { Low: 'hsl(152, 60%, 40%)', Medium: 'hsl(36, 90%, 55%)', High: 'hsl(0, 72%, 51%)' };

const Dashboard = () => {
  const { user } = useAuth();
  const { predictions } = useFormData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const latest = predictions[0];
  const trendData = [...predictions].reverse().map((p, i) => ({
    name: `Test ${i + 1}`,
    score: p.healthScore,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Health Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user.name}</p>
          </div>
          <Button onClick={() => navigate('/personal-details')} className="gap-1.5">
            <Stethoscope className="w-4 h-4" /> New Health Check
          </Button>
        </div>

        {!latest ? (
          <Card className="border-0 shadow-[var(--shadow-lg)]">
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold mb-2">No Predictions Yet</h2>
              <p className="text-muted-foreground mb-6">Take your first health check to see your dashboard come alive.</p>
              <Button onClick={() => navigate('/personal-details')} className="gap-1.5">
                Start Health Check <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="border-0 shadow-[var(--shadow-md)]">
                <CardContent className="py-5">
                  <p className="text-xs text-muted-foreground mb-1">Health Score</p>
                  <p className="text-3xl font-display font-extrabold" style={{ color: riskColors[latest.riskLevel] }}>{latest.healthScore}</p>
                  <p className="text-xs text-muted-foreground">/100</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-[var(--shadow-md)]">
                <CardContent className="py-5">
                  <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                  <p className="text-2xl font-display font-bold" style={{ color: riskColors[latest.riskLevel] }}>{latest.riskLevel}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-[var(--shadow-md)]">
                <CardContent className="py-5">
                  <p className="text-xs text-muted-foreground mb-1">BMI</p>
                  <p className="text-2xl font-display font-bold">{latest.bmi}</p>
                  <p className="text-xs text-muted-foreground">{latest.bmiCategory}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-[var(--shadow-md)]">
                <CardContent className="py-5">
                  <p className="text-xs text-muted-foreground mb-1">Tests Taken</p>
                  <p className="text-2xl font-display font-bold">{predictions.length}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {trendData.length > 1 && (
                <Card className="border-0 shadow-[var(--shadow-md)]">
                  <CardHeader><CardTitle className="font-display text-base">Health Score Trend</CardTitle></CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(195, 20%, 88%)" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="hsl(174, 62%, 38%)" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              <Card className="border-0 shadow-[var(--shadow-md)]">
                <CardHeader><CardTitle className="font-display text-base">Risk by Category</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={latest.categoryScores}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(195, 20%, 88%)" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis domain={[0, 25]} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                        {latest.categoryScores.map((c, i) => (
                          <Cell key={i} fill={riskColors[c.level]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-[var(--shadow-md)]">
              <CardHeader><CardTitle className="font-display text-base">Previous Predictions</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {predictions.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: riskColors[p.riskLevel] }} />
                        <div>
                          <p className="text-sm font-medium">Score: {p.healthScore}/100 — {p.riskLevel} Risk</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(p.timestamp).toLocaleDateString()} at {new Date(p.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: `${riskColors[p.riskLevel]}15`, color: riskColors[p.riskLevel] }}>
                        BMI: {p.bmi}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
