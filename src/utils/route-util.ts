import { NavbarItem } from 'src/models/navbar-item';
import { RouteRecord, RouteRecordRaw } from 'vue-router';

export function routeToNavbarItem(route: RouteRecord | RouteRecordRaw) {
  if (!route.name) throw new Error(`please make sure that route ${ route.path } has name specified`);
  if (!route.meta) throw new Error(`please make sure that route ${ route.path } has proper metas`);
  if (!route.meta.displayNameKey) throw new Error(`displayNameKey should be specified in the meta of route ${ route.path }`);

  const item = {
    displayNameKey: route.meta.displayNameKey,
    iconName: route.meta.iconName ?? 'dashboard',
    requiredPolicy: route.meta.requiredPolicy,
    path: { name: route.name },
    key: `route:${ route.name as string }`
  } as NavbarItem;

  if (route.meta.parentName) {
    item.parentKey = `route:${ route.meta.parentName }`;
  }

  return item;
}
