import Block from '../../utils/Block';
import template from './ButtonLine.hbs';

export type ButtonLineProps = {
  label: string;
  events: {
    click: (evt: PointerEvent) => void;
  };
};

class ButtonLine extends Block {
  constructor(props: ButtonLineProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ButtonLine;
