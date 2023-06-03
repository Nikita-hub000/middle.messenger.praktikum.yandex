import Button, { ButtonProps } from '../../components/Button/Button';
import Input, { InputProps } from '../../components/Input/Input';
import Block from '../../utils/Block';
import validation, { FieldTypes } from '../../utils/Validation';
import template from '../auth-form/auth-form.hbs';

type AuthForm = {
  inputs: InputProps[];
  button: ButtonProps;
  title: string;
  linkHref: string;
  linkText: string;
};

class LoginPage extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: AuthForm) {
    super(props);
  }

  protected init(): void {
    this.children.fields = this.props.inputArray.map(
      (props: InputProps) => new Input(props)
    );
    this.props.button.events = {
      click: (e) => {
        e.preventDefault();
        const inputs = document.querySelectorAll('input');
        this.children.fields.forEach((item, id) => {
          if (validation(FieldTypes[inputs[id].name], inputs[id].value)) {
            item.children.error.hide();
          } else {
            item.children.error.show();
          }
        });
      },
    };
    this.children.button = new Button(this.props.button);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default LoginPage;
