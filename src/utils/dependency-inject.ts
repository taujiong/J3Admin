import { ContainerType, DIProvider } from 'src/models/dependency-inject-provider';
import { inject, provide } from 'vue';

const ServiceRootInstanceCollection = new Map<symbol, unknown>();

export function provideIn<T>(container: ContainerType, provider: DIProvider<T>) {
  const instance = provider.createInstance(container);

  switch (container) {
    case 'component':
      provide<T>(provider.token, instance);
      break;
    case 'root':
      ServiceRootInstanceCollection.set(provider.token, instance);
      break;
    default:
      throw new Error('invalid container type');
  }

  return instance;
}

export function injectFrom<T>(container: ContainerType, token: symbol) {
  switch (container) {
    case 'component':
      const componentInstance = inject<T>(token);
      if (componentInstance) return componentInstance;
      throw new Error('service has not provided in the upper component yet');
    case 'root':
      const rootInstance = ServiceRootInstanceCollection.get(token) as T;
      if (rootInstance) return rootInstance;
      throw new Error('service has not provided in the root yet');
    default:
      throw new Error('invalid container type');
  }
}
