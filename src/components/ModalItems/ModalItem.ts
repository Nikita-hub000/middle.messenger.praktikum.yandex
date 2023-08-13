import Block from '../../utils/Block';
import template from './ModalItem.hbs';

export type ModalItemProps = {
  img: string;
  text: string;
  class?: string;
  events?: {
    click: () => void;
  };
};

class ModalItemComponent extends Block {
  constructor(props: ModalItemProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ModalItemComponent;
