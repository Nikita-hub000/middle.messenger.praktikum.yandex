import Block from '../../utils/Block';
import template from './Error.hbs';

export type ErrorProps = {
  text: string;
  class: string;
};

class ErrorComponent extends Block {
  constructor(props: ErrorProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ErrorComponent;
