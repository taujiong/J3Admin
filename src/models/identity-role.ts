import { ExtensibleEntityDto, ExtensibleObject } from 'src/models';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IdentityRoleCreateDto extends IdentityRoleCreateOrUpdateDtoBase {
}

export interface IdentityRoleCreateOrUpdateDtoBase extends ExtensibleObject {
  name: string;
  isDefault: boolean;
  isPublic: boolean;
}

export interface IdentityRoleDto extends ExtensibleEntityDto<string> {
  name: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
  concurrencyStamp: string;
}

export interface IdentityRoleUpdateDto extends IdentityRoleCreateOrUpdateDtoBase {
  concurrencyStamp: string;
}
