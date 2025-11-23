import { colors, ListRow } from 'tosslib';

interface CalculationSummaryProps {
  expectedAmount: number;
  differenceFromGoal: number;
  recommendedMonthlyAmount: number;
}

export function CalculationSummary({
  expectedAmount,
  differenceFromGoal,
  recommendedMonthlyAmount,
}: CalculationSummaryProps) {
  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${Math.floor(expectedAmount).toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${Math.floor(differenceFromGoal).toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${recommendedMonthlyAmount.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
    </>
  );
}

