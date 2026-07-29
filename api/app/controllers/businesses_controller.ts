import Business from '#models/business';
import { createBusinessValidator, updateBusinessValidator } from '#validators/business';
import type { HttpContext } from '@adonisjs/core/http';
import { calculateValuation } from '../../helpers/valuator.ts';
import db from '@adonisjs/lucid/services/db';

async function createValuation(business: Business) {
  const industry = await business
    .related('industry')
    .query()
    .firstOrFail();

  const { lower, upper } = calculateValuation({ ...business.toAttributes(), industryAdjustment: industry.adjustment });
  await business.related('valuations').create({ lower, upper });
}



export default class BusinessesController {
  async show({ auth }: HttpContext) {
    const user = auth.getUserOrFail();
    const businesses = await user
      .related('businesses')
      .query()
      .preload('valuations', (query) => {
        query.orderBy('createdAt', 'asc');
      });

    return {
      data: businesses
    };
  }

  async find({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail();
    const business = await Business
      .query()
      .where('id', params.id)
      .where('ownerId', user.id)
      .firstOrFail();

    return response.ok(business);
  }

  async create({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail();
    const payload = await request.validateUsing(createBusinessValidator);

    const business = await db.transaction(async (trx) => {
      const business = new Business();

      business.useTransaction(trx);

      business.merge({
        ...payload,
        ownerId: user.id,
      });

      await business.save();
      await business.refresh();

      await createValuation(business);
      await business.load('valuations', (query) => {
        query.orderBy('createdAt', 'asc');
      });

      return business;
    });

    return response.created(business);
  }

  async update({ auth, request, response, params }: HttpContext) {
    const user = auth.getUserOrFail();
    const payload = await request.validateUsing(updateBusinessValidator);

    const business = await db.transaction(async (trx) => {
      const business = await Business.query({ client: trx })
        .where('id', params.id)
        .where('ownerId', user.id)
        .firstOrFail();

      business.merge(payload);

      await business.save();
      await createValuation(business);
      await business.load('valuations', (query) => {
        query.orderBy('createdAt', 'asc');
      });

      return business;
    });

    return response.ok(business);
  }

  async delete({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail();
    const business = await Business
      .query()
      .where('id', params.id)
      .where('ownerId', user.id)
      .firstOrFail();

    await business.delete();

    return {
      message: 'Deleted successfully',
    };
  }

  async reevaluate({ auth, params, response }: HttpContext) {
    const user = await auth.getUserOrFail();
    const business = await Business
      .query()
      .where('id', params.id)
      .where('ownerId', user.id)
      .firstOrFail();

    await createValuation(business);
    await business.load('valuations', (query) => {
      query.orderBy('createdAt', 'asc');
    });

    return response.ok(business);
  }
}