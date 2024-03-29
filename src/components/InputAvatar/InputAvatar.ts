import Block from '../../utils/Block';
import template from './InputAvatar.hbs';

export type InputAvatarProps = {
  events?: {
    change: () => void;
  };
  chatId?: number;
  isChat?: boolean;
};

class InputAvatar extends Block {
  constructor(props: InputAvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default InputAvatar;
