import { ExtensibleFullAuditedEntityDto, ExtensibleObject, QTableColumn } from 'src/models';

export interface IdentityUserCreateDto extends IdentityUserCreateOrUpdateDtoBase {
  password: string;
}

export interface IdentityUserCreateOrUpdateDtoBase extends ExtensibleObject {
  userName: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  lockoutEnabled: boolean;
  roleNames: Array<string>;
}

export interface IdentityUserDto extends ExtensibleFullAuditedEntityDto {
  tenantId?: string;
  userName: string;
  name: string;
  surname: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd?: string;
  concurrencyStamp: string;
}

export interface IdentityUserUpdateDto extends IdentityUserCreateOrUpdateDtoBase {
  password: string;
  concurrencyStamp: string;
}

export interface IdentityUserUpdateRolesDto {
  roleNames: Array<string>;
}

export const IdentityUserTableColumn: Array<QTableColumn> = [
  {
    name: 'userName',
    required: true,
    label: 'userName',
    align: 'left',
    field: 'userName'
  },
  {
    name: 'email',
    required: true,
    label: 'email',
    align: 'left',
    field: 'email'
  },
  {
    name: 'phoneNumber',
    required: true,
    label: 'phone',
    align: 'left',
    field: 'phoneNumber'
  },
  {
    name: 'roles',
    required: true,
    label: 'roles',
    align: 'left',
    field: 'roleNames',
    format: (value: Array<string>) => value.join(',')
  },
  {
    name: 'actions',
    label: 'actions',
    align: 'left',
    field: 'null'
  }
];
