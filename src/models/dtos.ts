import { Dictionary } from 'src/models';

export interface EntityDto<TKey = string> {
  id: TKey;
}

export interface CreationAuditedEntityDto<TPrimaryKey = string> extends EntityDto<TPrimaryKey> {
  creationTime: Date | string;
  creatorId?: string;
}

export interface AuditedEntityDto<TPrimaryKey = string> extends CreationAuditedEntityDto<TPrimaryKey> {
  lastModificationTime?: Date | string;
  lastModifierId?: string;
}

export interface FullAuditedEntityDto<TPrimaryKey = string> extends AuditedEntityDto<TPrimaryKey> {
  isDeleted: boolean;
  deleterId?: string;
  deletionTime: Date | string;
}

export interface ExtensibleObject {
  extraProperties: Dictionary<unknown>
}

export type ExtensibleEntityDto<TKey = string> = ExtensibleObject & EntityDto<TKey>;

export type ExtensibleCreationAuditedEntityDto<TPrimaryKey = string> =
  ExtensibleObject
  & CreationAuditedEntityDto<TPrimaryKey>;

export type ExtensibleAuditedEntityDto<TPrimaryKey = string> =
  ExtensibleObject
  & AuditedEntityDto<TPrimaryKey>;

export type ExtensibleFullAuditedEntityDto<TPrimaryKey = string> =
  ExtensibleObject
  & FullAuditedEntityDto<TPrimaryKey>;

export interface ListResultDto<T> {
  items: T[];
}

export interface PagedResultDto<T> extends ListResultDto<T> {
  totalCount: number;
}

export interface PagedAndSortedResultRequestDto {
  Sorting?: number;
  SkipCount?: number;
  MaxResultCount?: number;
}
