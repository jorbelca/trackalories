
export let BACKEND_API_URL

if (process.env.REACT_APP_TEST === 'true') {
  BACKEND_API_URL = process.env.REACT_APP_API_URL_TEST
} else { BACKEND_API_URL = process.env.REACT_APP_API_URL }

export const NUTRITION_API_URL = process.env.REACT_APP_NUTRITION_API_URL
export const X_APP_ID = process.env.REACT_APP_X_APP_ID
export const X_APP_KEY = process.env.REACT_APP_X_APP_KEY