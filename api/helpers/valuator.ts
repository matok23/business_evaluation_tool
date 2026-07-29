import Business from "#models/business";

type ValuationInput = Pick<
  Business,
  | 'annualRevenue'
  | 'ebitda'
  | 'cash'
  | 'interestBearingDebt'
  | 'yearsInBusiness'
  | 'employeeCount'
  | 'revenueGrowthPercent'
  | 'recurringRevenuePercent'
  | 'largestCustomerRevenuePercent'
> & {
  industryAdjustment: number;
};

type ValuationResult = {
  lower: number;
  upper: number;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export function calculateValuation(
  input: ValuationInput
): ValuationResult {
  const growthAdjustment = clamp(
    1 + input.revenueGrowthPercent / 100,
    0.7,
    1.5
  );

  const recurringRevenueAdjustment =
    1 + (input.recurringRevenuePercent / 100) * 0.25;

  const customerConcentrationAdjustment = clamp(
    1 - Math.max(0, input.largestCustomerRevenuePercent - 20) / 200,
    0.7,
    1
  );

  const ageAdjustment = clamp(
    0.85 + input.yearsInBusiness * 0.015,
    0.85,
    1.1
  );

  const employeeAdjustment = clamp(
    0.9 + input.employeeCount * 0.002,
    0.9,
    1.1
  );

  const totalAdjustment =
    input.industryAdjustment *
    growthAdjustment *
    recurringRevenueAdjustment *
    customerConcentrationAdjustment *
    ageAdjustment *
    employeeAdjustment;

  let lowerEnterpriseValue: number;
  let upperEnterpriseValue: number;

  if (input.ebitda > 0) {
    lowerEnterpriseValue = input.ebitda * 3 * totalAdjustment;
    upperEnterpriseValue = input.ebitda * 5 * totalAdjustment;
  } else {

    lowerEnterpriseValue =
      input.annualRevenue * 0.35 * totalAdjustment;

    upperEnterpriseValue =
      input.annualRevenue * 0.75 * totalAdjustment;
  }

  const netCash = input.cash - input.interestBearingDebt;

  return {
    lower: Math.max(
      0,
      Math.round(lowerEnterpriseValue + netCash)
    ),
    upper: Math.max(
      0,
      Math.round(upperEnterpriseValue + netCash)
    ),
  };
}