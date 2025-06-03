import { Button } from '@jenesei-software/jenesei-ui-react/component-button'
import { Stack } from '@jenesei-software/jenesei-ui-react/component-stack'
import { useTranslation } from 'react-i18next'

import { useLanguage } from '@local/contexts/context-language'

export function PagePrivateHome() {
  const { changeLng, lng } = useLanguage()
  const { t } = useTranslation('translation')

  return (
    <Stack>
      Private Home. Current lng: {lng} {t('test')}
      <Button onClick={() => changeLng('rus')} genre="greenTransparent" size="medium">
        Ru
      </Button>
      <Button onClick={() => changeLng('eng')} genre="greenTransparent" size="medium">
        En
      </Button>
    </Stack>
  )
}
