import qs from 'qs'

export function createURLParams(params = {}) {
  const numOfParams = Object.keys(params).length

  return `${numOfParams > 0 ? '/?' : ''}${qs.stringify(params, {
    arrayFormat: 'repeat',
  })}`
}
