import { BusinessSchema } from '#database/schema';
import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import User from './user.ts';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Industry from './industry.ts';
import Valuation from './valuation.ts';

export default class Business extends BusinessSchema {
  @belongsTo(() => User, {
    foreignKey: 'owner_id'
  })
  declare owner: BelongsTo<typeof User>;

  @belongsTo(() => Industry)
  declare industry: BelongsTo<typeof Industry>;

  @hasMany(() => Valuation)
  declare valuations: HasMany<typeof Valuation>;
}