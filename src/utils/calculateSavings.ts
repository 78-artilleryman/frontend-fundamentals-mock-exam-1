import { Product } from '../services/products';

interface CalculationParams {
  product: Product | null;
  monthlyAmount: number;
  savingTerm: number;
  goalAmount?: number;
}

interface CalculationResult {
  expectedAmount: number;
  differenceFromGoal: number;
  recommendedMonthlyAmount: number;
}

export const calculateSavings = (params: CalculationParams): CalculationResult => {
  const { product, monthlyAmount, savingTerm, goalAmount } = params;
  const annualRate = product?.annualRate ? product.annualRate / 100 : 0;

  // 예상 수익 금액 = 월 납입액 * 저축 기간 * (1 + 연이자율 * 0.5)
  const expectedAmount = monthlyAmount * savingTerm * (1 + annualRate * 0.5);

  // 목표 금액과의 차이 = 목표 금액 - 예상 수익 금액
  const differenceFromGoal = goalAmount ? goalAmount - expectedAmount : 0;

  // 추천 월 납입 금액 = 목표 금액 ÷ (저축 기간 * (1 + 연이자율 * 0.5))
  // 1,000원 단위로 반올림
  const rawRecommendedAmount = goalAmount ? goalAmount / (savingTerm * (1 + annualRate * 0.5)) : 0;
  const recommendedMonthlyAmount = Math.round(rawRecommendedAmount / 1000) * 1000;

  return {
    expectedAmount,
    differenceFromGoal,
    recommendedMonthlyAmount,
  };
};
