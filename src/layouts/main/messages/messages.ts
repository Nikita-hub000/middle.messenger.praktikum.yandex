import Block from '../../../utils/Block';
import template from './messages.hbs';
import readImg from '../../../../asserts/two-marks.svg';

export type MessageProps = {
  content?: string;
  file?: string;
  date: string;
  fromMe: boolean;
  imgRead: string;
  is_read: boolean;
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
    this.props.imgRead = readImg;
    return this.compile(template, this.props);
  }
}

export default MessageComponent;
