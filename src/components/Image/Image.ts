import Block from '../../utils/Block';
import template from './Image.hbs';

export type ImageProps = {
  src: string;
  events: {
    click: (evt: PointerEvent) => void;
  };
  default: boolean;
};

class ImageComponent extends Block {
  constructor(props: ImageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ImageComponent;
