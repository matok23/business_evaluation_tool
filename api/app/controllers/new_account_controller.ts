import User from '#models/user';
import { registerValidator } from '#validators/user';
import type { HttpContext } from '@adonisjs/core/http';

export default class NewAccountController {
  async store({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(registerValidator);

    await User.create({ email, password });

    return {
      message: 'Registration successful'
    };
  }
}
