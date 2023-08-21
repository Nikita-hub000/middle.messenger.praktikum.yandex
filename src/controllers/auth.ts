import AuthApi, { SignUpProps, SignInProps } from '../api/auth';
import { isSuccessApi } from '../helpers/api';
import { router } from '../router';
import { store } from '../utils/Store';

class AuthController {
  async signin(data: SignInProps) {
    try {
      const result = await AuthApi.signin(data);
      if (isSuccessApi(result)) {
        await this.getUserInfo();
        router.go('/messenger');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async signup(data: SignUpProps) {
    try {
      const result = await AuthApi.signup(data);
      if (isSuccessApi(result)) {
        await this.getUserInfo();
        router.go('/messenger');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserInfo() {
    try {
      const result = await AuthApi.getUserInfo();
      if (isSuccessApi(result)) {
        const { avatar, ...info } = JSON.parse(result.response);
        store.set('user', {
          avatar: `https://ya-praktikum.tech/api/v2/resources${avatar}`,
          ...info,
        });
      }
    } catch (e: any) {
      console.log(e);
      //   store.dispatch(setIsLoggedIn(false));
    }
  }

  async logout() {
    try {
      await AuthApi.logout();

      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export const AuthControllerObject = new AuthController();
