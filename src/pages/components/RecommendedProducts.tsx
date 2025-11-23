import { Assets, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { Product } from '../../services/products';
import { RECOMMENDED_PRODUCTS_COUNT } from '../../constants/savings';

interface RecommendedProductsProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
}

export function RecommendedProducts({ products, selectedProduct, onSelectProduct }: RecommendedProductsProps) {
  const topProducts = [...products].sort((a, b) => b.annualRate - a.annualRate).slice(0, RECOMMENDED_PRODUCTS_COUNT);

  return (
    <>
      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {topProducts.map(product => (
        <ListRow
          key={product.id}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={product.name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${product.annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          right={selectedProduct?.id === product.id ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
          onClick={() => onSelectProduct(product)}
        />
      ))}
    </>
  );
}
