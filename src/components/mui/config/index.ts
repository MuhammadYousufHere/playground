import { servicesEndpoints, LIMIT } from './apiConstants'

const drawerWidth = 250

const KEYS = {
  theme: 'pa-theme',
  lang: 'pa-i18nextLang',
  token: 'pa-accessToken'
}
const HEADER = {
  MOBILE_HEIGHT: 54,
  MAIN_DESKTOP_HEIGHT: 56,
  DASHBOARD_DESKTOP_HEIGHT: 56,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32
}

const NAVBAR = {
  BASE_WIDTH: 250,
  DASHBOARD_WIDTH: 250,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32
}
export { NAVBAR, HEADER, servicesEndpoints, drawerWidth, KEYS, LIMIT }
