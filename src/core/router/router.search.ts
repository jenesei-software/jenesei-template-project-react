import { IServiceKeys } from '@jenesei-software/jenesei-ui-react/types'

export type LayoutRootRouteSearch = {
  pastResource?: IServiceKeys
  // redirect?: string
}
export const validateLayoutRootRouteSearch = (
  search: Record<keyof LayoutRootRouteSearch, unknown>
): LayoutRootRouteSearch => {
  const isPastResource = (value: unknown): value is LayoutRootRouteSearch['pastResource'] => value === 'jenesei_id'
  // const isRedirect = (value: unknown): value is LayoutRootRouteSearch['redirect'] => typeof value === 'string'

  const searchParams: LayoutRootRouteSearch = {
    pastResource: isPastResource(search?.pastResource) ? search.pastResource : undefined
    // redirect: isRedirect(search?.redirect) ? search.redirect : undefined
  }

  return searchParams
}
