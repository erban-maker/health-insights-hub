import { useContext } from 'react';
import { FormContext, FormContextType } from '@/contexts/FormContext';

export const useFormData = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormData must be used within FormProvider');
  return ctx;
};
