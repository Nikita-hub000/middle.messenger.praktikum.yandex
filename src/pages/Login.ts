import LoginPage from '../layouts/auth-form/auth-form';
import validation, { FieldTypes } from '../utils/Validation';

const Login = new LoginPage({
  title: 'Вход',
  inputArray: [
    {
      name: 'login',
      label: 'Логин',
      type: 'text',
      errorText: 'Неверный формат логина',
      events: {
        focusin: (e) => {
          e.preventDefault();
          validation(FieldTypes.login, e.target.value);
        },
        focusout: (e) => {
          e.preventDefault();
        },
      },
      value: '',
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      errorText: 'Неверный формат пароля',
      events: {
        change: () => {},
      },
      value: '',
    },
  ],
  button: {
    label: 'Войти',
    events: {
      click: (e) => {
        e.preventDefault();
      },
    },
  },
  linkHref: '/registration',
  linkText: 'Еще нет аккаунта?',
});

export default Login;
