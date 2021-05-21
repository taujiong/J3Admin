import { ExtensibleEntityDto, QTableColumn } from 'src/models';

export type IdentityRoleCreateDto = IdentityRoleCreateOrUpdateDtoBase

export interface IdentityRoleCreateOrUpdateDtoBase {
  name: string;
  isDefault: boolean;
  isPublic: boolean;
}

export interface IdentityRoleDto extends ExtensibleEntityDto {
  name: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
  concurrencyStamp: string;
}

export interface IdentityRoleUpdateDto extends IdentityRoleCreateOrUpdateDtoBase {
  concurrencyStamp: string;
}

export const IdentityRoleTableColumn: Array<QTableColumn> = [
  {
    name: 'roleName',
    required: true,
    label: 'AbpIdentity.RoleName',
    align: 'left',
    field: 'name'
  }
];
