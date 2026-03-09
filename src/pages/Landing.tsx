import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Brain, Heart, ArrowRight, BarChart3, Stethoscope, Apple, Moon, Cigarette } from 'lucide-react';

const Landing = () => {
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

        <div className="container mx-auto px-4 py-20 md:py-28 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6 border border-primary-foreground/10">
            <Brain className="w-4 h-4" />
            AI-Powered Health Analysis
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-tight mb-6">
            AI-Based Lifestyle<br />
            <span className="text-primary-foreground/70">Disease Risk Predictor</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
            Answer just 8 simple questions about your lifestyle and get instant AI-powered predictions for diabetes, heart disease, obesity, and stress risks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-semibold gap-2 px-8 text-base">
                Start Free Assessment <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/disease-info">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 text-base">
                Learn About Diseases
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { val: '8', label: 'Quick Questions' },
              { val: '4+', label: 'Disease Predictions' },
              { val: '100', label: 'Health Score' },
              { val: 'AI', label: 'Smart Analysis' },
            ].map(s => (
              <div key={s.label} className="bg-primary-foreground/10 backdrop-blur rounded-xl p-3 border border-primary-foreground/10">
                <p className="text-2xl font-display font-bold">{s.val}</p>
                <p className="text-xs text-primary-foreground/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why It Matters */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-3">Why Lifestyle Health Prediction Matters</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Non-communicable diseases kill 41 million people each year — 74% of all deaths globally. Most are preventable through early lifestyle changes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Heart, title: 'Heart Disease', desc: 'The #1 killer worldwide. Physical inactivity and poor diet increase risk by 80%.' },
            { icon: Activity, title: 'Diabetes', desc: '422 million people affected. Early detection through lifestyle analysis can prevent onset.' },
            { icon: Stethoscope, title: 'Obesity', desc: '1 in 8 people are obese globally. BMI monitoring is the first step to prevention.' },
            { icon: Brain, title: 'Stress & Mental Health', desc: 'Chronic stress leads to hypertension, insomnia, and weakened immunity.' },
          ].map((f, i) => (
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

      {/* How It Works */}
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground">Simple 3-step process to get your health risk analysis</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { num: '01', title: 'Create Account', desc: 'Quick registration with name, email, and password. Your data stays secure.' },
              { num: '02', title: 'Answer 8 Questions', desc: 'Simple lifestyle questions about your age, BMI, sleep, exercise, and habits.' },
              { num: '03', title: 'Get AI Prediction', desc: 'Instant risk level, health score out of 100, predicted diseases, and personalized tips.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-display font-extrabold text-primary">{s.num}</span>
                </div>
                <h3 className="font-display font-semibold mb-2 text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Analyze */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-3">What We Analyze</h2>
          <p className="text-muted-foreground">8 key lifestyle factors that determine your disease risk</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { icon: '🎂', label: 'Age' },
            { icon: '⚤', label: 'Gender' },
            { icon: '📏', label: 'Height & Weight' },
            { icon: '🏃', label: 'Physical Activity' },
            { icon: '😴', label: 'Sleep Hours' },
            { icon: '🚬', label: 'Smoking Habit' },
            { icon: '🧬', label: 'Family History' },
            { icon: '📊', label: 'BMI Calculation' },
          ].map(item => (
            <div key={item.label} className="bg-card rounded-xl p-4 border text-center hover:shadow-[var(--shadow-sm)] transition-shadow">
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <p className="text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-4">Take Control of Your Health Today</h2>
          <p className="text-primary-foreground/70 mb-8">Prevention is better than cure. Get your free AI health risk assessment in under 2 minutes.</p>
          <Link to="/register">
            <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-semibold gap-2 px-8">
              Start Assessment <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">AI-Based Lifestyle Disease Risk Predictor System</p>
          <p className="mt-1">Built with React.js • Node.js • Express.js • MongoDB • Chart.js</p>
          <p className="mt-1 text-xs">© 2026 HealthPredict. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
