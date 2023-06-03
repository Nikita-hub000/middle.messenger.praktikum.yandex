import Block from '../../utils/Block';
import template from './ButtonImage.hbs';

export type ButtonImageProps = {
  class: string;
  events: {
    click: (evt: PointerEvent) => void;
  };
};

class ButtonImage extends Block {
  constructor(props: ButtonImageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ButtonImage;
