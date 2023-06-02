import Block from '../../utils/Block';
import validation, { FieldTypes } from '../../utils/Validation';
import ErrorComponent from '../Error/Error';
import template from './InputProfile.hbs';

export type InputProfileProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  errorText?: string;
  events: {
    focusin: () => void;
    focusout: () => void;
  };
};

class InputProfile extends Block {
  constructor(props: InputProfileProps) {
    super(props);
  }

  protected init() {
    this.children.error = new ErrorComponent({
      text: this.props.errorText,
      class: 'form__error',
    });
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
    this.children.error.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default InputProfile;
