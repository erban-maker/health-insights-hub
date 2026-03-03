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
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold">Health Assessment</h1>
          <p className="text-sm text-muted-foreground">Complete all steps to generate your disease risk analysis</p>
        </div>
        <FormStepper currentStep={currentStep} onStepClick={goToStep} />
        {steps[currentStep]}
      </div>
    </div>
  );
};

export default Dashboard;
