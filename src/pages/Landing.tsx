import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Brain, Heart, ArrowRight, BarChart3 } from 'lucide-react';

const Landing = () => {
  const features = [
    { icon: Activity, title: 'Lifestyle Analysis', desc: 'Comprehensive assessment of your daily habits, diet, and physical activity' },
    { icon: Brain, title: 'Smart Scoring', desc: 'Rule-based algorithm evaluates multiple health risk factors simultaneously' },
    { icon: Heart, title: 'Disease Prediction', desc: 'Risk levels for diabetes, cardiovascular disease, obesity and more' },
    { icon: BarChart3, title: 'Visual Reports', desc: 'Interactive charts and personalized health recommendations' },
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
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-3">How It Works</h2>
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

      {/* About */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-display font-bold mb-4">About This Project</h2>
          <p className="text-muted-foreground leading-relaxed">
            Non-communicable diseases such as diabetes, hypertension, cardiovascular disorders, and obesity have increased significantly due to unhealthy lifestyle behaviors. This web-based application promotes early awareness and preventive healthcare by converting lifestyle-related information into meaningful health insights through digital technology.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Future Disease Risk Predictor Using Lifestyle Analysis</p>
          <p className="mt-1">Built with React.js • Rule-Based Health Analysis</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
