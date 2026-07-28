import type { HttpContext } from '@adonisjs/core/http';

import Industry from "#models/industry";
import IndustryTransformer from '#transformers/datum_transformer';

export default class DataController {
  async industries({ response, serialize }: HttpContext) {
    const industries = await Industry.all();

    return serialize(IndustryTransformer.transform(industries));
  }
}