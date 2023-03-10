export const setHeader = (token) => {
  return { Authorization: `Bearer ${token}` }
}