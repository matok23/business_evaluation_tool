import vine from '@vinejs/vine';
import type { Infer } from '@vinejs/vine/types';

export const createBusinessSchema = vine.object({
  name: vine.string().trim().minLength(1).maxLength(255),

  industryId: vine.number(),

  annualRevenue: vine
    .number()
    .nonNegative()
    .decimal([0, 2]),

  // EBITDA may be negative when the business is operating at a loss
  ebitda: vine
    .number()
    .decimal([0, 2]),

  // Optional because the database provides a default value
  cash: vine
    .number()
    .nonNegative()
    .decimal([0, 2])
    .optional(),

  interestBearingDebt: vine
    .number()
    .nonNegative()
    .decimal([0, 2])
    .optional(),

  yearsInBusiness: vine
    .number()
    .withoutDecimals()
    .nonNegative(),

  employeeCount: vine
    .number()
    .withoutDecimals()
    .nonNegative(),

  // Growth may be negative
  revenueGrowthPercent: vine
    .number()
    .decimal([0, 2])
    .optional(),

  recurringRevenuePercent: vine
    .number()
    .range([0, 100])
    .decimal([0, 2])
    .optional(),

  largestCustomerRevenuePercent: vine
    .number()
    .range([0, 100])
    .decimal([0, 2])
    .optional(),
});

export const createBusinessValidator = vine.create(createBusinessSchema);

export const updateBusinessValidator = vine.create(createBusinessValidator.schema.partial());

export type CreateBusinessPayload = Infer<typeof createBusinessSchema>;

export type CreateBusinessRecordPayload = CreateBusinessPayload & {
  ownerId: number;
};