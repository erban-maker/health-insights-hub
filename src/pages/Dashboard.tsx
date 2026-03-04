import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFormData } from '@/contexts/FormContext';
import { Button } from '@/components/ui/button';
import { Shield, LogOut } from 'lucide-react';
import FormStepper from '@/components/FormStepper';
import PersonalDetailsForm from '@/components/forms/PersonalDetailsForm';
import PhysicalHealthForm from '@/components/forms/PhysicalHealthForm';
import LifestyleHabitsForm from '@/components/forms/LifestyleHabitsForm';
import DietaryPatternForm from '@/components/forms/DietaryPatternForm';
import RiskBehaviorForm from '@/components/forms/RiskBehaviorForm';
import StressMentalHealthForm from '@/components/forms/StressMentalHealthForm';
import FamilyMedicalHistoryForm from '@/components/forms/FamilyMedicalHistoryForm';
import ReviewConfirmation from '@/components/forms/ReviewConfirmation';
import { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const stepMeta = [
  { number: 4, title: 'Basic Personal Details', subtitle: 'Form 4 of 12' },
  { number: 5, title: 'Physical Health Details', subtitle: 'Form 5 of 12' },
  { number: 6, title: 'Lifestyle Habits', subtitle: 'Form 6 of 12' },
  { number: 7, title: 'Dietary Pattern', subtitle: 'Form 7 of 12' },
  { number: 8, title: 'Risk Behavior', subtitle: 'Form 8 of 12' },
  { number: 9, title: 'Stress & Mental Health', subtitle: 'Form 9 of 12' },
  { number: 10, title: 'Family & Medical History', subtitle: 'Form 10 of 12' },
  { number: 11, title: 'Review & Confirmation', subtitle: 'Form 11 of 12' },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { currentStep, setCurrentStep } = useFormData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const next = () => setCurrentStep(currentStep + 1);
  const back = () => setCurrentStep(currentStep - 1);
  const goToStep = (step: number) => setCurrentStep(step);

  const handleSubmit = () => {
    navigate('/results');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const progressPercent = ((currentStep + 1) / stepMeta.length) * 100;
  const meta = stepMeta[currentStep];

  const steps = [
    <PersonalDetailsForm key={0} onNext={next} />,
    <PhysicalHealthForm key={1} onNext={next} onBack={back} />,
    <LifestyleHabitsForm key={2} onNext={next} onBack={back} />,
    <DietaryPatternForm key={3} onNext={next} onBack={back} />,
    <RiskBehaviorForm key={4} onNext={next} onBack={back} />,
    <StressMentalHealthForm key={5} onNext={next} onBack={back} />,
    <FamilyMedicalHistoryForm key={6} onNext={next} onBack={back} />,
    <ReviewConfirmation key={7} onSubmit={handleSubmit} onBack={back} onEdit={goToStep} />,
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-display font-bold">HealthPredict</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Page-like header with step number */}
        <div className="mb-2">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest">{meta.subtitle}</p>
          <h1 className="text-2xl font-display font-bold mt-1">{meta.title}</h1>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1.5 text-right">{Math.round(progressPercent)}% Complete</p>
        </div>

        {/* Step navigation */}
        <FormStepper currentStep={currentStep} onStepClick={goToStep} />

        {/* Separator line */}
        <div className="border-t border-border my-4" />

        {/* Form content */}
        <div key={currentStep} className="animate-scale-in">
          {steps[currentStep]}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
