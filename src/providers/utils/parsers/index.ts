export function parseHttpErrors(error: any) {
  return error.response.data.errors || error.response.data.message
}
