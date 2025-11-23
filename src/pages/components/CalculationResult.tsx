import { Border, ListRow, Spacing } from 'tosslib';
import { Product } from '../../services/products';
import { calculateSavings } from '../../utils/calculateSavings';
import { CalculationSummary } from './CalculationSummary';
import { RecommendedProducts } from './RecommendedProducts';

interface CalculationResultProps {
  selectedProduct: Product | null;
  goalAmount: string;
  monthlyAmount: string;
  savingTerm: number;
  filteredProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export function CalculationResult({
  selectedProduct,
  goalAmount,
  monthlyAmount,
  savingTerm,
  filteredProducts,
  onSelectProduct,
}: CalculationResultProps) {
  const goalAmountNum = Number(goalAmount) || 0;
  const monthlyAmountNum = Number(monthlyAmount) || 0;

  const { expectedAmount, differenceFromGoal, recommendedMonthlyAmount } = calculateSavings({
    product: selectedProduct,
    monthlyAmount: monthlyAmountNum,
    savingTerm,
    goalAmount: goalAmountNum,
  });

  return (
    <>
      <Spacing size={8} />

      {selectedProduct ? (
        <CalculationSummary
          expectedAmount={expectedAmount}
          differenceFromGoal={differenceFromGoal}
          recommendedMonthlyAmount={recommendedMonthlyAmount}
        />
      ) : (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
      )}

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <RecommendedProducts
        products={filteredProducts}
        selectedProduct={selectedProduct}
        onSelectProduct={onSelectProduct}
      />

      <Spacing size={40} />
    </>
  );
}
