import Block from '../../utils/Block';
import ModalItemComponent, { ModalItemProps } from '../ModalItem/ModalItem';
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
    document.addEventListener('click', (e) => {
      // if (
      //   this.element.style.display === 'flex' &&
      //   e.target.classList[0].slice(0, 5) !== 'modal'
      // ) {
      //   this.hide();
      // }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Modal;
