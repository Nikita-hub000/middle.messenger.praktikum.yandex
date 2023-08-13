/* eslint-disable max-classes-per-file */
// import { State } from '../types';
import Block from '../utils/Block';
import EventBus from '../utils/EventBus';
// import set from '../utils/set';

// import merge from './merge';

type Indexed<T = any> = {
  [key in string]: T;
};

function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as Indexed, result);
}

// export default set;

// type Indexed<T = object> = {
//   [key in string]: T;
// };

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

// export default merge;

enum StorageEvent {
  UpdateState = 'update',
}

class Store extends EventBus {
  private state: any = {};

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StorageEvent.UpdateState, this.state);
  }
}

export const store = new Store();

export function withStore(mapStateProps: (state: any) => any) {
  return (Component: typeof Block) =>
    class extends Component {
      constructor(props: any) {
        const propsFromState = mapStateProps(store.getState());
        super({ ...props, ...propsFromState });

        store.on(StorageEvent.UpdateState, () => {
          const propsFromState = mapStateProps(store.getState());
          this.setProps(propsFromState);
        });
      }
    };
}
