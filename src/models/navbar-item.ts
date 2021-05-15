export interface NavbarItem {
  displayNameKey: string,
  iconName: string,
  requiredPolicy?: string,
  path?: string | { name: string | symbol },
  key: string,
  parentKey?: string
}
