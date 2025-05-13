function isDefined<T>(
  value: T | null | undefined,
): value is Exclude<T, null | undefined> {
  return value !== undefined && value !== null
}

export function getQueryString(params: Record<string, unknown>): string {
  const qs: string[] = []
  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach((value) => {
          qs.push(
            `${encodeURIComponent(key)}[]=${encodeURIComponent(String(value))}`,
          )
        })
      } else {
        qs.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
        )
      }
    }
  })
  if (qs.length > 0) {
    return qs.join('&')
  }
  return ''
}
