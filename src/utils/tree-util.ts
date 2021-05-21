import { Factory } from 'src/models';

export type TreeNode<T> = {
  [key in keyof T]: T[key];
} & {
  parent?: TreeNode<T>;
  children: TreeNode<T>[];
  depth: number,
  isLeaf: boolean
}

export type NodeKey = string | number | symbol | undefined | null;
export type NodeValue<T, F extends Factory<T, TreeNode<unknown>>> = F extends undefined
  ? TreeNode<T>
  : ReturnType<F>;

export function createMapFromList<T, R extends TreeNode<unknown>>(
  items: T[],
  keySelector: (item: T) => NodeKey,
  valueMapper: (item: T) => R
) {
  type Key = ReturnType<typeof keySelector>;
  type Value = NodeValue<T, typeof valueMapper>;
  const map = new Map<Key, Value>();
  items.forEach(item => map.set(keySelector(item), valueMapper(item)));

  return map;
}

export function createTreeFromList<T, R extends TreeNode<unknown>>(
  items: T[],
  keySelector: (item: T) => NodeKey,
  parentKeySelector: typeof keySelector,
  valueMapper: (item: T) => R
) {
  const map = createMapFromList(items, keySelector, valueMapper);
  const tree: NodeValue<T, typeof valueMapper>[] = [];

  for (const item of items) {
    const key = keySelector(item);
    const parentKey = parentKeySelector(item);
    const node = map.get(key);

    if (!node) continue;

    if (parentKey) {
      const parent = map.get(parentKey);
      if (!parent) continue;
      parent.children.push(node);
      parent.isLeaf = false;
      node.parent = parent;
      node.depth = parent.depth + 1;
    } else {
      tree.push(node);
    }
  }

  return tree;
}

export function toTreeNode<T>(item: T): TreeNode<T> {
  const treeNode = {
    children: [],
    depth: 0,
    isLeaf: true
  };

  return Object.assign(treeNode, item);
}
