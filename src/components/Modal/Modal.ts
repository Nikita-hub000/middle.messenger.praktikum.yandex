import Block from '../../utils/Block';
import ModalItemComponent, { ModalItemProps } from '../ModalItems/ModalItem';
import template from './Modal.hbs';

export type ModalProps = {
  position: string;
  items: ModalItemProps[];
};

class Modal extends Block {
  constructor(props: ModalProps) {
    super(props);
  }

  protected init(): void {
    this.children.items = this.props.items.map(
      (prop: ModalItemProps) => new ModalItemComponent(prop)
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Modal;
