import { ContainerType, DIProvider } from 'src/models';
import { inject, provide } from 'vue';

const ServiceRootInstanceCollection = new Map<symbol, unknown>();

export function provideIn<T>(provider: DIProvider<T>, container: ContainerType = 'root') {
  const instance = provider.createInstance(container);

  switch (container) {
    case 'component':
      try {
        let preComponentInstance = injectFrom<T>(provider.token);
        preComponentInstance = Object.assign(preComponentInstance, instance);
        return preComponentInstance;
      } catch (error) {
        provide<T>(provider.token, instance);
        return instance;
      }
    case 'root':
      let preRootInstance = ServiceRootInstanceCollection.get(provider.token) as T;
      if (!preRootInstance) {
        ServiceRootInstanceCollection.set(provider.token, instance);
        return instance;
      }
      preRootInstance = Object.assign(preRootInstance, instance);
      return preRootInstance;
    default:
      throw new Error('invalid container type');
  }
}

export function injectFrom<T>(token: symbol, container: ContainerType = 'root') {
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
