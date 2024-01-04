import { UserAuthTypes, UserNotfPerference, UserRoles, UserStatus } from '@/@types'

export type LogoutResp = {
  message: string
  status_code: number
}
export type TLicenses = {
  data: { id: number; isActive: boolean; title: string }[]
  message: string
  status_code: number
}
export type ResfreshResponse = {
  data: {
    accessToken: string
  }
  message: string
  status_code: number
}
export const Tags = {
  Organization: 'Organization',
  OrgList: 'OrgList',
  Organizations: 'Organizations',
  OrgMembers: 'OrgMembers'
}

/**
 *    UTILS
 * */

//  add a filed to an array of objects on the go
type MyType = { foo: string }[]
export type MyBetterType = (MyType[number] & { fooBar: string })[]
/**
 * Organization list data for main org page table
 * */

export interface OrgData {
  createdAt: string
  description: string
  licenseId: number
  licenseType: string
  name: string
  orgId: number
  phone: string
  address: string
  website: string
  status: 'ACTIVE' | 'DEACTIVATED'
}

export type OrgListResponse = {
  data: {
    count: number
    data: OrgData[]
  }
  message: string
  status_code: number
}
export interface OrgDetailRes extends Pick<OrgListResponse, 'message' | 'status_code'> {
  data: OrgData
}

type OrgsWithId = Array<OrgData[] extends Array<infer Item> ? Item & { id: string | number; count: number } : never>

export type OrgListTransformResponse = {
  count: number
  members: OrgsWithId
}
/**
 * Organization members count and members details
 * */

export type MembersResponse = {
  data: number
  message: string
  status_code: number
}
// actual members details
export interface OrgMember {
  lastLogin: string
  createdAt: string
  name: string
  status: UserStatus
  userId: number
  username: string
  address: string
  apiKey: string | null
  apiKeyCreatedAt: string | null
  authType: UserAuthTypes
  city: string
  country: string
  email: string
  isEmailVerified: number | boolean
  licenseId: number
  licenseType: string
  orgId: number
  passwordUpdatedAt: string | null
  phone: string
  preference: UserNotfPerference
  applicationIds: number[]
  roleId: number
  roleTitle: UserRoles
  subtitle: string
}

export interface NewOrgUserReq
  extends Pick<
    OrgMember,
    | 'name'
    | 'username'
    | 'orgId'
    | 'address'
    | 'email'
    | 'phone'
    | 'preference'
    | 'subtitle'
    | 'city'
    | 'country'
    | 'isEmailVerified'
  > {
  password: string
  role: string
  applicationIds: number[]
}
export interface OrgMemberWithId extends OrgMember {
  id: string | number
}
export interface OrgMembersData {
  count: number
  data: OrgMember[]
}

export interface OrgMembersResponse {
  data: { data: OrgMembersData['data']; count: OrgMembersData['count'] }
  message: string
  status_code: number | string
}
export interface OrgMembersEnhanced {
  count: number
  data: OrgMemberWithId[]
}
export interface AppsResponse {
  data: {
    title: string
    description: string
    id: number
  }[]
  message: string
  status_code: number | string
}
/**
 * Profile Type
 * */

export type ProfileResponse = {
  data: {
    org: { id: number; name: string }
    user: {
      address: string
      city: string
      country: string
      createdAt: string
      email: string
      id: number
      isEmailVerified: false
      lastLogin: string
      licenseType: string
      name: string
      passwordUpdatedAt: string
      phone: string
      preference: string
      role: string
      status: string
      subtitle: string
      username: string
    }
  }
  message: string
  status_code: number
}
/**
 * ADD NEW ORG
 * */

export interface OrganizationCreateRequest {
  name: string
  username: string
  password: string
  userAddress?: string
  userEmail?: string
  userPhone?: string
  userCity?: string
  userCountry?: string
  userSubtitle?: string
  userStatus?: 'ACTIVE' | 'PENDING' //not yet
  licenseId: number
  orgName?: string
  orgWebsite?: string
  orgDescription?: string
  orgAddress?: string
  orgPhone?: string
}
export interface OrgCreateResponse {
  message: string
  status_code: number
}
