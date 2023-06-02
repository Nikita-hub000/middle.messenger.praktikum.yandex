import Block from '../../utils/Block';
import template from './main.hbs';
import ChatsComponent, { ChatProps } from './chats/chats';
import MessageComponent, { CurrentChatProps } from './messages/messages';
import Popup, { PopupTypes } from '../../components/Popup/Popup';
import InputMessage from '../../components/InputMessage/InputMessage';
import ButtonImage from '../../components/ButtonImage/ButtonImage';
import Modal from '../../components/Modal/Modal';
// import parseData from '../../utils/ParseDate';

export type MainPageProps = {
  chats: ChatProps[];
  current: CurrentChatProps;
};

class MainPage extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MainPageProps) {
    super(props);
  }

  protected init(): void {
    this.children.chats = this.props.chats.map((props: ChatProps) => {
      props.events.click = (event) => {
        event.preventDefault();
        const { current, ...oldProps } = this.props;
        this.setProps({
          current: {
            id: props.id,
            name: this.props.chats.find((item) => item.id === props.id)?.name,
            messages: this.props.chats.find((item) => item.id === props.id)
              ?.messages,
          },
          ...oldProps,
        });
        // const arrData = parseData(this.props.current.messages);
        this.children.messages = this.props.current.messages.map(
          (props) => new MessageComponent(props)
        );
        // this.children.messageContainer = arrData;
        this.dispatchComponentDidUpdate();
      };
      return new ChatsComponent(props);
    });
    this.children.input = new InputMessage({
      events: {
        click: () => {},
      },
    });
    this.children.popupAgreement = new Popup({
      title: 'Вы уверены?',
      type: PopupTypes.AGREEMENT,
      events: {
        click: (event) => {
          event.preventDefault();
        },
      },
    });
    this.children.popupAddUser = new Popup({
      title: 'Добавить пользователя',
      type: PopupTypes.FORM_TEXT,
      button: {
        label: 'Добавить',
        events: {
          click: () => {},
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
          click: () => {},
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
          window.location.assign('/profile');
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
          img: '../asserts/add.svg',
          text: 'Фото или Видео',
        },
        {
          img: '../asserts/add.svg',
          text: 'Файл',
        },
        {
          img: '../asserts/add.svg',
          text: 'Локация',
        },
      ],
    });
    this.children.modalMenu = new Modal({
      position: 'bottom',
      items: [
        {
          img: '../asserts/add.svg',
          text: 'Добавить пользователя',
          events: {
            click: (e) => {
              e.preventDefault();
              this.children.popupAddUser.show();
            },
          },
        },
        {
          img: '../asserts/add.svg',
          text: 'Удалить пользователя',
          events: {
            click: (e) => {
              e.preventDefault();
              this.children.popupDeleteUser.show();
            },
          },
        },
        {
          img: '../asserts/add.svg',
          text: 'Удалить чат',
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
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MainPage;
