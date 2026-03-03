import { Check } from 'lucide-react';

const steps = [
  'Personal Details',
  'Physical Health',
  'Lifestyle Habits',
  'Dietary Pattern',
  'Risk Behavior',
  'Stress & Mental',
  'Family History',
  'Review',
];

interface FormStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const FormStepper = ({ currentStep, onStepClick }: FormStepperProps) => {
  return (
    <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
      {steps.map((label, i) => {
        const isComplete = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <div key={i} className="flex items-center flex-shrink-0">
            <button
              onClick={() => isComplete && onStepClick(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isCurrent
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : isComplete
                  ? 'bg-primary/10 text-primary cursor-pointer hover:bg-primary/20'
                  : 'bg-muted text-muted-foreground'
              }`}
              disabled={!isComplete}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isComplete ? 'bg-primary text-primary-foreground' : isCurrent ? 'bg-primary-foreground text-primary' : 'bg-muted-foreground/20 text-muted-foreground'
              }`}>
                {isComplete ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </span>
              <span className="hidden md:inline">{label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={`w-4 lg:w-8 h-0.5 mx-1 ${isComplete ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormStepper;
