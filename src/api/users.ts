import HTTPTransport from '../utils/HTTPTransport';

export type ChangeProfileProps = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};
export type ChangeProfileAvatarProps = {
  avatar: FormData;
};

export type ChangePasswordProps = {
  oldPassword: string;
  newPassword: string;
};

export type SearchUserProps = {
  login: string;
};

const api = new HTTPTransport();
class UsersApi {
  static async changeProfile(data: ChangeProfileProps) {
    const answer = await api.put('/user/profile', { data, timeout: 5000 });
    return answer;
  }

  static async changeProfileAvatar(data: FormData) {
    const answer = await api.put('/user/profile/avatar', {
      data,
      timeout: 5000,
    });
    return answer;
  }

  static async searchUser(data: SearchUserProps) {
    const answer = await api.post('/user/search', {
      data,
      timeout: 5000,
    });
    return answer;
  }

  static async changePassword(data: ChangePasswordProps) {
    const answer = await api.put('/user/password', { data, timeout: 5000 });
    return answer;
  }
}

export default UsersApi;
