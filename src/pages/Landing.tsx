import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Brain, Heart, ArrowRight, BarChart3, CheckCircle, Users, FileText, Zap } from 'lucide-react';

const Landing = () => {
  const features = [
    { icon: Activity, title: 'Lifestyle Analysis', desc: 'Comprehensive assessment of your daily habits, diet, and physical activity patterns' },
    { icon: Brain, title: 'Smart Scoring', desc: 'Rule-based algorithm evaluates multiple health risk factors simultaneously' },
    { icon: Heart, title: 'Disease Prediction', desc: 'Risk levels for diabetes, cardiovascular disease, obesity and more' },
    { icon: BarChart3, title: 'Visual Reports', desc: 'Interactive charts and personalized health recommendations' },
  ];

  const steps = [
    { num: '01', title: 'Register & Login', desc: 'Create your secure account to begin the health assessment process' },
    { num: '02', title: 'Complete 8 Health Forms', desc: 'Personal, physical, lifestyle, diet, risk behavior, stress, and family history' },
    { num: '03', title: 'Review Your Data', desc: 'Verify all entered information for accuracy before processing' },
    { num: '04', title: 'Get Risk Analysis', desc: 'Receive categorized risk levels with charts and recommendations' },
  ];

  const diseases = [
    { name: 'Diabetes', stat: '422M affected globally', icon: '🩸' },
    { name: 'Heart Disease', stat: '#1 cause of death worldwide', icon: '❤️' },
    { name: 'Obesity', stat: '1 in 8 people globally', icon: '⚖️' },
    { name: 'Hypertension', stat: '1.28 billion adults', icon: '🫀' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-hero text-primary-foreground">
        <nav className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7" />
            <span className="text-lg font-display font-bold">HealthPredict</span>
          </div>
          <div className="flex gap-3">
            <Link to="/login"><Button variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">Login</Button></Link>
            <Link to="/register"><Button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 backdrop-blur border border-primary-foreground/20">Get Started</Button></Link>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-20 md:py-32 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6 border border-primary-foreground/10">
            <Shield className="w-4 h-4" />
            Preventive Healthcare Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-tight mb-6">
            Future Disease Risk<br />
            <span className="text-primary-foreground/70">Predictor</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
            Estimate your potential disease risks based on lifestyle habits. Get personalized recommendations to prevent health complications before they arise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-semibold gap-2 px-8 text-base">
                Start Assessment <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 text-base">
                Login
              </Button>
            </Link>
          </div>

          {/* Quick stats bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-3 border border-primary-foreground/10">
              <p className="text-2xl font-display font-bold">12</p>
              <p className="text-xs text-primary-foreground/60">Structured Forms</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-3 border border-primary-foreground/10">
              <p className="text-2xl font-display font-bold">4+</p>
              <p className="text-xs text-primary-foreground/60">Disease Categories</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-3 border border-primary-foreground/10">
              <p className="text-2xl font-display font-bold">3</p>
              <p className="text-xs text-primary-foreground/60">Risk Levels</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-3 border border-primary-foreground/10">
              <p className="text-2xl font-display font-bold">100%</p>
              <p className="text-xs text-primary-foreground/60">Privacy Focused</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-3">Key Features</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Our structured 12-step assessment collects comprehensive health data to generate accurate risk predictions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Diseases we predict */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold mb-3">Diseases We Analyze</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Non-communicable diseases are the leading cause of death worldwide. Early detection through lifestyle analysis can save lives.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {diseases.map(d => (
              <div key={d.name} className="bg-card rounded-xl p-5 border text-center">
                <span className="text-3xl mb-2 block">{d.icon}</span>
                <h3 className="font-display font-semibold">{d.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{d.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">A simple 4-step process to get your comprehensive health risk analysis</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="text-4xl font-display font-extrabold text-primary/15 mb-2">{s.num}</div>
              <h3 className="font-display font-semibold mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold mb-3">Technology Stack</h2>
            <p className="text-muted-foreground">Built with modern, industry-standard technologies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'React.js', desc: 'UI Components', icon: Zap },
              { name: 'TypeScript', desc: 'Type Safety', icon: FileText },
              { name: 'Tailwind CSS', desc: 'Styling', icon: CheckCircle },
              { name: 'Recharts', desc: 'Visualization', icon: BarChart3 },
            ].map(t => (
              <div key={t.name} className="bg-card rounded-xl p-4 border text-center">
                <t.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-display font-bold mb-4">About This Project</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Non-communicable diseases such as diabetes, hypertension, cardiovascular disorders, and obesity have increased significantly due to unhealthy lifestyle behaviors. This web-based application promotes early awareness and preventive healthcare by converting lifestyle-related information into meaningful health insights through digital technology.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Multi-user System</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Secure Data</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Rule-Based Analysis</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Future Disease Risk Predictor Using Lifestyle Analysis</p>
          <p className="mt-1">Built with React.js • TypeScript • Tailwind CSS • Recharts</p>
          <p className="mt-1 text-xs">© 2026 HealthPredict. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
