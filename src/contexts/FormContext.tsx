import { useCallback, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { API_BASE_URL, getAuthHeaders, getAuthToken } from '@/lib/api';
import { FormData, PredictionResult, FormContextType, defaultFormData, FormContext } from './FormContext.types';

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

// Re-export types for backward compatibility
export type { FormData, PredictionResult, FormContextType };
export { FormContext };
