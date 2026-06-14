export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: Record<string, unknown>,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiClient<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    let data: Record<string, unknown> | undefined
    try {
      const errorBody = (await response.json()) as { message?: string; registrationId?: string }
      if (errorBody.message) {
        message = errorBody.message
      }
      data = errorBody
    } catch {
      // response body may not be JSON
    }
    throw new ApiError(message, response.status, data)
  }

  return response.json() as Promise<T>
}
