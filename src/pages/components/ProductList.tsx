import { Assets, colors, ListRow } from 'tosslib';
import { Product } from '../../services/products';

interface ProductListProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
}

export function ProductList({ products, selectedProduct, onSelectProduct }: ProductListProps) {
  return (
    <>
      {products.map(product => (
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

