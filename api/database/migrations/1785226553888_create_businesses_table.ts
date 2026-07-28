import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'businesses';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name', 255);
      table.integer('owner_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();

      table.decimal('annual_revenue', 18, 2).notNullable();
      table.decimal('ebitda', 18, 2).notNullable();
      table.decimal('cash', 18, 2).notNullable().defaultTo(0);
      table.decimal('interest_bearing_debt', 18, 2).notNullable().defaultTo(0);
      table.integer('years_in_business').unsigned().notNullable();
      table.integer('employee_count').unsigned().notNullable();
      table.decimal('revenue_growth_percent', 7, 2).notNullable().defaultTo(0);
      table.decimal('recurring_revenue_percent', 5, 2).notNullable().defaultTo(0);
      table.decimal('largest_customer_revenue_percent', 5, 2).notNullable().defaultTo(0);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}