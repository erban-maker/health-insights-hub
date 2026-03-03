import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FormData {
  // Personal Details
  age: string;
  gender: string;
  occupation: string;
  location: string;
  // Physical Health
  height: string;
  weight: string;
  bmi: string;
  // Lifestyle
  exerciseFrequency: string;
  activityLevel: string;
  sleepDuration: string;
  dailyRoutine: string;
  // Dietary
  mealsPerDay: string;
  junkFoodFrequency: string;
  fruitVegIntake: string;
  waterIntake: string;
  // Risk Behavior
  smokingStatus: string;
  alcoholConsumption: string;
  // Stress & Mental Health
  stressLevel: string;
  screenTime: string;
  // Family & Medical History
  familyDiabetes: boolean;
  familyHypertension: boolean;
  familyHeartDisease: boolean;
  familyObesity: boolean;
  familyCancer: boolean;
  existingConditions: string;
}

const defaultFormData: FormData = {
  age: '', gender: '', occupation: '', location: '',
  height: '', weight: '', bmi: '',
  exerciseFrequency: '', activityLevel: '', sleepDuration: '', dailyRoutine: '',
  mealsPerDay: '', junkFoodFrequency: '', fruitVegIntake: '', waterIntake: '',
  smokingStatus: '', alcoholConsumption: '',
  stressLevel: '', screenTime: '',
  familyDiabetes: false, familyHypertension: false, familyHeartDisease: false,
  familyObesity: false, familyCancer: false, existingConditions: '',
};

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const useFormData = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormData must be used within FormProvider');
  return ctx;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setCurrentStep(0);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, currentStep, setCurrentStep, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};
