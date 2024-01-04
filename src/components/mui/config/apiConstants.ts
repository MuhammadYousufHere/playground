export const LIMIT = 25
const USER = import.meta.env.VITE_APP_USER_SERVICE
const SCAN = import.meta.env.VITE_APP_SCAN_SERVICE
const CELERY = import.meta.env.VITE_APP_CELERY_SERVICE

export const servicesEndpoints = {
  userService: `${USER}/`,
  scanService: `${SCAN}/`,
  celeryService: `${CELERY}/`
  // more to come...
}
