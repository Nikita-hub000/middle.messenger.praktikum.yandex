import ChatImageComponent from '../../../components/ChatImage/ChatImage';
import Block from '../../../utils/Block';
import { MessageProps } from '../messages/messages';
import template from './chats.hbs';

export type ChatProps = {
  id: string;
  name: string;
  time: string;
  fromMe: boolean;
  unread: number;
  text: string;
  avatar: string;
  messages: MessageProps[];
  events: {
    click: (event: PointerEvent) => void;
  };
};

class ChatsComponent extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatProps) {
    super(props);
  }

  protected init(): void {
    this.children.chatAvatar = new ChatImageComponent({
      src: this.props.avatar,
      default: !this.props.avatar,
      isSide: true,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatsComponent;
