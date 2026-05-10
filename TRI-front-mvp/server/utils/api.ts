import type { H3Event } from 'h3'
import { getCookie, setCookie, deleteCookie } from 'h3'

const ACCESS_COOKIE = 'tri_access'
const REFRESH_COOKIE = 'tri_refresh'

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
}

export function setAuthCookies(event: H3Event, access: string, refresh?: string) {
  setCookie(event, ACCESS_COOKIE, access, { ...COOKIE_OPTS, maxAge: 60 * 30 })
  if (refresh) {
    setCookie(event, REFRESH_COOKIE, refresh, { ...COOKIE_OPTS, maxAge: 60 * 60 * 24 * 7 })
  }
}

export function clearAuthCookies(event: H3Event) {
  deleteCookie(event, ACCESS_COOKIE, { path: '/' })
  deleteCookie(event, REFRESH_COOKIE, { path: '/' })
}

export function getAccessCookie(event: H3Event): string | undefined {
  return getCookie(event, ACCESS_COOKIE)
}

export function getRefreshCookie(event: H3Event): string | undefined {
  return getCookie(event, REFRESH_COOKIE)
}

export async function apiFetch<T = any>(
  event: H3Event,
  path: string,
  options: any = {},
): Promise<T> {
  const { apiBase } = useRuntimeConfig()
  const url = `${apiBase}${path}`
  const access = getAccessCookie(event)
  const headers = {
    ...(options.headers || {}),
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  }
  try {
    return await $fetch<T>(url, { ...options, headers })
  } catch (err: any) {
    if (err?.response?.status !== 401 && err?.statusCode !== 401) throw err
    const refresh = getRefreshCookie(event)
    if (!refresh) {
      clearAuthCookies(event)
      throw err
    }
    let newAccess: string
    try {
      const refreshResp: any = await $fetch(`${apiBase}/auth/refresh/`, {
        method: 'POST',
        body: { refresh },
      })
      newAccess = refreshResp.access
    } catch {
      clearAuthCookies(event)
      throw err
    }
    setAuthCookies(event, newAccess)
    return await $fetch<T>(url, {
      ...options,
      headers: { ...(options.headers || {}), Authorization: `Bearer ${newAccess}` },
    })
  }
}
