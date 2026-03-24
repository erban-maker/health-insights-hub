import { describe, expect, it } from 'vitest';
import { calculateRisk } from '@/lib/riskCalculator';
import type { FormData } from '@/contexts/FormContext';

const makeFormData = (overrides: Partial<FormData> = {}): FormData => ({
  age: '52',
  gender: 'male',
  height: '168',
  weight: '96',
  activityLevel: 'low',
  sleepDuration: '5',
  smokingHabit: 'yes',
  alcoholConsumption: 'yes',
  familyHistory: 'yes',
  existingConditions: 'none',
  ...overrides,
});

describe('riskCalculator visual data integrity', () => {
  it('produces chart category scores within 0-25 range', () => {
    const result = calculateRisk(makeFormData());

    for (const category of result.categoryScores) {
      expect(category.score).toBeGreaterThanOrEqual(0);
      expect(category.score).toBeLessThanOrEqual(25);
      expect(['Low', 'Medium', 'High']).toContain(category.level);
    }
  });

  it('keeps primary display metrics in expected ranges', () => {
    const result = calculateRisk(makeFormData());

    expect(result.healthScore).toBeGreaterThanOrEqual(0);
    expect(result.healthScore).toBeLessThanOrEqual(100);
    expect(result.bmi).toBeGreaterThan(0);
    expect(['Low', 'Medium', 'High']).toContain(result.riskLevel);
  });
});
