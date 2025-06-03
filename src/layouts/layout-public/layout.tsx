import { Stack } from '@jenesei-software/jenesei-ui-react/component-stack'
import { Outlet } from '@tanstack/react-router'

export function LayoutPublic() {
  return (
    <Stack
      sx={{
        default: {
          flexGrow: 1,
          flexDirection: 'column',
          padding: '20px',
          overflow: 'auto'
        },
        tablet: {
          padding: '10px',
          alignItems: 'center'
        }
      }}
    >
      <Outlet />
    </Stack>
  )
}
