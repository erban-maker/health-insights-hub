import { Check } from 'lucide-react';

const steps = [
  { label: 'Personal Details', shortLabel: 'Personal' },
  { label: 'Physical Health', shortLabel: 'Physical' },
  { label: 'Lifestyle Habits', shortLabel: 'Lifestyle' },
  { label: 'Dietary Pattern', shortLabel: 'Diet' },
  { label: 'Risk Behavior', shortLabel: 'Risk' },
  { label: 'Stress & Mental', shortLabel: 'Stress' },
  { label: 'Family History', shortLabel: 'Family' },
  { label: 'Review', shortLabel: 'Review' },
];

interface FormStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const FormStepper = ({ currentStep, onStepClick }: FormStepperProps) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
      {steps.map((step, i) => {
        const isComplete = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <button
            key={i}
            onClick={() => isComplete && onStepClick(i)}
            disabled={!isComplete}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl text-center transition-all ${
              isCurrent
                ? 'bg-primary/10 ring-2 ring-primary'
                : isComplete
                ? 'bg-primary/5 hover:bg-primary/10 cursor-pointer'
                : 'bg-muted/50 opacity-60'
            }`}
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                isComplete
                  ? 'bg-primary text-primary-foreground'
                  : isCurrent
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'bg-muted-foreground/20 text-muted-foreground'
              }`}
            >
              {isComplete ? <Check className="w-4 h-4" /> : i + 1}
            </span>
            <span className="text-[10px] md:text-xs font-medium leading-tight">
              <span className="md:hidden">{step.shortLabel}</span>
              <span className="hidden md:inline">{step.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FormStepper;
