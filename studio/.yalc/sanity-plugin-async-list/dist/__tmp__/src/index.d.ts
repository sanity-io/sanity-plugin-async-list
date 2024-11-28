import type { AutocompleteProps } from '@sanity/ui';
import { AsyncList } from './components/async-list';
export { AsyncList };
export interface AsyncListPluginConfig {
    url: string;
    /**
     * Pass request headers to the `fetch` call
     */
    headers?: Record<string, string>;
    /**
     * Parse fetched data to extract `value`
     *
     * The sanity/ui Autocomplete component requires an array of "options" objects, each with a `value` property
     */
    transform?: (result: unknown) => Array<{
        value: string;
    } & Record<string, unknown>>;
    autocompleteProps?: AutocompleteProps;
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
export declare const myPlugin: import("sanity").Plugin<AsyncListPluginConfig>;
