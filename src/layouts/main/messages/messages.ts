import Block from '../../../utils/Block';
import template from './messages.hbs';

export type MessageProps = {
  text?: string;
  image?: string;
  time: string;
  fromMe: boolean;
};

export type CurrentChatProps = {
  id: string;
  name: string;
  messages: MessageProps[];
  image?: string;
};

class MessageComponent extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessageComponent;
