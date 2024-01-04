import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryWithReauth, prepareAuthHeader } from './utils'
import { servicesEndpoints } from '@/config/apiConstants'
import { clearToastMessage, setToastMessage } from '@/features/Toast/toastSlice'

type ActivityData = { components: number; products: number; scans: number }
type ActivityCounts = {
  data: ActivityData
  message: string
  status_code: number
}
const baseQuery = fetchBaseQuery({
  baseUrl: servicesEndpoints.scanService,
  prepareHeaders: prepareAuthHeader
})
export const scanService = createApi({
  reducerPath: 'scanApi',
  keepUnusedDataFor: 60 * 60,
  baseQuery: fetchBaseQueryWithReauth(baseQuery),
  tagTypes: ['ActivityCounts'],
  endpoints: build => ({
    getORGActivities: build.query<ActivityData, void>({
      query: () => ({ url: 'total/count' }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (e) {
          dispatch(
            setToastMessage({
              message: 'An error occured while fetching activites count',
              severity: 'error'
            })
          )
          setTimeout(() => {
            dispatch(clearToastMessage())
          }, 2500)
        }
      },
      transformResponse(response: ActivityCounts): ActivityData {
        return response.data
      }
    })
  })
})

export const { useGetORGActivitiesQuery } = scanService
