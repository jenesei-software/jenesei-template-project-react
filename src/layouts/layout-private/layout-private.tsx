import { useApp } from '@jenesei-software/jenesei-ui-react'
import { Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

import { LayoutPrivateWrapper } from '.'

export function LayoutPrivate() {
  const { changePreview } = useApp()

  useEffect(() => {
    changePreview({ isShow: false })
  }, [changePreview])

  return (
    <LayoutPrivateWrapper>
      <Outlet />
    </LayoutPrivateWrapper>
  )
}
