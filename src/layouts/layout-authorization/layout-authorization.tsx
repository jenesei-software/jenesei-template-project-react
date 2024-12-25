import { AuthLayout, useApp } from '@jenesei-software/jenesei-ui-react'
import { Navigate, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export function LayoutAuthorization() {
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

export function LayoutAuthorizationNotFound() {
  return <Navigate to="/auth" />
}
