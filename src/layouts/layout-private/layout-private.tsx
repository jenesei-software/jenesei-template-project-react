import { Outlet } from '@tanstack/react-router'

import { LayoutPrivateWrapper } from '.'

export function LayoutPrivate() {
  return (
    <LayoutPrivateWrapper>
      <Outlet />
    </LayoutPrivateWrapper>
  )
}
