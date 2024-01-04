import { nanoid } from '@reduxjs/toolkit'
import {
  AppsResponse,
  NewOrgUserReq,
  OrgCreateResponse,
  OrgData,
  OrgDetailRes,
  OrgListResponse,
  OrgListTransformResponse,
  OrgMembersEnhanced,
  OrgMembersResponse,
  OrganizationCreateRequest,
  TLicenses,
  Tags
} from './types'
import { userService } from './userService'
import { setToastMessage } from '@/features/Toast/toastSlice'
import { LIMIT } from '@/config'
import { store } from '@/features/store'

/**
 * 1 - if you want to tranform the response returned by api using transformResponse you
 *     need to pass the exact response types to the query/mutation you want the transform
 *     response to look like . i.e if autual reponse is
 *     {data:{data:[],count:0}, message:'success',status_code:200} and you trannsform it
 *     as {data:[], count:0} , so transform data types should be passed to q/m. and you
 *     may cast the actual types to the returnBaseValue in tranformResponse b/c its unknown
 *      by default i.e transformResponse(response:ActualResponse):TransformedRespomse{}
 * */

interface ActionResponse {
  message: string
  status_code: number
}
type UserActionRequest = {
  userId: number
  status: string
}
type DeleteUserReq = {
  orgId: number
  username: string
}
interface OrgRequest {
  offset: number
}
interface MemberRequest extends OrgRequest {
  orgId: number | string
}
type MembersResponse = {
  data: { orgId: number; count: number }
  message: string
  status_code: number
}
type UpdateUser = Partial<NewOrgUserReq> & Pick<UserActionRequest, 'userId'>

export const organization = userService.injectEndpoints({
  endpoints(build) {
    return {
      // number of members in a org
      orgMemberCount: build.query<MembersResponse, Pick<MemberRequest, 'orgId'>>({
        query({ orgId }) {
          return {
            url: `org/${orgId}/membersCount`
          }
        },
        providesTags: ['OrgMembers'],
        async onQueryStarted(_body, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled
          } catch (error) {
            dispatch(
              setToastMessage({
                message: 'There was an error fetching requested members count',
                severity: 'error'
              })
            )
          }
        }
      }),
      // all organizations of product
      organizationsList: build.query<OrgListTransformResponse, OrgRequest>({
        query({ offset }) {
          return {
            url: `org/inventory?limit=${LIMIT}&offset=${LIMIT * offset}`
          }
        },
        providesTags: results =>
          results
            ? [
                ...results.members.map(({ orgId }) => ({ type: Tags.OrgMembers, id: orgId })),
                { type: Tags.OrgList, id: 'Organizations' }
              ]
            : [{ type: Tags.OrgList, id: 'Organizations' }],
        async onQueryStarted(_body, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled
          } catch (error) {
            dispatch(
              setToastMessage({
                message: 'There was an error fetching requested organizations list',
                severity: 'error'
              })
            )
          }
        },
        async transformResponse({ data: response }: OrgListResponse): Promise<OrgListTransformResponse> {
          const membersPromise = response.data.map(async org => {
            const { orgId } = org
            try {
              const { data: membersRes } = await store.dispatch(
                organization.endpoints.orgMemberCount.initiate({ orgId })
              )
              if (membersRes) {
                return membersRes?.data
              }
            } catch (err) {
              return err
            }
          })
          //@ts-expect-error iknowwell
          return await Promise.all(membersPromise).then(orgMembers => ({
            count: response.count,
            members: response.data.map(member => {
              //@ts-expect-error iknowwell
              const match = orgMembers.find(wc => wc?.orgId === member.orgId)
              //@ts-expect-error iknowwell
              if (match) return { ...member, count: match?.count, id: nanoid() }
              return { ...response.data, id: nanoid(), count: 0 }
            })
          }))
        }
      }),
      //  sigle organization detail of product
      organizationDetails: build.query<Pick<OrgDetailRes, 'data'>['data'], Pick<MemberRequest, 'orgId'>>({
        query({ orgId }) {
          return {
            url: `org/${orgId}`
          }
        },
        providesTags: results =>
          results
            ? [
                { type: Tags.OrgMembers, id: results.orgId },
                { type: Tags.OrgList, id: 'Organization' }
              ]
            : [{ type: Tags.OrgList, id: 'Organization' }],
        async onQueryStarted(_body, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled
          } catch (error) {
            dispatch(
              setToastMessage({
                message: 'There was an error fetching requested organization',
                severity: 'error'
              })
            )
          }
        },
        async transformResponse({ data: response }: OrgDetailRes) {
          return response
        }
      }),
      // members list of a org
      orgMembers: build.query<OrgMembersEnhanced, MemberRequest>({
        query: ({ orgId, offset }) => ({
          url: `org/${orgId}/member?limit=${LIMIT}&offset=${offset * LIMIT}`
        }),
        providesTags: results =>
          results
            ? [
                ...results.data.map(({ userId }) => ({ type: Tags.OrgMembers, id: userId })),
                { type: Tags.OrgMembers, id: 'Members' }
              ]
            : [{ type: Tags.OrgMembers, id: 'Members' }],
        transformResponse({ data: response }: OrgMembersResponse): OrgMembersEnhanced {
          return { count: response.count, data: response.data.map(member => ({ ...member, id: nanoid() })) }
        }
      }),
      // add new organization
      addOrg: build.mutation<OrgCreateResponse, OrganizationCreateRequest>({
        query: body => ({ url: 'org', method: 'POST', body }),
        invalidatesTags: [Tags.OrgList]
      }),
      //update organization info
      updateOrg: build.mutation<ActionResponse, Partial<OrgData>>({
        query: ({ orgId, ...body }) => ({ url: `org/${orgId}`, method: 'PUT', body }),
        async onQueryStarted(_args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled
          } catch (e) {
            dispatch(
              setToastMessage({
                message: 'An error occured while updating organization.',
                severity: 'error'
              })
            )
          }
        },
        invalidatesTags: [Tags.OrgList]
      }),
      // remove whole organization
      deleteOrg: build.mutation<ActionResponse, Pick<MemberRequest, 'orgId'>>({
        query: ({ orgId }) => ({ url: `org/${orgId}/delete`, method: 'DELETE' }),
        invalidatesTags: [Tags.OrgList]
      }),
      getAppsIDs: build.query<Pick<AppsResponse, 'data'>['data'], void>({
        query: () => ({ url: 'apps' }),
        transformResponse: (res: AppsResponse): Pick<AppsResponse, 'data'>['data'] => {
          return res.data.map(apps => apps)
        }
      }),
      getOrgLicences: build.query<Pick<TLicenses, 'data'>['data'], void>({
        query: () => ({ url: 'licenses' }),
        transformResponse: (res: TLicenses): Pick<TLicenses, 'data'>['data'] => {
          return res.data
        }
      }),
      // add a new user into org
      addUserToOrg: build.mutation<ActionResponse, NewOrgUserReq>({
        query: body => ({ url: 'org/member', method: 'POST', body }),

        async onQueryStarted(_args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled
          } catch (e) {
            dispatch(
              setToastMessage({
                message: 'An error occured while creating user',
                severity: 'error'
              })
            )
          }
        },
        invalidatesTags: [{ type: Tags.OrgMembers, id: 'Members' }]
      }),
      updateUserOfOrg: build.mutation<ActionResponse, UpdateUser>({
        query: ({ userId, ...body }) => ({ url: `user/${userId}`, method: 'PUT', body }),

        async onQueryStarted(_args, { dispatch, queryFulfilled }) {
          // TODO - update cache implement
          // const addResult = dispatch(
          //   organization.util.upsertQueryData('orgMembers', { orgId, offset: 0 }, draft => {
          //     console.log(draft)
          //   })
          // )
          try {
            await queryFulfilled
          } catch (e) {
            dispatch(
              setToastMessage({
                message: 'An error occured while updating member',
                severity: 'error'
              })
            )
          }
        },
        invalidatesTags: [{ type: Tags.OrgMembers, id: 'Members' }]
      }),
      // deactivate user profile / acc
      deactivateUser: build.mutation<ActionResponse, UserActionRequest>({
        query: ({ userId, status }) => ({
          method: 'PUT',
          url: `user/${userId}`,
          body: { status }
        }),
        invalidatesTags: [Tags.OrgMembers]
      }),
      // reactivate user profile / acc
      reactivateUser: build.mutation<ActionResponse, UserActionRequest>({
        query: ({ userId, status }) => {
          return {
            url: `user/${userId}`,
            method: 'PUT',
            body: { status }
          }
        },
        invalidatesTags: [Tags.OrgMembers]
      }),
      deactivatOrg: build.mutation<ActionResponse, Pick<MemberRequest, 'orgId'>>({
        query: ({ orgId }) => ({ url: `org/${orgId}/delete`, method: 'DELETE' }),
        invalidatesTags: (_res, _err, { orgId }) => [{ type: Tags.OrgList, id: orgId }]
      }),
      // remove user profile / acc
      deletUser: build.mutation<ActionResponse, DeleteUserReq & { userId: number }>({
        query: ({ username }) => ({
          url: 'user',
          method: 'DELETE',
          body: { username }
        }),
        invalidatesTags: (_result, _error, { userId }) => [{ type: Tags.OrgMembers, id: userId }]
      })
    }
  }
})

export const {
  useOrganizationDetailsQuery,
  useOrgMemberCountQuery,
  useOrgMembersQuery,
  useOrganizationsListQuery,
  useDeletUserMutation,
  useDeactivateUserMutation,
  useReactivateUserMutation,
  useAddOrgMutation,
  useAddUserToOrgMutation,
  useUpdateOrgMutation,
  useDeleteOrgMutation,
  useDeactivatOrgMutation,
  useUpdateUserOfOrgMutation,
  useGetAppsIDsQuery,
  useGetOrgLicencesQuery
} = organization
