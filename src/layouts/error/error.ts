import Block from '../../utils/Block';
import template from './error.hbs';

type Error = {
  number: string;
  description: string;
};

class ErrorPage extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: Error) {
    super(props);
  }

  //   protected init(): void {
  //     this.children.number = this.props.number
  //     this.children.description = this.props.description
  //   }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ErrorPage;
