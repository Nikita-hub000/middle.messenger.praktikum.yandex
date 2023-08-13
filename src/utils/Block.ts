import { nanoid } from 'nanoid';
import EventBus from './EventBus.ts';
import { cloneDeep, isEqual } from '../helpers/coreFunc.ts';
let counter = 0;
abstract class Block<Prop extends Record<string, any> = unknown> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);

  protected props: Prop;

  protected state: any;

  public children: Record<string, Block>;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  protected refs: { [key: string]: HTMLElement } = {};

  private _meta: { props: any };

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(propsWithChildren: Prop) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      props,
    };

    this.children = children;
    this.state = {};
    this.props = this._makePropsProxy(props);
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props as {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props as Prop & {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }

  _createResources() {
    const tagName = 'div';
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _checkInDom() {
    // const elementInDOM = document.body.contains(this._element);
    // if (!elementInDOM) {
    //   setTimeout(() => this._checkInDom(), 1000);
    //   return;
    // }
    // this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  _componentDidMount() {
    this._checkInDom();
    this.componentDidMount();
  }

  componentDidMount() {}

  private _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  protected componentWillUnmount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      try {
        child.dispatchComponentDidMount();
      } catch (error) {
        console.log(error);
      }
    });
  }

  public dispatchComponentDidUpdate() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps && newProps) {
      return !isEqual(oldProps, newProps);
    }
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }
    const props = cloneDeep(this.props);
    const newProps = cloneDeep({ ...props, ...nextProps });

    Object.assign(this.props, nextProps);

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, props, newProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    this._removeEvents();

    const newElement = fragment.firstElementChild as HTMLElement;
    this._element!.replaceWith(newElement);
    this._element = newElement;

    this._addEvents();
    counter += 1;
    console.log('render', counter);
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    this.prevProps = cloneDeep(this.props);
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };
    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(
          (component) => `<div data-id="${component.id}"></div>`
        );
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);
    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStubToComponent = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));
      stub.replaceWith(component.getContent()!);
    };
    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach((component) => replaceStubToComponent(component));
      } else {
        replaceStubToComponent(component);
      }
    });
    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element!;
  }

  _makePropsProxy(props: Prop) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };

        target[prop as keyof Prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = 'flex';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }

  public destroy() {
    this._element!.remove();
  }
}

export default Block;
