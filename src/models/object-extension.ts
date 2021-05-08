export interface EntityExtensionDto {
  properties: Record<string, ExtensionPropertyDto>;
  configuration: Record<string, Record<string, unknown>>;
}

export interface ExtensionEnumDto {
  fields: ExtensionEnumFieldDto[];
  localizationResource?: string;
}

export interface ExtensionEnumFieldDto {
  name?: string;
  value: Record<string, unknown>;
}

export interface ExtensionPropertyApiCreateDto {
  isAvailable: boolean;
}

export interface ExtensionPropertyApiDto {
  onGet: ExtensionPropertyApiGetDto;
  onCreate: ExtensionPropertyApiCreateDto;
  onUpdate: ExtensionPropertyApiUpdateDto;
}

export interface ExtensionPropertyApiGetDto {
  isAvailable: boolean;
}

export interface ExtensionPropertyApiUpdateDto {
  isAvailable: boolean;
}

export interface ExtensionPropertyAttributeDto {
  typeSimple?: string;
  config: Record<string, Record<string, unknown>>;
}

export interface ExtensionPropertyDto {
  type?: string;
  typeSimple?: string;
  displayName: LocalizableStringDto;
  api: ExtensionPropertyApiDto;
  ui: ExtensionPropertyUiDto;
  attributes: ExtensionPropertyAttributeDto[];
  configuration: Record<string, Record<string, unknown>>;
  defaultValue: Record<string, unknown>;
}

export interface ExtensionPropertyUiDto {
  onTable: ExtensionPropertyUiTableDto;
  onCreateForm: ExtensionPropertyUiFormDto;
  onEditForm: ExtensionPropertyUiFormDto;
  lookup: ExtensionPropertyUiLookupDto;
}

export interface ExtensionPropertyUiFormDto {
  isVisible: boolean;
}

export interface ExtensionPropertyUiLookupDto {
  url?: string;
  resultListPropertyName?: string;
  displayPropertyName?: string;
  valuePropertyName?: string;
  filterParamName?: string;
}

export interface ExtensionPropertyUiTableDto {
  isVisible: boolean;
}

export interface LocalizableStringDto {
  name?: string;
  resource?: string;
}

export interface ModuleExtensionDto {
  entities: Record<string, EntityExtensionDto>;
  configuration: Record<string, Record<string, unknown>>;
}

export interface ObjectExtensionsDto {
  modules: Record<string, ModuleExtensionDto>;
  enums: Record<string, ExtensionEnumDto>;
}
