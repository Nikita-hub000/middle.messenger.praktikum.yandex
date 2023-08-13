import Button, { ButtonProps } from '../../components/Button/Button';
import Input, { InputProps } from '../../components/Input/Input';
import Block from '../../utils/Block';
import validation, { FieldTypes } from '../../utils/Validation';
import template from '../auth-form/auth-form.hbs';
import { SignUpProps } from '../../api/auth';
import { AuthControllerObject } from '../../controllers/auth';

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
        let counterCorrect = 0;
        this.children.fields.forEach((item, id) => {
          if (validation(FieldTypes[inputs[id].name], inputs[id].value)) {
            item.children.error.hide();
            counterCorrect += 1;
          } else {
            item.children.error.show();
          }
        });
        if (counterCorrect === inputs.length) {
          const data = Array.from(inputs).reduce((acc, item) => {
            acc[item.name] = item.value;
            return acc;
          }, {} as SignUpProps);
          if (counterCorrect === 7) {
            AuthControllerObject.signup(data);
          }
          if (counterCorrect === 2) {
            AuthControllerObject.signin(data);
          }
        }
      },
    };
    this.children.button = new Button(this.props.button);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default LoginPage;
