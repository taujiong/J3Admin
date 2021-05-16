import { NavbarItem, TypeProvider } from 'src/models';
import { PermissionService, PermissionServiceProvider } from 'src/services/core/permission-service';
import { createTreeFromList, routeToNavbarItem, toTreeNode, TreeNode } from 'src/utils';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export class NavbarService {
  private _permissionService: PermissionService;
  private _flatItems = ref<Array<NavbarItem>>([]);
  Items = computed(() => {
    const availableItems = this._flatItems.value.filter(
      item => !this.shouldHide(item)
    );
    const tree = this.createTree(availableItems);
    return tree.filter(item => item.children.length > 0 || item.data.path);
  });

  constructor(permissionService: PermissionService) {
    this._permissionService = permissionService;
    const routes = useRouter().getRoutes();
    this._flatItems.value = routes
      .filter(route => route.meta.showInNavbar)
      .map(routeToNavbarItem);
  }

  private shouldHide(item: NavbarItem) {
    return !this._permissionService.isPolicyGranted(item.requiredPolicy);
  }

  private createTree(items: Array<NavbarItem>) {
    return createTreeFromList<NavbarItem, TreeNode<NavbarItem>>(
      items,
      item => item.key,
      item => item.parentKey,
      item => toTreeNode<NavbarItem>(item)
    );
  }

  addItem(items: Array<NavbarItem>) {
    const map = new Map<string, NavbarItem>();
    items.forEach(item => map.set(item.key, item));

    const flatItems = this.filterWith(map);
    map.forEach(item => flatItems.push(item));

    this._flatItems.value = flatItems;
  }

  removeItem(keys: Array<string>) {
    const set = new Set<string>(keys);
    const setToRemove = this.findItemsToRemove(set);
    this._flatItems.value = this.filterWith(setToRemove);
  }

  patchItem(key: string, props: Partial<NavbarItem>) {
    const flatItems = this._flatItems.value;
    const index = this._flatItems.value.findIndex(item => item.key === key);
    if (index < 0) return false;

    flatItems[index] = { ...flatItems[index], ...props };
    this._flatItems.value = flatItems;
  }

  private filterWith(setOrMap: Set<string> | Map<string, NavbarItem>) {
    return this._flatItems.value.filter(item => !setOrMap.has(item.key));
  }

  private findItemsToRemove(set: Set<string>): Set<string> {
    return this._flatItems.value.reduce((acc, item) => {
      if (item.parentKey && acc.has(item.parentKey)) {
        const childSet = new Set([item.key]);
        const children = this.findItemsToRemove(childSet);
        return new Set([...acc, ...children]);
      } else {
        return acc;
      }
    }, set);
  }
}

export const NavbarServiceProvider = new TypeProvider(
  Symbol.for(NavbarService.name),
  NavbarService,
  [PermissionServiceProvider]
);
