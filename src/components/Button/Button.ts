import Block from '../../utils/Block';
import template from './Button.hbs';

export type ButtonProps = {
  label: string;
  events: {
    click: (evt: PointerEvent) => void;
  };
};

class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Button;
