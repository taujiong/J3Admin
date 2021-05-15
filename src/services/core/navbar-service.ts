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
}

export const NavbarServiceProvider = new TypeProvider(
  Symbol.for(NavbarService.name),
  NavbarService,
  [PermissionServiceProvider]
);
