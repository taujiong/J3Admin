import { inject, provide } from 'vue';

export interface ServiceDescriptor<T> {
  readonly token: symbol,
  create: () => T,
  root?: T
}

export function useProvider<T>(descriptor: ServiceDescriptor<T>, asRoot = true) {
  const instance = descriptor.create();
  provide<T>(descriptor.token, instance);
  if (asRoot) descriptor.root = instance;
  return instance;
}

type InjectType = 'legacy' | 'root';

export function useInject<T>(descriptor: ServiceDescriptor<T>, type: InjectType = 'legacy') {
  switch (type) {
    case 'legacy':
      const instance = inject<T>(descriptor.token);
      if (instance) return instance;
      if (descriptor.root) return descriptor.root;
      throw new Error('service was not provided in upper component and root instance was not set');
    case 'root':
      if (!descriptor.root) descriptor.root = descriptor.create();
      return descriptor.root;
  }
}
