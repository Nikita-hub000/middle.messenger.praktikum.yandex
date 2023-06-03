import Block from '../../utils/Block';
import template from './profile.hbs';
import Popup, { PopupTypes } from '../../components/Popup/Popup';
import Button from '../../components/Button/Button';
import ImageComponent from '../../components/Image/Image';
import ButtonImage from '../../components/ButtonImage/ButtonImage';
import InputProfile from '../../components/InputProfile/InputProfile';
import validation, { FieldTypes } from '../../utils/Validation';

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
    this.children.buttonBack = new ButtonImage({
      class: 'chat__send-reverse',
      events: {
        click: (e) => {
          e.preventDefault();
          window.location.assign('/');
        },
      },
    });
    if (isEditPassword || isEditProfile) {
      this.children.buttonSave = new Button({
        label: 'Сохранить',
        events: {
          click: (e) => {
            e.preventDefault();
            const inputs = document.querySelectorAll('input');
            this.children.inputs.forEach((item, id) => {
              if (validation(FieldTypes[inputs[id].name], inputs[id].value)) {
                item.children.error.hide();
              } else {
                item.children.error.show();
              }
            });
          },
        },
      });
    }
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
    this.children.image = new ImageComponent({
      src: this.props.imageSrc,
      events: {
        click: (e) => {
          e.preventDefault();
          this.children.popupFile.show();
        },
      },
    });
    this.children.popupFile.hide();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;
