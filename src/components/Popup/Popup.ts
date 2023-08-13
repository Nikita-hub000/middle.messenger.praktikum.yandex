import Block from '../../utils/Block';
import validation, { FieldTypes } from '../../utils/Validation';
import Button, { ButtonProps } from '../Button/Button';
import Input from '../Input/Input';
import template from './Popup.hbs';

export enum PopupTypes {
  AGREEMENT = 'agreement',
  FORM_FILE = 'form-file',
  FORM_TEXT = 'form-text',
}
export type PopupProps = {
  title: string;
  type: string;
  btnText?: string;
  button?: ButtonProps;
  errorText?: string;
  events: {
    click: (evt: PointerEvent) => void;
  };
};

class Popup extends Block {
  constructor(props: PopupProps) {
    super(props);
  }

  protected init(): void {
    switch (this.props.type) {
      case PopupTypes.AGREEMENT:
        this.children.buttonYes = new Button({
          label: 'Да',
          events: this.props.events,
        });
        this.children.buttonNo = new Button({
          label: 'Нет',
          events: {
            click: (event) => {
              event.preventDefault();
              this.hide();
            },
          },
        });
        break;
      case PopupTypes.FORM_FILE:
        this.children.buttonFile = new Button(this.props.button);
        break;
      case PopupTypes.FORM_TEXT:
        this.children.input = new Input({
          name: 'login',
          label: 'Логин',
          type: 'text',
          errorText: 'Неверный формат логина',
          events: {
            focusin: (e) => {
              e.preventDefault();
            },
            focusout: (e) => {
              e.preventDefault();
            },
          },
          value: '',
        });
        this.children.buttonText = new Button(this.props.button);
        break;

      default:
        break;
    }
    document.addEventListener('click', (e) => {
      if (Array.from(e.target.classList).includes('popup')) {
        this.hide();
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Popup;
