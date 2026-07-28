import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'businesses';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('industry_id').unsigned().references('id').inTable('industries').onDelete('CASCADE').notNullable();
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('industry_id');
    });
  }
}