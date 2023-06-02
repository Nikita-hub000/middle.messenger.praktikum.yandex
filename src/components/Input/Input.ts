import Block from '../../utils/Block';
import validation, { FieldTypes } from '../../utils/Validation';
import ErrorComponent from '../Error/Error';
import template from './Input.hbs';

export type InputProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  errorText?: string;
  events: {
    change: (evt) => void;
  };
};

class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  protected init() {
    this.props.events = {
      focusin: (e) => {
        if (validation(FieldTypes[this.props.name], e.target.value)) {
          this.children.error.hide();
        } else {
          this.children.error.show();
        }
      },
      focusout: (e) => {
        if (validation(FieldTypes[this.props.name], e.target.value)) {
          this.children.error.hide();
        } else {
          this.children.error.show();
        }
      },
    };
    this.children.error = new ErrorComponent({
      text: this.props.errorText,
      class: 'auth__error',
    });
    this.children.error.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
