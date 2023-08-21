import HTTPTransport from '../utils/HTTPTransport';

export type SignInProps = {
  login: string;
  password: string;
};
export type SignUpProps = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};
export type UserResponse = {
  id: 123;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

const api = new HTTPTransport();
class AuthApi {
  static async signin(data: SignInProps) {
    const answer = await api.post('/auth/signin', { data, timeout: 5000 });
    return answer;
  }

  static async signup(data: SignUpProps) {
    const answer = await api.post('/auth/signup', { data, timeout: 5000 });
    return answer;
  }

  static async getUserInfo() {
    const answer = await api.get('/auth/user');
    return answer;
  }

  static async logout() {
    const answer = await api.post('/auth/logout', {});
    return answer;
  }
}

export default AuthApi;
