import { inject, provide } from 'vue';

export interface ServiceDescriptor<T> {
  readonly tokenKey: string,
  create: (...dependency: unknown[]) => T,
  root?: T
}

export function useProvider<T>(descriptor: ServiceDescriptor<T>, provideIn: 'component' | 'root', ...dependency: unknown[]) {
  const instance = descriptor.create(...dependency);
  const token = Symbol.for(descriptor.tokenKey);

  switch (provideIn) {
    case 'component':
      provide<T>(token, instance);
      break;
    case 'root':
      if (descriptor.root) throw new Error('root has already existed');
      descriptor.root = instance;
  }

  return instance;
}

export function useInjector<T>(descriptor: ServiceDescriptor<T>, provider: 'component' | 'root', fallbackToRoot?: boolean) {
  if (provider === 'component') {
    const token = Symbol.for(descriptor.tokenKey);
    const instance = inject<T>(token);
    if (instance) return instance;
    if (!fallbackToRoot) throw new Error('service is not provided in the upper component and can not fallback to root');
  }

  if (!descriptor.root) throw new Error('root has not existed yet');
  return descriptor.root;
}
