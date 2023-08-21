import UsersApi, {
  ChangePasswordProps,
  ChangeProfileAvatarProps,
  ChangeProfileProps,
  SearchUserProps,
} from '../api/users';
import { isSuccessApi } from '../helpers/api';
import { router } from '../router';
import { store } from '../utils/Store';

class UsersController {
  async changeProfile(data: ChangeProfileProps) {
    try {
      const response = await UsersApi.changeProfile(data);
      if (isSuccessApi(response)) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async searchUser(data: SearchUserProps) {
    try {
      const result = await UsersApi.searchUser(data);
      if (isSuccessApi(result)) {
        store.set('chats.findUser', JSON.parse(result.response));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changeProfileAvatar(data: FormData) {
    try {
      const result = await UsersApi.changeProfileAvatar(data);
      if (isSuccessApi(result)) {
        store.set(
          'user.avatar',
          `https://ya-praktikum.tech/api/v2/resources${
            JSON.parse(result.response).avatar
          }`
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(data: ChangePasswordProps) {
    try {
      const response = await UsersApi.changePassword(data);
      if (isSuccessApi(response)) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const UsersControllerObject = new UsersController();
