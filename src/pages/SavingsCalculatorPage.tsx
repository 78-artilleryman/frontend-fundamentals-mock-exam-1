import { Border, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { useEffect, useMemo, useState } from 'react';
import { getProducts, Product } from '../services/products';
import { filterProductsByConditions } from '../utils/filterProducts';
import { ProductList } from './components/ProductList';
import { CalculationResult } from './components/CalculationResult';

export function SavingsCalculatorPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [goalAmount, setGoalAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [savingTerm, setSavingTerm] = useState(12);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'results'>('products');

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
    return filterProductsByConditions(products, { monthlyAmount, savingTerm });
  }, [products, monthlyAmount, savingTerm]);

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={goalAmount}
        onChange={e => setGoalAmount(e.target.value)}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthlyAmount}
        onChange={e => setMonthlyAmount(e.target.value)}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={savingTerm}
        onChange={value => setSavingTerm(value)}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={value => setActiveTab(value as 'products' | 'results')}>
        <Tab.Item value="products" selected={activeTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={activeTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {activeTab === 'products' ? (
        <ProductList
          products={filteredProducts}
          selectedProduct={selectedProduct}
          onSelectProduct={setSelectedProduct}
        />
      ) : (
        <CalculationResult
          selectedProduct={selectedProduct}
          goalAmount={goalAmount}
          monthlyAmount={monthlyAmount}
          savingTerm={savingTerm}
        />
      )}
    </>
  );
}
