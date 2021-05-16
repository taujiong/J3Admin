import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiredPolicy?: string
    showInNavbar?: boolean,
    parentName?: string,
    iconName?: string,
    displayNameKey?: string
  }
}
