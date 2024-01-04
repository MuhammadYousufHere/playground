/* eslint-disable security/detect-object-injection */
/**
 * Extracts the specified property from an array of items.
 * Each item is expected to have the specified property of type string.
 *
 * @param {T[]} items - An array of items to extract property from.
 * @param {K} property - The name of the property to extract.
 * @return {string[]} An array of extracted property values.
 *
 * @template T
 * @typedef {object} T
 * @property {string} K
 */
export const extractProperty = <T, K extends keyof T>(items: T[], property: K): T[K][] =>
  items.map(item => item[property])

/**
 * An error that should not be displayed to the user (used when an error
 * occurs but the message has already been displayed to the user).
 */
export class SilentError extends Error {
  constructor(message?: string) {
    super(message)

    this.name = 'SilentError'
  }
}

/**
 * Removes the trailing slash from a url path if one is present.
 */
export const removeTrailingSlash = (path: string) => {
  if (path[path.length - 1] === '/') {
    return path.slice(0, -1)
  }

  return path
}

/**
 * Removes the Ellipsis from a string if one is present.
 */
export const trimEllipsis = (str: string, maxLength: number): string => {
  if (!str || maxLength <= 0) {
    return ''
  }

  return str.length > maxLength ? `${str.substr(0, maxLength)}…` : str
}

/**
 * adds the Ellipsis to the the string.
 */
export const truncate = (children: string): string => {
  return [children.substring(0, 6), '…', children.substring(children.length - 4)].join('')
}

export const sortArr = (arr: string[]) => {
  return arr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
}
// export const partial = (fn, ...args) => fn.bind(null, ...args)

// const _pipe =
//   (f, g) =>
//   (...args) =>
//     g(f(...args))

// export const pipe = (...fns) => fns.reduce(_pipe)
