import ProfilePage from '../layouts/profile/profile';
import registerHelpers from '../utils/RegisterHelpers';

registerHelpers();

const EditInfo = new ProfilePage({
  isEditPassword: false,
  isEditProfile: true,
  imageSrc: '../asserts/profile-default-img.svg',
  userInfo: [
    {
      label: 'Почта',
      name: 'email',
      type: 'email',
      disabled: false,
      value: 'aaa@gmail.com',
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
      value: 'Ivan',
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
      value: 'Ivan',
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
      value: 'Pupkin',
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
      value: 'Ivan1234',
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
      value: '+7987654321',
      errorText: 'Неверный формат телефона',
      events: {
        focusin: () => {},
        focusout: () => {},
      },
    },
  ],
});

export default EditInfo;
