import { useLanguage } from '@local/contexts/context-language';

import { Button } from '@jenesei-software/jenesei-kit-react/component-button';
import { Stack } from '@jenesei-software/jenesei-kit-react/component-stack';
import { useTranslation } from 'react-i18next';

export function PagePrivateHome() {
  const { changeLng, lng } = useLanguage();
  const { t } = useTranslation('translation');

  return (
    <Stack>
      Private Home. Current lng: {lng} {t('meta.description')}
      <Button onClick={() => changeLng('rus')} genre='greenTransparent' size='medium'>
        Ru
      </Button>
      <Button onClick={() => changeLng('eng')} genre='greenTransparent' size='medium'>
        En
      </Button>
    </Stack>
  );
}
