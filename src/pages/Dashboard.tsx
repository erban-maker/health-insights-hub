import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/FormContext';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, ArrowRight, Stethoscope, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

const riskColors = { Low: 'hsl(152, 60%, 40%)', Medium: 'hsl(36, 90%, 55%)', High: 'hsl(0, 72%, 51%)' };

const Dashboard = () => {
  const { user } = useAuth();
  const { predictions, predictionsLoading, predictionsError, reloadPredictions } = useFormData();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState<'7' | '30' | '90'>('30');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const filteredPredictions = useMemo(() => {
    const days = Number(timeFilter);
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    return predictions.filter((p) => new Date(p.timestamp).getTime() >= cutoff);
  }, [predictions, timeFilter]);

  const latest = filteredPredictions[0];
  const previous = filteredPredictions[1];
  const trendData = [...filteredPredictions].reverse().map((p, i) => ({
    name: `Test ${i + 1}`,
    score: p.healthScore,
  }));

  const riskDistribution = useMemo(() => {
    const base = [
      { name: 'Low', value: 0 },
      { name: 'Medium', value: 0 },
      { name: 'High', value: 0 },
    ];

    for (const p of filteredPredictions) {
      const target = base.find((item) => item.name === p.riskLevel);
      if (target) target.value += 1;
    }

    return base;
  }, [filteredPredictions]);

  const totalPredictions = riskDistribution.reduce((sum, item) => sum + item.value, 0);

  const scoreDelta = latest && previous ? latest.healthScore - previous.healthScore : null;
  const bmiDelta = latest && previous ? Number((latest.bmi - previous.bmi).toFixed(1)) : null;

  if (!user) return null;

  if (predictionsLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  if (predictionsError) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-0 shadow-[var(--shadow-lg)]">
          <CardContent className="py-16 text-center">
            <h2 className="text-xl font-display font-bold mb-2">Could not load dashboard data</h2>
            <p className="text-muted-foreground mb-6">{predictionsError}</p>
            <Button onClick={() => reloadPredictions()} className="gap-1.5">
              Retry Loading Data
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Health Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user.name}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={timeFilter} onValueChange={(value) => setTimeFilter(value as '7' | '30' | '90')}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Filter range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => navigate('/personal-details')} className="gap-1.5">
              <Stethoscope className="w-4 h-4" /> New Health Check
            </Button>
          </div>
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
                  <p className="text-2xl font-display font-bold">{filteredPredictions.length}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-[var(--shadow-md)]">
                <CardHeader><CardTitle className="font-display text-base">Risk Distribution</CardTitle></CardHeader>
                <CardContent>
                  {totalPredictions === 0 ? (
                    <p className="text-sm text-muted-foreground">Not enough tests in selected range.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={riskDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={4}>
                          {riskDistribution.map((entry) => (
                            <Cell key={entry.name} fill={riskColors[entry.name as keyof typeof riskColors]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  <div className="flex justify-center gap-4 mt-2">
                    {riskDistribution.map((item) => (
                      <span key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: riskColors[item.name as keyof typeof riskColors] }} /> {item.name}: {item.value}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-[var(--shadow-md)]">
                <CardHeader><CardTitle className="font-display text-base">Health Score Gauge</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadialBarChart innerRadius="55%" outerRadius="95%" data={[{ value: latest.healthScore, fill: riskColors[latest.riskLevel] }]} startAngle={180} endAngle={0}>
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                      <RadialBar dataKey="value" background clockWise cornerRadius={8} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="text-center -mt-6">
                    <p className="text-3xl font-display font-bold" style={{ color: riskColors[latest.riskLevel] }}>{latest.healthScore}</p>
                    <p className="text-xs text-muted-foreground">Current score ({latest.riskLevel})</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-[var(--shadow-md)]">
                <CardHeader><CardTitle className="font-display text-base">Change Since Last Test</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {scoreDelta === null ? (
                    <p className="text-sm text-muted-foreground">Take at least 2 tests to see trend comparison.</p>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        {scoreDelta > 0 ? <TrendingUp className="w-5 h-5 text-primary" /> : scoreDelta < 0 ? <TrendingDown className="w-5 h-5 text-destructive" /> : <Minus className="w-5 h-5 text-muted-foreground" />}
                        <p className="text-sm font-medium">
                          Score {scoreDelta > 0 ? `improved by +${scoreDelta}` : scoreDelta < 0 ? `dropped by ${scoreDelta}` : 'unchanged'} points
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Previous: {previous?.healthScore}/100 ({previous?.riskLevel})
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Latest: {latest.healthScore}/100 ({latest.riskLevel})
                      </p>
                      <p className="text-xs text-muted-foreground">
                        BMI {bmiDelta !== null && bmiDelta > 0 ? `increased by +${bmiDelta}` : bmiDelta !== null && bmiDelta < 0 ? `decreased by ${bmiDelta}` : 'unchanged'} (Prev: {previous?.bmi}, Latest: {latest.bmi})
                      </p>
                    </>
                  )}
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
                  {latest.categoryScores.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Category data unavailable for this result.</p>
                  ) : (
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
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-[var(--shadow-md)]">
              <CardHeader><CardTitle className="font-display text-base">Previous Predictions</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredPredictions.map((p, i) => (
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
    </>
  );
};

export default Dashboard;
