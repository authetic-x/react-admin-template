import Cookie from 'js-cookie'

const TOKEN_KEY = 'token-key'

export function getToken() {
  return Cookie.get(TOKEN_KEY)
}

export function setToekn(token: any) {
  return Cookie.set(TOKEN_KEY, token)
}

export function removeToken() {
  return Cookie.remove(TOKEN_KEY)
}