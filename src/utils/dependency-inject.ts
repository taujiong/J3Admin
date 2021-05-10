import { inject, provide } from 'vue';

export interface ServiceDescriptor<T> {
  readonly tokenKey: string,
  create: () => T,
  root?: T
}

export function useProvider<T>(descriptor: ServiceDescriptor<T>, asRoot = false, force?: boolean) {
  const instance = descriptor.create();
  const token = Symbol.for(descriptor.tokenKey);
  provide<T>(token, instance);

  if (asRoot) {
    if (descriptor.root && !force) throw new Error(`can not replace root for service ${ descriptor.tokenKey } when the root exists and "force" is not set true`);
    descriptor.root = instance;
  }

  return instance;
}

export function useInjector<T>(descriptor: ServiceDescriptor<T>, searchInTree = true, withRoot = false, force = false) {
  if (searchInTree) {
    const token = Symbol.for(descriptor.tokenKey);
    const instance = inject<T>(token);
    if (instance) return instance;
    if (!withRoot) throw new Error(`service ${ descriptor.tokenKey } is not provided in upper component and root is excluded when "withRoot" is not set true`);
  }

  if (withRoot) {
    if (descriptor.root) return descriptor.root;
    if (!force) throw new Error(`service ${ descriptor.tokenKey } is not provided and can not create instance when "force" is not set true`);
    descriptor.root = descriptor.create();
    return descriptor.root;
  }

  throw new Error('either "searchInTree" or "withRoot" should be set true');
}
