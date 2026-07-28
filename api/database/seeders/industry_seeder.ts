import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Industry from '#models/industry';

export default class IndustrySeeder extends BaseSeeder {
  async run() {
    await Industry.updateOrCreateMany('name', [
      {
        name: 'Software & SaaS',
        adjustment: 1.3,
      },
      {
        name: 'Technology Services',
        adjustment: 1.2,
      },
      {
        name: 'Healthcare',
        adjustment: 1.15,
      },
      {
        name: 'Financial Services',
        adjustment: 1.1,
      },
      {
        name: 'Professional Services',
        adjustment: 1.05,
      },
      {
        name: 'Real Estate',
        adjustment: 1,
      },
      {
        name: 'Manufacturing',
        adjustment: 0.95,
      },
      {
        name: 'Construction',
        adjustment: 0.9,
      },
      {
        name: 'Retail',
        adjustment: 0.85,
      },
      {
        name: 'Hospitality',
        adjustment: 0.8,
      },
      {
        name: 'Other',
        adjustment: 1,
      },
    ]);
  }
}