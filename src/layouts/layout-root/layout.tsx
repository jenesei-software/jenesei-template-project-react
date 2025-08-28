import { ProviderValidation } from '@local/contexts/context-validation';
import { LayoutRoutePrivate, LayoutRoutePublic } from '@local/core/router';
import { useEnvironment } from '@local/hooks/use-environment';

import { ProviderApp, useApp } from '@jenesei-software/jenesei-kit-react/context-app';
import { useScreenWidth } from '@jenesei-software/jenesei-kit-react/context-screen-width';
import { ProviderSonner } from '@jenesei-software/jenesei-kit-react/context-sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, useMatches, useNavigate, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function LayoutRoot() {
  const env = useEnvironment();

  useEffect(() => {
    console.table(env);
  }, [env]);

  return (
    <>
      <ProviderValidation>
        <LayoutRootComponent />
      </ProviderValidation>
      {env.mode === 'test' && (
        <>
          <ReactQueryDevtools buttonPosition='bottom-left' />
          <TanStackRouterDevtools position='bottom-right' />
        </>
      )}
    </>
  );
}

const LayoutRootComponent = () => {
  const { shortName } = useEnvironment();
  const { t } = useTranslation('translation');
  // const { isLoading, isSuccess, isFetched } = useAuthProfile();
  // const isAuthenticated = useMemo(() => (isFetched ? isSuccess : undefined), [isFetched, isSuccess]);

  // const visible = useMemo(() => !!isLoading, [isLoading]);
  const isAuthenticated = useMemo(() => false, []);

  const visible = useMemo(() => true, []);
  const navigate = useNavigate();

  const isMatchPrivate = useMatches({
    select(matches) {
      return matches.some((match) => match.fullPath === LayoutRoutePrivate.fullPath);
    },
  });
  const isMatchPublic = useMatches({
    select(matches) {
      return matches.some((match) => match.fullPath === LayoutRoutePublic.fullPath);
    },
  });

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      if (isMatchPrivate) {
        if (!isAuthenticated) navigate({ to: '/pu' });
      } else if (isMatchPublic) {
        if (isAuthenticated) navigate({ to: '/pr' });
      }
    }
  }, [isAuthenticated, isMatchPrivate, isMatchPublic, navigate]);

  const { screenActual } = useScreenWidth();
  return (
    <ProviderSonner
      gap={12}
      position={screenActual === 'mobile' ? 'bottom-center' : 'bottom-right'}
      visibleToasts={3}
      zIndex={100}
      default={{
        genre: 'black',
        button: {
          content: t('sonner.undo'),
        },
      }}
    >
      <ProviderApp
        defaultPreview={{ visible: visible, defaultVisible: false }}
        defaultTitle={shortName}
        defaultDescription={t('meta.description')}
        isScrollOutlet={true}
        defaultBgColor='whiteStandard'
        defaultStatusBarColor='whiteStandard'
        // leftAside={{
        //   component: <LeftAside />,
        //   isTopFooter: true,
        //   isTopNav: true,
        //   length: {
        //     default: isMatchPrivate ? '420px' : '50dvw',
        //     tablet: isMatchPrivate ? '96px' : null,
        //     mobile: null,
        //   },
        // }}
        // footer={{
        //   component: <Footer />,
        //   length: {
        //     default: null,
        //     tablet: null,
        //     mobile: isMatchPrivate ? '95px' : null,
        //   },
        // }}
        // nav={{
        //   component: <Nav />,
        //   length: {
        //     default: isMatchPrivate ? '68px' : null,
        //     tablet: isMatchPrivate ? '68px' : null,
        //     mobile: isMatchPrivate ? '40px' : null,
        //   },
        // }}
        // header={{
        //   zIndex: 1,
        //   component: <Header />,
        //   length: {
        //     default: isMatchPrivate ? null : null,
        //     tablet: isMatchPrivate ? null : '170px',
        //     mobile: isMatchPrivate ? null : '170px',
        //   },
        // }}
        main={{
          zIndex: 0,
        }}
      >
        <LayoutURLComponent />
      </ProviderApp>
    </ProviderSonner>
  );
};
const LayoutURLComponent = () => {
  const { shortName } = useEnvironment();
  const { t: tURLTitle } = useTranslation('translation', { keyPrefix: 'url.title' });
  const fullPath = useRouterState({
    select: (state) => state.location.pathname.replace(/\/$/, ''),
  });
  const { changeTitle } = useApp();

  useEffect(() => {
    const titleTranslate = tURLTitle(fullPath, { defaultValue: '__MISSING__' });
    const exists = titleTranslate !== '__MISSING__';
    if (exists) {
      changeTitle(titleTranslate);
    } else {
      changeTitle(shortName);
    }
  }, [changeTitle, shortName, fullPath, tURLTitle]);
  return <Outlet />;
};
