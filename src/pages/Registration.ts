import LoginPage from '../layouts/auth-form/auth-form';

const Registration = new LoginPage({
  title: 'Регистрация',
  inputArray: [
    {
      name: 'email',
      label: 'Почта',
      type: 'email',
      errorText: 'Неверный формат почты',
      events: {
        click: (event) => {
          event.preventDefault();
        },
      },
      value: '',
    },
    {
      name: 'login',
      label: 'Логин',
      type: 'text',
      errorText: 'Неверный формат логина',
      events: {
        click: (event) => {
          event.preventDefault();
        },
      },
      value: '',
    },
    {
      name: 'first_name',
      label: 'Имя',
      type: 'text',
      errorText: 'Неверный формат имени',
      events: {
        change: (event) => {
          event.preventDefault();
        },
      },
      value: '',
    },
    {
      name: 'second_name',
      label: 'Фамилия',
      type: 'text',
      errorText: 'Неверный формат фамилии',
      events: {
        click: (event) => {
          event.preventDefault();
        },
      },
      value: '',
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'tel',
      errorText: 'Неверный формат телефона',
      events: {
        click: (event) => {
          event.preventDefault();
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
    {
      name: 'password',
      label: 'Пароль (еще раз)',
      type: 'password',
      errorText: 'Неверный формат пароля',
      events: {
        change: () => {},
      },
      value: '',
    },
  ],
  button: {
    label: 'Зарегистрироваться',
    events: {
      click: (e) => {
        e.preventDefault();
      },
    },
  },
  linkHref: '/login',
  linkText: 'Уже есть аккаунт?',
});

export default Registration;
