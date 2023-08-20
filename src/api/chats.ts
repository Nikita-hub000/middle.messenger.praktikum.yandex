import HTTPTransport from '../utils/HTTPTransport';

export type CreateChatProps = {
  title: string;
};
export type DeleteChatProps = {
  chatId: number;
};

export type AddUserProps = {
  chatId: number;
  users: number[];
};

export type PostTokenProps = {
  id: number;
};

export type AddChatAvatarProps = {
  chatId: number;
  avatar: FormData;
};

const api = new HTTPTransport();
class ChatsApi {
  static async getChats() {
    const answer = await api.get('/chats');
    return answer;
  }

  static async createChat(data: CreateChatProps) {
    const answer = await api.post('/chats', {
      data,
      timeout: 5000,
    });
    return answer;
  }

  static async addUser(data: AddUserProps) {
    const answer = await api.put('/chats/users', {
      data,
      timeout: 5000,
    });
    return answer;
  }

  static async addChatAvatar(data: AddChatAvatarProps) {
    const answer = await api.put('/chats/avatar', {
      data,
      timeout: 5000,
    });
    return answer;
  }

  static async deleteUser(data: AddUserProps) {
    const answer = await api.delete('/chats/users', {
      data,
      timeout: 5000,
    });
    return answer;
  }

  static async deleteChat(data: DeleteChatProps) {
    const answer = await api.delete('/chats', {
      data,
      timeout: 5000,
    });
    return answer;
  }

  static async postToken(data: PostTokenProps) {
    const answer = await api.post(`/chats/token/${data.id}`, {
      timeout: 5000,
    });
    return answer;
  }
}

export default ChatsApi;
