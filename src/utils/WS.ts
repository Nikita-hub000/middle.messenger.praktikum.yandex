import { store } from './Store';

export interface CustomMessage {
  id_chat: number;
  timestamp: string;
  msg_type: string;
  user_id_custom: number;
  content_custom: string;
  attached_file?: {
    file_id: number;
    user_id_custom: number;
    file_path: string;
    filename_custom: string;
    content_type_custom: string;
    content_size_custom: number;
    upload_date_custom: string;
  };
}

const customSocketMap: Map<number, WebSocket> = new Map();

const customNewConnect = async (chatId: number, token: string) => {
  if (customSocketMap.has(chatId)) {
    return;
  }

  const currentUserId = store.getState().user?.id;
  const socketUrl = 'wss://ya-praktikum.tech/ws/chats';
  const customSocket = new WebSocket(
    `${socketUrl}/${currentUserId}/${chatId}/${token}`
  );
  customSocketMap.set(chatId, customSocket);

  customSocket.addEventListener('open', () => {
    customSocket.send(JSON.stringify({ content: '0', type: 'get old' }));
  });

  customSocket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log(`Code: ${event.code} - Connection closed cleanly`);
    } else {
      console.log(`Code: ${event.code} - Connection break`);
    }

    customSocketMap.delete(chatId);
    clearInterval(customPing);
  });

  customSocket.addEventListener('error', (event: any) => {
    console.log('Error', event.message);
  });

  customSocket.addEventListener('message', (event) => {
    try {
      const customData = JSON.parse(event.data);

      if (customData.type && customData.type === 'pong') {
        return;
      }

      let customMessagesToAdd: CustomMessage[] = [];
      console.log(customData);
      if (Array.isArray(customData)) {
        customMessagesToAdd = customData.reverse();
      } else {
        customMessagesToAdd.push(customData);
      }

      const customMessageList = store.getState().messages?.[chatId];
      const customCurrentList: Record<number, any> = {};
      if (customMessageList) {
        customCurrentList[chatId] = [
          ...(customMessageList || {}),
          ...customMessagesToAdd,
        ];
      } else {
        customCurrentList[chatId] = [...customMessagesToAdd];
      }
      store.set('messages', { ...customCurrentList });
    } catch (e: any) {
      console.error(e);
    }
  });

  const customPing = setInterval(() => {
    customSocket.send(JSON.stringify({ type: 'ping' }));
  }, 10000);
};

const customSendMessage = (id: number, message: string) => {
  const customSocket = customSocketMap.get(id);
  if (customSocket) {
    customSocket.send(JSON.stringify({ type: 'message', content: message }));
  }
};

const customCloseSockets = () => {
  Array.from(customSocketMap.values()).forEach((customSocket) => {
    customSocket.close();
  });

  customSocketMap.clear();
};

export {
  customNewConnect as newConnect,
  customSendMessage as sendMessage,
  customCloseSockets as closeSockets,
};
