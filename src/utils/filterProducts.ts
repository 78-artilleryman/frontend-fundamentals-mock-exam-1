import { Product } from '../services/products';

interface FilterConditions {
  monthlyAmount: string;
  savingTerm: number;
}

export const filterProductsByConditions = (products: Product[] | null, conditions: FilterConditions): Product[] => {
  if (!products) {
    return [];
  }
  const { monthlyAmount, savingTerm } = conditions;

  return products.filter(product => {
    const monthlyAmountNum = Number(monthlyAmount);
    const isMonthlyAmountValid =
      !monthlyAmount || (monthlyAmountNum > product.minMonthlyAmount && monthlyAmountNum < product.maxMonthlyAmount);

    const isSavingTermValid = product.availableTerms === savingTerm;

    return isMonthlyAmountValid && isSavingTermValid;
  });
};
