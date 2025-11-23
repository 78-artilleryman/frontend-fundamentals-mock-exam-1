import { useState } from 'react';
import { DEFAULT_SAVING_TERM } from '../constants/savings';

export interface SavingsFormData {
  goalAmount: string;
  monthlyAmount: string;
  savingTerm: number;
}

interface UseSavingsFormReturn {
  formData: SavingsFormData;
  setGoalAmount: (value: string) => void;
  setMonthlyAmount: (value: string) => void;
  setSavingTerm: (value: number) => void;
  resetForm: () => void;
}

const DEFAULT_FORM_DATA: SavingsFormData = {
  goalAmount: '',
  monthlyAmount: '',
  savingTerm: DEFAULT_SAVING_TERM,
};

export const useSavingsForm = (initialData: Partial<SavingsFormData> = {}): UseSavingsFormReturn => {
  const [formData, setFormData] = useState<SavingsFormData>({
    ...DEFAULT_FORM_DATA,
    ...initialData,
  });

  const setGoalAmount = (value: string) => {
    setFormData(prev => ({ ...prev, goalAmount: value }));
  };

  const setMonthlyAmount = (value: string) => {
    setFormData(prev => ({ ...prev, monthlyAmount: value }));
  };

  const setSavingTerm = (value: number) => {
    setFormData(prev => ({ ...prev, savingTerm: value }));
  };

  const resetForm = () => {
    setFormData({ ...DEFAULT_FORM_DATA, ...initialData });
  };

  return {
    formData,
    setGoalAmount,
    setMonthlyAmount,
    setSavingTerm,
    resetForm,
  };
};
