/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeepKeys, FormApi } from '@tanstack/react-form'
import { FC, createContext, useContext, useMemo } from 'react'
import * as yup from 'yup'

import { ProviderValidationProps, ValidationContextProps } from '.'

const ValidationContext = createContext<ValidationContextProps | null>(null)

export const useValidation = () => {
  const context = useContext(ValidationContext)
  if (!context) {
    throw new Error('useValidation must be used within an ProviderValidation')
  }
  return context
}

export const ProviderValidation: FC<ProviderValidationProps> = props => {
  // const { t: tForm } = useTranslation('translation', { keyPrefix: 'form' })

  const validationFunctions = useMemo(
    () => ({
      touched:
        <TValues extends Record<string, any>>(validation: yup.ObjectSchema<any>) =>
        async ({
          value,
          formApi
        }: {
          value: TValues
          formApi: FormApi<TValues, any, any, any, any, any, any, any, any, any>
          signal: AbortSignal
        }): Promise<null | { fields: Record<string, string> }> => {
          const touchedFields = Object.keys(formApi.fieldInfo).reduce((acc, fieldName) => {
            const key = fieldName as DeepKeys<TValues>
            const fieldMeta = formApi.fieldInfo?.[key]?.instance?.getMeta()

            if (fieldMeta?.isTouched) {
              acc[key] = value[key]
            }

            return acc
          }, {} as Partial<TValues>)

          try {
            await validation.validate(touchedFields, { abortEarly: false })
            return null
          } catch (validationErrors) {
            if (validationErrors instanceof yup.ValidationError) {
              const errors = validationErrors.inner.reduce(
                (acc, error) => {
                  if (
                    error.path &&
                    Object.prototype.hasOwnProperty.call(touchedFields, error.path) &&
                    !acc[error.path]
                  ) {
                    acc[error.path] = error.message
                  }
                  return acc
                },
                {} as Record<string, string>
              )
              return { fields: errors }
            }
            return null
          }
        }
    }),
    []
  )

  const validationExample = useMemo(() => yup.object({}), [])

  return (
    <ValidationContext.Provider
      value={{
        validationFunctions,
        validationExample
      }}
    >
      {props.children}
    </ValidationContext.Provider>
  )
}
