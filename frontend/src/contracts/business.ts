export type Industry = {
  id: number;
  name: string;
};

export type Valuation = {
  id: number;
  lower: number;
  upper: number;
  createdAt: string;
  updatedAt: string;
};

export type Business = {
  id: number;
  name: string;
  ownerId: number;
  industryId: number;

  annualRevenue: number;
  ebitda: number;
  cash: number;
  interestBearingDebt: number;

  yearsInBusiness: number;
  employeeCount: number;

  revenueGrowthPercent: number;
  recurringRevenuePercent: number;
  largestCustomerRevenuePercent: number;

  createdAt: string;
  updatedAt: string;

  valuations: Valuation[];
};

export type CreateBusinessPayload = {
  name: string;
  industryId: number;

  annualRevenue: number;
  ebitda: number;
  cash: number;
  interestBearingDebt: number;

  yearsInBusiness: number;
  employeeCount: number;

  revenueGrowthPercent: number;
  recurringRevenuePercent: number;
  largestCustomerRevenuePercent: number;
};

export type UpdateBusinessPayload = Partial<CreateBusinessPayload>;