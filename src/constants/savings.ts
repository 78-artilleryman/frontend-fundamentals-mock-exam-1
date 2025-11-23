/**
 * 적금 계산기 관련 상수
 */

// 저축 기간 옵션 (개월)
export enum SAVING_TERMS {
  SixMonths = 6,
  TwelveMonths = 12,
  TwentyFourMonths = 24,
}

// 저축 기간 값 배열 (숫자만)
export const SAVING_TERM_VALUES = [SAVING_TERMS.SixMonths, SAVING_TERMS.TwelveMonths, SAVING_TERMS.TwentyFourMonths];

// 기본 저축 기간 (개월)
export const DEFAULT_SAVING_TERM = SAVING_TERMS.TwelveMonths;

// 추천 상품 개수
export const RECOMMENDED_PRODUCTS_COUNT = 2;
