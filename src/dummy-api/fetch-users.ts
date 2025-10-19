import type { FetchResult, UsersResponse } from './user.model'

export async function fetchUsers(): Promise<FetchResult> {
  try {
    const response = await fetch('https://dummyjson.com/users')
    if (!response.ok) {
      throw new Error(`Http error:  ${response.statusText} code: ${response.status}`)
    }
    const data = await response.json() as UsersResponse

    return { ok: true, data }
  }
  catch (e) {
    const message = e instanceof Error ? e.message : 'Не известная ошибка'
    console.error(e)
    return { ok: false, message }
  }
}
