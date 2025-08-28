import { ProviderLanguage } from '@local/contexts/context-language';
import { queryClient } from '@local/core/query';
import { LayoutErrorBoundary } from '@local/layouts/layout-error';
import { LayoutRouter } from '@local/layouts/layout-router';

import { ProviderDialog } from '@jenesei-software/jenesei-kit-react/context-dialog';
import { ProviderGeolocation } from '@jenesei-software/jenesei-kit-react/context-geolocation';
import { ProviderPermission } from '@jenesei-software/jenesei-kit-react/context-permission';
import { ProviderScreenWidth } from '@jenesei-software/jenesei-kit-react/context-screen-width';
import { JeneseiGlobalStyles, ThemeLight } from '@jenesei-software/jenesei-kit-react/style-theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={ThemeLight}>
      <ProviderScreenWidth>
        <ProviderLanguage>
          <JeneseiGlobalStyles />
          <LayoutErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <ProviderPermission>
                <ProviderGeolocation>
                  <ProviderDialog zIndex={1000}>
                    <LayoutRouter />
                  </ProviderDialog>
                </ProviderGeolocation>
              </ProviderPermission>
            </QueryClientProvider>
          </LayoutErrorBoundary>
        </ProviderLanguage>
      </ProviderScreenWidth>
    </ThemeProvider>
  );
}

export default App;
