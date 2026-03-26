import { useContext } from 'react';
import { FormContext } from '@/contexts/FormContext.types';

export const useFormData = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormData must be used within FormProvider');
  return ctx;
};
