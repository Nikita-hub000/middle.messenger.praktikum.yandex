import ChatsApi, {
  AddUserProps,
  CreateChatProps,
  DeleteChatProps,
} from '../api/chats';
import { isSuccessApi } from '../helpers/api';
import { store } from '../utils/Store';
import { newConnect } from '../utils/WS';

class ChatsController {
  async createChat(data: CreateChatProps) {
    try {
      const result = await ChatsApi.createChat(data);
      if (isSuccessApi(result)) {
        await this.getChats();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getChats() {
    try {
      const result = await ChatsApi.getChats();
      if (isSuccessApi(result)) {
        JSON.parse(result.response).forEach(async (data) => {
          const token = (await ChatsApi.postToken(data)) as any;
          await newConnect(data.id, JSON.parse(token.response).token);
        });
        store.set('chats.menu', JSON.parse(result.response));
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  async addUser(data: AddUserProps) {
    try {
      await ChatsApi.addUser(data);
      //   if (isSuccessApi(result)) {
      //     store.set('chats.menu', JSON.parse(result.response));
      //   }
    } catch (e: any) {
      console.log(e);
    }
  }

  async deleteUser(data: AddUserProps) {
    try {
      await ChatsApi.deleteUser(data);
      //   if (isSuccessApi(result)) {
      //     store.set('chats.menu', JSON.parse(result.response));
      //   }
    } catch (e: any) {
      console.log(e);
    }
  }

  async deleteChat(data: DeleteChatProps) {
    try {
      await ChatsApi.deleteChat(data);
    } catch (e: any) {
      console.log(e);
    }
  }
}

export const ChatsControllerObject = new ChatsController();
