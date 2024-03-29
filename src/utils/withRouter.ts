import Block from './Block';
import Router from './Router';
import { router } from '../router';

type WithRouterProps = { router: Router };

export function withRouter<P extends WithRouterProps>(WrappedBlock: Block<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName =
      WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router });
    }
  } as Block<Omit<P, 'router'>>;
}
