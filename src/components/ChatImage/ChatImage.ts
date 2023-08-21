import Block from '../../utils/Block';
import InputAvatar from '../InputAvatar/InputAvatar';
import template from './ChatImage.hbs';

export type ChatImageProps = {
  src: string;
  events: {
    click: (evt: PointerEvent) => void;
    change: (evt: any) => void;
  };
  default: boolean;
  isSide: boolean;
};

class ChatImageComponent extends Block {
  constructor(props: ChatImageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatImageComponent;
