import { createContext, FC, useContext } from 'react';

import { ProviderValidationProps, ValidationContextProps } from '.';

const ValidationContext = createContext<ValidationContextProps | null>(null);

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error('useValidation must be used within an ProviderValidation');
  }
  return context;
};

export const ProviderValidation: FC<ProviderValidationProps> = (props) => {
  return <ValidationContext.Provider value={{}}>{props.children}</ValidationContext.Provider>;
};
