import Business from '#models/business';
import { createBusinessValidator } from '#validators/business';
import type { HttpContext } from '@adonisjs/core/http';

export default class BusinessesController {
  async show({ auth }: HttpContext) {
    const user = auth.getUserOrFail();
    const businesses = await user.related('businesses').query();

    return businesses;
  }

  async create({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail();
    const payload = await request.validateUsing(createBusinessValidator);

    const business = await Business.create({ ...payload, ownerId: user.id });

    return response.created(business);
  }

  async edit() {

  }

  async delete({ response, auth, params }: HttpContext) {
    const user = auth.getUserOrFail();
    const business = await Business
      .query()
      .where('id', params.id)
      .where('ownerId', user.id)
      .firstOrFail();

    await business.delete();

    return response.ok({});
  }

  async reevaluate() {

  }
}