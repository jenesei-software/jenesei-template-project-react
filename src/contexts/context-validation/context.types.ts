import { FormAsyncValidateOrFn } from '@tanstack/react-form';
import { PropsWithChildren } from 'react';
import * as yup from 'yup';

export type ProviderValidationProps = PropsWithChildren;

export type ValidationFunctions = {
  blur: (validation: yup.ObjectSchema<any>) => FormAsyncValidateOrFn<any>;
  change: (validation: yup.ObjectSchema<any>) => FormAsyncValidateOrFn<any>;
};

export type ValidationContextProps = {};
