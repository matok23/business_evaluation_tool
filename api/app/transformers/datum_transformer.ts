import Industry from '#models/industry';
import { BaseTransformer } from '@adonisjs/core/transformers';

export default class IndustryTransformer extends BaseTransformer<Industry> {
  toObject() {
    return this.pick(this.resource, ['id', 'name']);
  }
}