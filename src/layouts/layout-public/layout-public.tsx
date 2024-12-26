import { AuthLayout, useApp } from '@jenesei-software/jenesei-ui-react'
import { Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export function LayoutPublic() {
  const { changePreview } = useApp()

  useEffect(() => {
    changePreview({ isShow: false })
  }, [changePreview])

  return (
    <AuthLayout backUrl="/pictures/auth-back.gif" backUrlWebp="/pictures/auth-back.webp">
      <Outlet />
    </AuthLayout>
  )
}
