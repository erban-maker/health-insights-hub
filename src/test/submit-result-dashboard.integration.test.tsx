import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ReviewSubmit from '@/pages/ReviewSubmit';
import Results from '@/pages/Results';
import Dashboard from '@/pages/Dashboard';

type PredictionResult = {
  riskLevel: 'Low' | 'Medium' | 'High';
  healthScore: number;
  predictedDiseases: string[];
  suggestions: string[];
  bmi: number;
  bmiCategory: string;
  categoryScores: Array<{ name: string; score: number; level: 'Low' | 'Medium' | 'High' }>;
};

const state = {
  predictions: [] as Array<PredictionResult & { timestamp: string }>,
  formData: {
    age: '29',
    gender: 'female',
    height: '165',
    weight: '60',
    activityLevel: 'moderate',
    sleepDuration: '7',
    smokingHabit: 'never',
    alcoholConsumption: 'occasionally',
    familyHistory: 'none',
    existingConditions: 'none',
  },
};

const addPredictionMock = vi.fn(async (result: PredictionResult) => {
  state.predictions = [{ ...result, timestamp: new Date().toISOString() }, ...state.predictions];
  return true;
});

vi.mock('recharts', () => {
  const Dummy = ({ children }: { children?: React.ReactNode }) => <div>{children}</div>;
  return {
    ResponsiveContainer: Dummy,
    RadarChart: Dummy,
    PolarGrid: Dummy,
    PolarAngleAxis: Dummy,
    PolarRadiusAxis: Dummy,
    Radar: Dummy,
    BarChart: Dummy,
    Bar: Dummy,
    XAxis: Dummy,
    YAxis: Dummy,
    CartesianGrid: Dummy,
    Tooltip: Dummy,
    Cell: Dummy,
    LineChart: Dummy,
    Line: Dummy,
    PieChart: Dummy,
    Pie: Dummy,
    RadialBarChart: Dummy,
    RadialBar: Dummy,
  };
});

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { name: 'Test User', email: 'test@example.com' },
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
  }),
}));

vi.mock('@/contexts/FormContext', () => ({
  useFormData: () => ({
    formData: state.formData,
    updateFormData: vi.fn(),
    resetForm: vi.fn(),
    predictions: state.predictions,
    predictionsLoading: false,
    predictionsError: null,
    reloadPredictions: vi.fn(async () => {}),
    addPrediction: addPredictionMock,
  }),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

describe('submit -> result -> dashboard flow', () => {
  beforeEach(() => {
    state.predictions = [];
    addPredictionMock.mockClear();
  });

  it('submits prediction, shows results, then navigates to dashboard', async () => {
    render(
      <MemoryRouter initialEntries={['/review']}>
        <Routes>
          <Route path="/review" element={<ReviewSubmit />} />
          <Route path="/results" element={<Results />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /get prediction/i }));

    expect(await screen.findByText(/risk prediction results/i)).toBeInTheDocument();
    expect(addPredictionMock).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /dashboard/i }));

    expect(await screen.findByText(/health dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/change since last test/i)).toBeInTheDocument();
  });
});
