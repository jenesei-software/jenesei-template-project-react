import { AuthLayout } from '@jenesei-software/jenesei-ui-react'
import { Outlet } from '@tanstack/react-router'

export function LayoutPublic() {
  return (
    <AuthLayout
      backUrl="https://id.jenesei.ru/pictures/auth-back-mountain.jpg"
      backUrlWebp="https://id.jenesei.ru/pictures/auth-back-mountain.webp"
    >
      <Outlet />
    </AuthLayout>
  )
}
