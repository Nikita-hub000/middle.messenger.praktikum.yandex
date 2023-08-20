import Router from './utils/Router';

export const router = new Router('#app');

import Login from './pages/Login';
import validation, { FieldTypes } from './utils/Validation';
import MainPage from './pages/Home';
import ProfilePage from './pages/Profle';
import ErrorPage from './pages/Error';

export function initRouter() {
  return router
    .use({
      pathname: '/',
      block: Login,
      props: {
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
        linkHref: '/sign-up',
        linkText: 'Еще нет аккаунта?',
      },
      needAuth: false,
    })
    .use({
      pathname: '/sign-up',
      block: Login,
      props: {
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
        linkHref: '/',
        linkText: 'Уже есть аккаунт?',
      },
    })
    .use({
      pathname: '/messenger',
      block: MainPage,
      props: {
        current: {
          id: '0',
          name: '',
          messages: [],
        },
        chats: [],
      },
    })
    .use({
      pathname: '/settings',
      block: ProfilePage,
      props: {
        isEditPassword: false,
        isEditProfile: false,
        imageSrc: '../asserts/profile-default-img.svg',
        userInfo: [
          {
            label: 'Почта',
            name: 'email',
            type: 'email',
            disabled: true,
            value: '',
            errorText: 'Неверный формат почты',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Логин',
            name: 'login',
            type: 'text',
            disabled: true,
            value: '',
            errorText: 'Неверный формат логина',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            disabled: true,
            value: '',
            errorText: 'Неверный формат имени',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            disabled: true,
            value: '',
            errorText: 'Неверный формат фамилии',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            disabled: true,
            value: '',
            errorText: 'Неверный формат имени',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Телефон',
            name: 'phone',
            type: 'tel',
            disabled: true,
            value: '',
            errorText: 'Неверный формат телефона',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
        ],
      },
      needAuth: true,
      redirectPath: '/',
      onUnautorized: () => true,
    })
    .use({
      pathname: '/settings/info',
      block: ProfilePage,
      props: {
        isEditPassword: false,
        isEditProfile: true,
        imageSrc: '../asserts/profile-default-img.svg',
        userInfo: [
          {
            label: 'Почта',
            name: 'email',
            type: 'email',
            disabled: false,
            value: '',
            errorText: 'Неверный формат почты',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Логин',
            name: 'login',
            type: 'text',
            disabled: false,
            value: '',
            errorText: 'Неверный формат логина',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            disabled: false,
            value: '',
            errorText: 'Неверный формат имени',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            disabled: false,
            value: '',
            errorText: 'Неверный формат фамилии',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            disabled: false,
            value: '',
            errorText: 'Неверный формат имени',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Телефон',
            name: 'phone',
            type: 'tel',
            disabled: false,
            value: '',
            errorText: 'Неверный формат телефона',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
        ],
      },
      needAuth: true,
      redirectPath: '/',
      onUnautorized: () => true,
    })
    .use({
      pathname: '/settings/password',
      block: ProfilePage,
      props: {
        isEditPassword: true,
        isEditProfile: false,
        imageSrc: '../asserts/profile-default-img.svg',
        userInfo: [
          {
            label: 'Старый пароль',
            name: 'oldPassword',
            type: 'password',
            disabled: false,
            errorText: 'Неверный пароль',
            value: '',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Новый пароль',
            name: 'newPassword',
            type: 'password',
            disabled: false,
            errorText: 'Неверный пароль',
            value: '',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
          {
            label: 'Повторите новый пароль',
            name: 'password',
            type: 'password',
            disabled: false,
            errorText: 'Неверный пароль',
            value: '',
            events: {
              focusin: () => {},
              focusout: () => {},
            },
          },
        ],
      },
    })
    .use({
      pathname: '/error-400',
      block: ErrorPage,
      props: {
        number: '400',
        description: 'Не туда попали',
      },
    })
    .use({
      pathname: '/error-500',
      block: ErrorPage,
      props: {
        number: '500',
        description: 'Мы уже фиксим',
      },
    })
    .start();
}
