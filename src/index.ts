import './types/hbs.d.ts';
import { initRouter, router } from './router';
import registerHelpers from './utils/RegisterHelpers';
import { store } from './utils/Store';
import { AuthControllerObject } from './controllers/auth';

registerHelpers();
initRouter();
console.log(router);
window.addEventListener('DOMContentLoaded', async () => {
  try {
    await AuthControllerObject.getUserInfo();
    if (
      !store.getState()?.user?.id &&
      window.location.pathname !== '/sign-up'
    ) {
      router.go('/');
    } else if (
      !store.getState()?.user?.id &&
      window.location.pathname === '/sign-up'
    ) {
      return;
    } else if (
      window.location.pathname === '/' ||
      window.location.pathname === '/sign-up'
    ) {
      router.go('/messenger');
    }
  } catch (e) {
    if (store.getState()?.user?.id) {
      console.log('authorized');
    } else {
      router.go('/');
    }
  }
});
