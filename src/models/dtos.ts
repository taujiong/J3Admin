import { Dictionary } from 'src/models';

export interface ExtensibleObject {
  extraProperties: Dictionary<unknown>
}

export interface ExtensibleEntityDto<TKey = string> extends ExtensibleObject {
  id: TKey;
}

export interface ExtensibleCreationAuditedEntityDto<TPrimaryKey = string> extends ExtensibleEntityDto<TPrimaryKey> {
  creationTime: Date | string;
  creatorId?: string;
}

export interface ExtensibleAuditedEntityDto<TPrimaryKey = string> extends ExtensibleCreationAuditedEntityDto<TPrimaryKey> {
  lastModificationTime?: Date | string;
  lastModifierId?: string;
}

export interface ExtensibleFullAuditedEntityDto<TPrimaryKey = string> extends ExtensibleAuditedEntityDto<TPrimaryKey> {
  isDeleted: boolean;
  deleterId?: string;
  deletionTime: Date | string;
}

export interface ListResultDto<T> {
  items?: T[];
}

export interface PagedResultDto<T> extends ListResultDto<T> {
  totalCount?: number;
}

export interface PagedAndSortedResultRequestDto {
  Sorting?: number;
  SkipCount?: number;
  MaxResultCount?: number;
}
