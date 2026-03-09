import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FormData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  sleepDuration: string;
  smokingHabit: string;
  familyHistory: string;
}

export interface PredictionResult {
  riskLevel: 'Low' | 'Medium' | 'High';
  healthScore: number;
  predictedDiseases: string[];
  suggestions: string[];
  bmi: number;
  bmiCategory: string;
  categoryScores: { name: string; score: number; level: 'Low' | 'Medium' | 'High' }[];
  timestamp: string;
}

const defaultFormData: FormData = {
  age: '', gender: '', height: '', weight: '',
  activityLevel: '', sleepDuration: '',
  smokingHabit: '', familyHistory: '',
};

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  predictions: PredictionResult[];
  addPrediction: (result: PredictionResult) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const useFormData = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormData must be used within FormProvider');
  return ctx;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [predictions, setPredictions] = useState<PredictionResult[]>(() => {
    const stored = localStorage.getItem('health_predictions');
    return stored ? JSON.parse(stored) : [];
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetForm = () => setFormData(defaultFormData);

  const addPrediction = (result: PredictionResult) => {
    const updated = [result, ...predictions].slice(0, 10);
    setPredictions(updated);
    localStorage.setItem('health_predictions', JSON.stringify(updated));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm, predictions, addPrediction }}>
      {children}
    </FormContext.Provider>
  );
};
