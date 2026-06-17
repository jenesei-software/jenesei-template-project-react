export type ILanguageKeys = 'en' | 'ru';
export type ILanguage = Record<
  ILanguageKeys,
  { value: ILanguageKeys; label: string; placeholder: string; search: string }
>;
export interface AxiosResponseDto {
  statusCode?: number;
  status?: string | number;
  message?: string | string[];
  error?: string | string[];
}
