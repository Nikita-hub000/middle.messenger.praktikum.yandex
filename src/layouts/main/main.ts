import Block from '../../utils/Block';
import template from './main.hbs';
import ChatsComponent, { ChatProps } from './chats/chats';
import MessageComponent, { CurrentChatProps } from './messages/messages';
import Popup, { PopupTypes } from '../../components/Popup/Popup';
import InputMessage from '../../components/InputMessage/InputMessage';
import ButtonImage from '../../components/ButtonImage/ButtonImage';
import Modal from '../../components/Modal/Modal';
import { router } from '../../router';
import { ChatsControllerObject } from '../../controllers/chats';
import { store } from '../../utils/Store';
import { AuthControllerObject } from '../../controllers/auth';
import ChatsApi from '../../api/chats';
import { UsersControllerObject } from '../../controllers/users';
import validation, { FieldTypes } from '../../utils/Validation';
import modalImg from '../../../asserts/modal-image.svg';
import modalFile from '../../../asserts/modal-file.svg';
import modalLocation from '../../../asserts/modal-location.svg';
import { sendMessage } from '../../utils/WS';
import addImg from '../../../asserts/add.svg';

export type MainPageProps = {
  chats: ChatProps[];
  current: CurrentChatProps;
};

class MainPage extends Block {
  private firstRenderCompleted: boolean;
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MainPageProps) {
    super(props);
    this.firstRenderCompleted = false;
  }

  protected init(): void {
    this.children.chats = [];
    this.children.input = new InputMessage({
      events: {
        click: (e) => {
          e.preventDefault();
          if (
            validation(
              FieldTypes.message,
              document.querySelector('.chat__input').value
            )
          ) {
            const input = document.querySelector(
              '.chat__input'
            ) as HTMLInputElement;
            const { current, ...oldProps } = this.props;
            sendMessage(current.id, input.value);
            input.value = '';
            this.setProps({
              current: {
                id: current.id,
                name: current.name,
                messages: store.getState().messages?.[current.id] || [],
              },
              ...oldProps,
            });
            this.firstRenderCompleted = false;
            this.dispatchComponentDidMount();

            this.children.input.children.error.hide();
          } else {
            this.children.input.children.error.show();
          }
        },
      },
    });
    this.children.popupAgreement = new Popup({
      title: 'Вы уверены?',
      type: PopupTypes.AGREEMENT,
      events: {
        click: async (event) => {
          event.preventDefault();
          const { current, ...oldProps } = this.props;
          await ChatsApi.deleteChat({ chatId: current.id });
          this.setProps({
            current: {
              id: '0',
              name: '',
              messages: [],
            },
            ...oldProps,
          });
          this.children.popupAgreement.hide();
          this.firstRenderCompleted = false;
          this.dispatchComponentDidMount();
        },
      },
    });
    this.children.popupAddUser = new Popup({
      title: 'Добавить пользователя',
      type: PopupTypes.FORM_TEXT,
      button: {
        label: 'Добавить',
        events: {
          click: async (e) => {
            e.preventDefault();
            await UsersControllerObject.searchUser({
              login: event.target.form[0].value,
            });
            await ChatsControllerObject.addUser({
              chatId: this.props.current.id,
              users: [store.getState()?.chats?.findUser[0].id],
            });
            this.children.popupAddUser.hide();
          },
        },
      },
      events: {
        click: (e) => {
          e.preventDefault();
        },
      },
    });

    this.children.popupAddChat = new Popup({
      title: 'Создать чат',
      type: PopupTypes.FORM_TEXT,
      button: {
        label: 'Создать',
        events: {
          click: async (event) => {
            event.preventDefault();
            if (event.target.form[0].value) {
              await ChatsApi.createChat({ title: event.target.form[0].value });
              this.children.popupAddChat.hide();
              this.firstRenderCompleted = false;
              this.dispatchComponentDidMount();
            }
          },
        },
      },
      events: {
        click: (e) => {
          e.preventDefault();
        },
      },
    });
    this.children.popupDeleteUser = new Popup({
      title: 'Удалить пользователя',
      type: PopupTypes.FORM_TEXT,
      button: {
        label: 'Удалить',
        events: {
          click: async (e) => {
            e.preventDefault();
            await UsersControllerObject.searchUser({
              login: event.target.form[0].value,
            });
            await ChatsControllerObject.deleteUser({
              chatId: this.props.current.id,
              users: [store.getState()?.chats?.findUser[0].id],
            });
            this.children.popupDeleteUser.hide();
          },
        },
      },
      events: {
        click: (e) => {
          e.preventDefault();
        },
      },
    });
    this.children.buttonProfile = new ButtonImage({
      class: 'main-page__image',
      events: {
        click: (e) => {
          e.preventDefault();
          router.go('/settings');
        },
      },
    });
    this.children.buttonAttach = new ButtonImage({
      class: 'chat__attach',
      events: {
        click: (e) => {
          e.preventDefault();
          this.children.modalAttach.element.style.display === 'flex'
            ? this.children.modalAttach.hide()
            : this.children.modalAttach.show();
        },
      },
    });
    this.children.buttonAddChat = new ButtonImage({
      class: 'chat__add',
      events: {
        click: (e) => {
          e.preventDefault();
          this.children.popupAddChat.show();
        },
      },
    });
    this.children.buttonMenu = new ButtonImage({
      class: 'chat__menu',
      events: {
        click: (e) => {
          e.preventDefault();
          this.children.modalMenu.element.style.display === 'flex'
            ? this.children.modalMenu.hide()
            : this.children.modalMenu.show();
        },
      },
    });
    this.children.modalAttach = new Modal({
      position: 'top',
      items: [
        {
          img: modalImg,
          text: 'Фото или Видео',
        },
        {
          img: modalFile,
          text: 'Файл',
        },
        {
          img: modalLocation,
          text: 'Локация',
        },
      ],
    });
    this.children.modalMenu = new Modal({
      position: 'bottom',
      items: [
        {
          img: addImg,
          text: 'Добавить пользователя',
          class: 'modal__add',
          events: {
            click: (e) => {
              e.preventDefault();
              this.children.popupAddUser.show();
            },
          },
        },
        {
          img: addImg,
          text: 'Удалить пользователя',
          class: 'modal__delete',
          events: {
            click: (e) => {
              e.preventDefault();
              this.children.popupDeleteUser.show();
            },
          },
        },
        {
          img: addImg,
          text: 'Удалить чат',
          class: 'modal__delete',
          events: {
            click: (e) => {
              e.preventDefault();
              this.children.popupAgreement.show();
            },
          },
        },
      ],
    });
    this.children.popupAgreement.hide();
    this.children.modalMenu.hide();
    this.children.modalAttach.hide();
    this.children.popupAddUser.hide();
    this.children.popupDeleteUser.hide();
    this.children.popupAddChat.hide();
  }

  async getChats(): ChatProps[] {
    await ChatsControllerObject.getChats();
    await AuthControllerObject.getUserInfo();

    const userInfo = store.getState()?.user;
    const chatsInfo = store.getState()?.chats?.menu;
    const propsChats = [];
    const { current, ...oldProps } = this.props;
    const messages = store.getState().messages?.[current.id];
    if (chatsInfo) {
      for (let i = 0; i < chatsInfo.length; i++) {
        const propsObj: ChatProps = {
          id: chatsInfo[i].id,
          name: chatsInfo[i].title,
          unread: chatsInfo[i].unread_count,
          fromMe: chatsInfo[i]?.last_message?.user?.login === userInfo.login,
          time:
            new Date(chatsInfo[i]?.last_message?.time || '').toLocaleTimeString(
              [],
              {
                hour: '2-digit',
                minute: '2-digit',
              }
            ) || '',
          text: chatsInfo[i]?.last_message?.content || '',
          events: {
            click: (event) => {
              event.preventDefault();
              this.setProps({
                current: {
                  id: chatsInfo[i].id,
                  name: chatsInfo[i].title,
                  messages,
                },
                ...oldProps,
              });
              console.log(0);
              this.firstRenderCompleted = false;
              this.dispatchComponentDidMount();
            },
          },
        };
        propsChats.push(propsObj);
      }
      return propsChats;
    }
  }

  protected async componentDidMount() {
    if (this.firstRenderCompleted) {
      return;
    }
    const chats = await this.getChats();
    const messages = store.getState().messages?.[this.props.current.id] || [];

    this.firstRenderCompleted = true;

    this.children.chats = chats.map((chatProps: ChatProps) => {
      return new ChatsComponent(chatProps);
    });
    this.children.messages = messages.map((props) => {
      props.fromMe = props.user_id === store.getState()?.user.id;
      props.date =
        new Date(props.time || '').toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }) || '';
      return new MessageComponent(props);
    });

    this.dispatchComponentDidUpdate();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MainPage;
