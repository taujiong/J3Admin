import { Factory, Type } from 'src/models';
import { injectFrom, provideIn } from 'src/utils';

export type ContainerType = 'component' | 'root';

export abstract class DIProvider<T> {
  token: symbol;

  protected constructor(token: symbol) {
    this.token = token;
  }

  abstract createInstance(container: ContainerType): T

  resolveInstance(container: ContainerType) {
    try {
      return injectFrom<T>(this.token, container);
    } catch (error) {
      return provideIn<T>(this, container);
    }
  }
}

export class ValueProvider<T> extends DIProvider<T> {
  private readonly _value: T;

  constructor(token: symbol, value: T) {
    super(token);
    this._value = value;
  }

  createInstance(): T {
    return this._value;
  }
}

export class TypeProvider<T> extends DIProvider<T> {
  private readonly _type: Type<T>;
  private readonly _dependency?: unknown[];

  constructor(token: symbol, type: Type<T>, dependency?: unknown[]) {
    super(token);
    this._type = type;
    this._dependency = dependency;
  }

  createInstance(container: ContainerType): T {
    const dependency = resolveProviderDeps(container, this._dependency);
    return Reflect.construct(this._type, dependency) as T;
  }
}

/**
 * T => type of the target instance
 *
 * P => type of the parameter(s) in function create
 */
export class FactoryProvider<T, P> extends DIProvider<T> {
  private readonly _create: Factory<P, T>;
  private readonly _dependency?: unknown[];

  constructor(token: symbol, create: Factory<P, T>, dependency?: unknown[]) {
    super(token);
    this._create = create;
    this._dependency = dependency;
  }

  createInstance(container: ContainerType): T {
    const dependency = resolveProviderDeps(container, this._dependency);
    return Reflect.apply(this._create, this, dependency) as T;
  }
}

/**
 * dependency should be either the exact parameter for the function or a DIProvider to resolve an instance
 * and the parameter order **must** be consistent with the function or constructor
 * @param {ContainerType} container
 * @param {Array<unknown>} dependency
 * @returns {unknown[]}
 */
function resolveProviderDeps(container: ContainerType, dependency?: Array<unknown>): unknown[] {
  if (!dependency) return [] as unknown[];

  return dependency.map(provider => {
    if (provider instanceof DIProvider) {
      return provider.resolveInstance(container) as unknown;
    }
    return provider;
  });
}
