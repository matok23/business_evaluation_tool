import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'businesses';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.integer('owner_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();

      table.float('annual_revenue').notNullable();
      table.float('ebitda').notNullable();
      table.float('cash').notNullable().defaultTo(0);
      table.float('interest_bearing_debt').notNullable().defaultTo(0);
      table.integer('years_in_business').unsigned().notNullable();
      table.integer('employee_count').unsigned().notNullable();
      table.float('revenue_growth_percent').notNullable().defaultTo(0);
      table.float('recurring_revenue_percent').notNullable().defaultTo(0);
      table.float('largest_customer_revenue_percent').notNullable().defaultTo(0);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}