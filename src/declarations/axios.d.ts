import 'axios';
import { IAxiosResponseDto } from '@local/core/types';

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface AxiosResponse<T = any> extends IAxiosResponseDto {
    data: T;
  }
}
