import { Border, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { useEffect, useMemo, useState } from 'react';
import { getProducts, Product } from '../services/products';
import { filterProductsByConditions } from '../utils/filterProducts';
import { ProductList } from './components/ProductList';
import { CalculationResult } from './components/CalculationResult';
import { useToggle } from '../hooks/useToggle';
import { useSavingsForm } from '../hooks/useSavingsForm';
import { SAVING_TERM_VALUES } from '../constants/savings';

export function SavingsCalculatorPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { formData, setGoalAmount, setMonthlyAmount, setSavingTerm } = useSavingsForm();
  const { value: showResults, setToggle: setShowResults } = useToggle(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error('상품 데이터를 불러오는데 실패했습니다:', error);
      }
    };

    fetchProducts();

    return () => {
      setProducts([]);
    };
  }, []);

  // 필터링된 상품 목록
  const filteredProducts = useMemo(() => {
    return filterProductsByConditions(products, {
      monthlyAmount: formData.monthlyAmount,
      savingTerm: formData.savingTerm,
    });
  }, [products, formData.monthlyAmount, formData.savingTerm]);

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={formData.goalAmount}
        onChange={e => setGoalAmount(e.target.value)}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={formData.monthlyAmount}
        onChange={e => setMonthlyAmount(e.target.value)}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={formData.savingTerm}
        onChange={value => setSavingTerm(value)}
      >
        {SAVING_TERM_VALUES.map(term => (
          <SelectBottomSheet.Option key={term} value={term}>
            {term}개월
          </SelectBottomSheet.Option>
        ))}
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={value => setShowResults(value === 'results')}>
        <Tab.Item value="products" selected={!showResults}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={showResults}>
          계산 결과
        </Tab.Item>
      </Tab>

      {showResults ? (
        <CalculationResult
          selectedProduct={selectedProduct}
          goalAmount={formData.goalAmount}
          monthlyAmount={formData.monthlyAmount}
          savingTerm={formData.savingTerm}
          filteredProducts={filteredProducts}
          onSelectProduct={setSelectedProduct}
        />
      ) : (
        <ProductList
          products={filteredProducts}
          selectedProduct={selectedProduct}
          onSelectProduct={setSelectedProduct}
        />
      )}
    </>
  );
}
