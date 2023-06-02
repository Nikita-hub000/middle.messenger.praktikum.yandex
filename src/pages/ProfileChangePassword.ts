import ProfilePage from '../layouts/profile/profile';
import registerHelpers from '../utils/RegisterHelpers';

registerHelpers();

const EditPassword = new ProfilePage({
  isEditPassword: true,
  isEditProfile: false,
  imageSrc: '../asserts/profile-default-img.svg',
  userInfo: [
    {
      label: 'Старый пароль',
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
    {
      label: 'Новый пароль',
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
});

export default EditPassword;
