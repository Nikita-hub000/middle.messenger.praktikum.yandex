export enum FieldTypes {
  first_name = 'first_name',
  second_name = 'second_name',
  login = 'login',
  password = 'password',
  newPassword = 'newPassword'
  oldPassword = 'oldPassword'
  email = 'email',
  phone = 'phone',
  message = 'message',
  display_name = 'display_name',
}

const nameRegex =
  /^(?!.*\d)(?!.*\s)(?!.*[-]{2})[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё-]*$/;

const loginRegex = /^(?!-|_)[A-Za-z0-9-_.]{3,20}(?<!-|_)$/;

const emailRegex =
  /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z]+([.-][A-Za-z]+)*\.[A-Za-z]+$/;

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;

const phoneRegex = /^\+?\d{10,15}$/;

const messageRegex = /\S+/;

const validation = (field: FieldTypes, value: string): boolean | void => {
  switch (field) {
    case FieldTypes.first_name:
      return nameRegex.test(value);

    case FieldTypes.display_name:
      return nameRegex.test(value);

    case FieldTypes.second_name:
      return nameRegex.test(value);

    case FieldTypes.password:
      return passwordRegex.test(value);

      case FieldTypes.oldPassword:
        return passwordRegex.test(value);

      case FieldTypes.newPassword:
          return passwordRegex.test(value);


    case FieldTypes.message:
      return messageRegex.test(value);

    case FieldTypes.email:
      return emailRegex.test(value);

    case FieldTypes.phone:
      return phoneRegex.test(value);

    case FieldTypes.login:
      return loginRegex.test(value);

    default:
      break;
  }
};

export default validation;
