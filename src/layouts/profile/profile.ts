import Block from '../../utils/Block';
import template from './profile.hbs';
import Popup, { PopupTypes } from '../../components/Popup/Popup';
import Button from '../../components/Button/Button';
import ImageComponent from '../../components/Image/Image';
import ButtonImage from '../../components/ButtonImage/ButtonImage';
import InputProfile from '../../components/InputProfile/InputProfile';
import validation, { FieldTypes } from '../../utils/Validation';
import { router } from '../../router';
import ButtonLine from '../../components/ButtonLine/ButtonLine';
import { AuthControllerObject } from '../../controllers/auth';
import { store } from '../../utils/Store';
import { UsersControllerObject } from '../../controllers/users';
import { ChangePasswordProps, ChangeProfileProps } from '../../api/users';
import InputAvatar from '../../components/InputAvatar/InputAvatar';
import defaultImg from '../../../asserts/profile-default-img.svg';

export type UserInfo = {
  label: string;
  name: string;
  type: string;
  disabled: boolean;
  value: string;
  errorText: string;
  events: {
    focusin: () => void;
    focusout: () => void;
  };
};

export type ProfilePageProps = {
  isEditPassword: boolean;
  isEditProfile: boolean;
  imageSrc: string;
  userInfo?: UserInfo[];
};

class ProfilePage extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ProfilePageProps) {
    super(props);
  }

  protected init(): void {
    const { isEditPassword, isEditProfile } = this.props;
    this.children.inputs = this.props.userInfo.map(
      (item: UserInfo) => new InputProfile(item)
    );
    this.children.inputAvatar = new InputAvatar({
      events: {
        change: (e: Event) => this.changeImg(e),
      },
    });

    this.children.buttonBack = new ButtonImage({
      class: 'chat__send-reverse',
      events: {
        click: (e) => {
          e.preventDefault();
          router.back();
        },
      },
    });
    this.children.buttonExit = new ButtonLine({
      label: 'Выйти',
      events: {
        click: (e) => {
          e.preventDefault();
          AuthControllerObject.logout();
        },
      },
    });
    if (isEditProfile) {
      this.children.buttonSave = new Button({
        label: 'Сохранить',
        events: {
          click: async (e) => {
            e.preventDefault();
            let error = false;
            const inputs = document.querySelectorAll('input');
            const data = Array.from(inputs).reduce((acc, item) => {
              acc[item.name] = item.value;
              return acc;
            }, {} as ChangeProfileProps);

            this.children.inputs.forEach((item, id) => {
              if (validation(FieldTypes[inputs[id].name], inputs[id].value)) {
                item.children.error.hide();
                error = false;
              } else {
                item.children.error.show();
                error = true;
              }
            });
            if (!error) {
              await UsersControllerObject.changeProfile(data);
              this.dispatchComponentDidMount();
            }
          },
        },
      });
    }
    if (isEditPassword) {
      this.children.buttonSave = new Button({
        label: 'Сохранить',
        events: {
          click: (e) => {
            e.preventDefault();
            let error = false;
            const inputs = document.querySelectorAll('input');
            const data = Array.from(inputs).reduce((acc, item) => {
              if (item.name === 'oldPassword' || item.name === 'newPassword') {
                console.log(item.name);
                acc[item.name] = item.value;
              }
              return acc;
            }, {} as ChangePasswordProps);
            this.children.inputs.forEach((item, id) => {
              if (validation(FieldTypes[inputs[id].name], inputs[id].value)) {
                item.children.error.hide();
                error = false;
              } else {
                item.children.error.show();
                error = true;
              }
            });

            if (!error) {
              if (inputs[1].value !== inputs[2].value) {
                this.children.inputs[2].children.error.show();
              } else {
                this.children.inputs[2].children.error.hide();
                UsersControllerObject.changePassword(data);
              }
            }
          },
        },
      });
    }
    this.children.image = new ImageComponent({
      src: defaultImg,
      default: true,
      events: {
        click: (e) => {
          e.preventDefault();
          const avatar = document.getElementById('avatar');
          avatar?.click();
        },
      },
    });
    this.children.popupFile = new Popup({
      title: 'Загрузите файл',
      type: PopupTypes.FORM_FILE,
      button: {
        label: 'Поменять',
        events: {
          click: () => {},
        },
      },
      events: {
        click: (e) => {
          e.preventDefault();
        },
      },
    });
    this.children.popupFile.hide();
  }
  changeImg(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append('avatar', file);
      console.log(formData.entries);

      UsersControllerObject.changeProfileAvatar(formData);
    }
  }

  async componentDidMount(): Promise<void> {
    await AuthControllerObject.getUserInfo();
    const info = store.getState()?.user;
    console.log(info);
    if (info) {
      console.log(store.getState()?.user);
      this.children.image.setProps({
        src: info.avatar,
        default: !info.avatar,
      });

      this.children.inputs.forEach((element) => {
        const { value, ...propsElement } = element.props;
        if (!!info[element.props.name]) {
          element.setProps({ value: info[element.props.name], propsElement });
        }
      });
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;
