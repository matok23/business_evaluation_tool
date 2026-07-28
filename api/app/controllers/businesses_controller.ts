import Business from '#models/business';
import { createBusinessValidator, updateBusinessValidator } from '#validators/business';
import type { HttpContext } from '@adonisjs/core/http';

export default class BusinessesController {
  async show({ auth }: HttpContext) {
    const user = auth.getUserOrFail();
    const businesses = await user.related('businesses').query();

    return {
      data: businesses
    };
  }

  async create({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail();
    const payload = await request.validateUsing(createBusinessValidator);

    const business = await Business.create({ ...payload, ownerId: user.id });

    return response.created(business);
  }

  async update({ auth, request, response, params }: HttpContext) {
    const user = auth.getUserOrFail();

    const payload = await request.validateUsing(updateBusinessValidator);

    const business = await Business.query()
      .where('id', params.id)
      .where('ownerId', user.id)
      .firstOrFail();

    business.merge(payload);
    await business.save();

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

  async reevaluate() {

  }
}