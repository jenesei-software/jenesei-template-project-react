import { IServiceKeys } from '@jenesei-software/jenesei-ui-react'

export type LayoutRootRouteSearch = {
  pastResource?: IServiceKeys
}
export const validateLayoutRootRouteSearch = (
  search: Record<keyof LayoutRootRouteSearch, unknown>
): LayoutRootRouteSearch => {
  const isPastResource = (value: unknown): value is LayoutRootRouteSearch['pastResource'] => value === 'jenesei_id'

  const searchParams: LayoutRootRouteSearch = {
    pastResource: isPastResource(search?.pastResource) ? search.pastResource : undefined
  }

  return searchParams
}
