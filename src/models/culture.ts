export interface LanguageInfo {
  cultureName?: string;
  uiCultureName?: string;
  displayName?: string;
  flagIcon?: string;
}

export interface CurrentCultureDto {
  displayName?: string;
  englishName?: string;
  threeLetterIsoLanguageName?: string;
  twoLetterIsoLanguageName?: string;
  isRightToLeft: boolean;
  cultureName?: string;
  name?: string;
  nativeName?: string;
  dateTimeFormat: DateTimeFormatDto;
}

export interface DateTimeFormatDto {
  calendarAlgorithmType?: string;
  dateTimeFormatLong?: string;
  shortDatePattern?: string;
  fullDateTimePattern?: string;
  dateSeparator?: string;
  shortTimePattern?: string;
  longTimePattern?: string;
}

export interface IanaTimeZone {
  timeZoneName?: string;
}

export interface TimeZone {
  iana: IanaTimeZone;
  windows: WindowsTimeZone;
}

export interface TimingDto {
  timeZone: TimeZone;
}

export interface WindowsTimeZone {
  timeZoneId?: string;
}
