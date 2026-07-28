/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';

router.get('/', () => {
  return { hello: 'world' };
});

router
  .group(() => {
    router.post('register', [controllers.NewAccount, 'store']);
    router.post('login', [controllers.AccessTokens, 'store']);
    router.get('logout', [controllers.AccessTokens, 'destroy']);
  })
  .prefix('auth')
  .as('auth');

router
  .group(() => {
    router.get('/', [controllers.Businesses, 'show']);
    router.get('/:id/delete', [controllers.Businesses, 'delete']);
    router.post('/create', [controllers.Businesses, 'create']);
  })
  .prefix('business')
  .use(middleware.auth());
