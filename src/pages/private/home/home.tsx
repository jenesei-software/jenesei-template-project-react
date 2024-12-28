import { Button, Stack } from '@jenesei-software/jenesei-ui-react'
import { useTranslation } from 'react-i18next'

import { useLanguage } from '@local/contexts/context-language'

export function PagePrivateHome() {
  const { changeLng, lng } = useLanguage()
  const { t } = useTranslation('translation')

  return (
    <Stack maxW="600px" w="100%" gap="50px" alignItems="stretch" flexDirection="column">
      Private Home. Current lng: {lng} {t('test')}
      <Button onClick={() => changeLng('ru')} genre="greenTransparent" size="medium">
        Ru
      </Button>
      <Button onClick={() => changeLng('en')} genre="greenTransparent" size="medium">
        En
      </Button>
    </Stack>
  )
}
