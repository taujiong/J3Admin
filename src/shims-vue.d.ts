import 'vue';
import 'vue-router';

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const component: ComponentOptions;
  export default component;
}

declare module 'vue-router' {
  interface RouteMeta {
    requiredPolicy?: string
    showInNavbar?: boolean,
    parentName?: string,
    iconName?: string,
    displayNameKey?: string
  }
}
