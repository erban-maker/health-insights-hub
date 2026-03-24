import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface FormData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  sleepDuration: string;
  smokingHabit: string;
  alcoholConsumption: string;
  familyHistory: string;
  existingConditions: string;
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
  smokingHabit: '', alcoholConsumption: '',
  familyHistory: '', existingConditions: '',
};

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  predictions: PredictionResult[];
  addPrediction: (result: PredictionResult) => Promise<boolean>;
}

const FormContext = createContext<FormContextType | null>(null);

export const useFormData = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormData must be used within FormProvider');
  return ctx;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    localStorage.removeItem('health_predictions');
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('health_token');
    if (!user || !token) {
      setPredictions([]);
      return;
    }

    let isCancelled = false;

    const loadPredictions = async () => {
      try {
        const response = await fetch(`${apiBase}/predictions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (!isCancelled) setPredictions([]);
          return;
        }

        const data = (await response.json()) as PredictionResult[];
        if (!isCancelled) {
          setPredictions(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!isCancelled) setPredictions([]);
      }
    };

    loadPredictions();
    return () => {
      isCancelled = true;
    };
  }, [apiBase, user]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetForm = () => setFormData(defaultFormData);

  const addPrediction = async (result: PredictionResult) => {
    const token = localStorage.getItem('health_token');
    if (!user || !token) return false;

    try {
      const response = await fetch(`${apiBase}/predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ formData, result }),
      });

      if (!response.ok) return false;

      const saved = (await response.json()) as PredictionResult;
      setPredictions((prev) => [saved, ...prev].slice(0, 50));
      return true;
    } catch {
      return false;
    }
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm, predictions, addPrediction }}>
      {children}
    </FormContext.Provider>
  );
};
