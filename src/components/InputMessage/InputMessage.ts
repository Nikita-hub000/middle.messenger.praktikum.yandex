import Block from '../../utils/Block';
import validation, { FieldTypes } from '../../utils/Validation';
import ButtonImage from '../ButtonImage/ButtonImage';
import ErrorComponent from '../Error/Error';
import template from './InputMessage.hbs';

export type InputMessageProps = {
  events: {
    focusin: (evt) => void;
    focusout: (evt) => void;
  };
};

class InputMessage extends Block {
  constructor(props: InputMessageProps) {
    super(props);
  }

  protected init() {
    this.children.button = new ButtonImage({
      class: 'chat__send',
      events: {
        click: this.props.events.click,
      },
    });
    this.props.events = {
      focusin: (e) => {
        if (validation(FieldTypes.message, e.target.value)) {
          this.children.error.hide();
        } else {
          this.children.error.show();
        }
      },
      focusout: (e) => {
        if (validation(FieldTypes.message, e.target.value)) {
          this.children.error.hide();
        } else {
          this.children.error.show();
        }
      },
    };
    this.children.error = new ErrorComponent({
      text: 'Сообщение не может быть пустым',
      class: 'chat__error',
    });
    this.children.error.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default InputMessage;
