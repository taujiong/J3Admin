import { provide, inject } from 'vue';

export function useProvider<T>(token: symbol, instance: T) {
  provide<T>(token, instance);
}

export function useInject<T>(token: symbol) {
  const instance = inject<T>(token);
  if(!instance) throw new Error('service was not provided in upper component');
  return instance;
}
