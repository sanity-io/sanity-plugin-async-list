import type {AutocompleteProps} from '@sanity/ui'
import {definePlugin} from 'sanity'

import {AsyncList} from './components/async-list'
import {schema} from './schema-types'

export {AsyncList}

export interface AsyncListPluginConfig {
  /**
   * Field type name for list
   */
  schemaType: string
  /**
   * URL to make request to
   */
  url: string | URL | globalThis.Request
  /**
   * Pass request headers to the `fetch` call
   */
  headers?: HeadersInit
  /**
   * Parse fetched data to extract `value`
   *
   * The sanity/ui Autocomplete component requires an array of "options" objects, each with a `value` property
   *
   * https://www.sanity.io/ui/docs/component/autocomplete
   */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  transform?: (result: any) => Array<{value: string} & Record<string, unknown>>
  autocompleteProps?: AutocompleteProps
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {myPlugin} from 'sanity-plugin-async-list'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [myPlugin()],
 * })
 * ```
 */
export const asyncList = definePlugin<AsyncListPluginConfig>((config) => {
  if (!config.schemaType) {
    throw new Error('schemaType required by async-list plugin')
  }
  return {
    name: 'sanity-plugin-async-list',
    schema: schema(config),
  }
})
