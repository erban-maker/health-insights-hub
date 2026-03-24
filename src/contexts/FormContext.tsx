import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { API_BASE_URL, getAuthHeaders, getAuthToken } from '@/lib/api';

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
  predictionsLoading: boolean;
  predictionsError: string | null;
  reloadPredictions: () => Promise<void>;
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
  const [predictionsLoading, setPredictionsLoading] = useState(false);
  const [predictionsError, setPredictionsError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.removeItem('health_predictions');
  }, []);

  const reloadPredictions = useCallback(async () => {
    const token = getAuthToken();
    if (!user || !token) {
      setPredictions([]);
      setPredictionsError(null);
      setPredictionsLoading(false);
      return;
    }

    setPredictionsLoading(true);
    setPredictionsError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predictions`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        setPredictions([]);
        setPredictionsError('Failed to load your prediction history.');
        return;
      }

      const data = (await response.json()) as PredictionResult[];
      setPredictions(Array.isArray(data) ? data : []);
    } catch {
      setPredictions([]);
      setPredictionsError('Network error while loading predictions.');
    } finally {
      setPredictionsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    reloadPredictions();
  }, [reloadPredictions]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetForm = () => setFormData(defaultFormData);

  const addPrediction = async (result: PredictionResult) => {
    const token = getAuthToken();
    if (!user || !token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ formData, result }),
      });

      if (!response.ok) return false;

      const saved = (await response.json()) as PredictionResult;
      setPredictions((prev) => [saved, ...prev].slice(0, 50));
      setPredictionsError(null);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm, predictions, predictionsLoading, predictionsError, reloadPredictions, addPrediction }}>
      {children}
    </FormContext.Provider>
  );
};
