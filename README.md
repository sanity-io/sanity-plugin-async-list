# sanity-plugin-async-list
This plugin fetches data from an external API and returns that data as options in a selectable list of strings. 

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install sanity-plugin-async-list
```

## Usage
### As a plugin
Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {asyncList} from 'sanity-plugin-async-list'

export default defineConfig({
  //...
  plugins: [
    asyncList({
      schemaType: 'disneyCharacter', // Name of type to be used in schema definitions
      url: 'https://api.disneyapi.dev/character', // URL to fetch against
      transform: (result: {data: {name: string}[]}) => // Modify fetched data before showing as options
        result.data.map((item) => {
          return {value: item.name, ...item}
        }),
    }),
  ],
})
```
Then in your schema definitions use the `schemaType` you set in `sanity.config.ts`
```ts
// schemaTypes/post.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'disney',
      type: 'disneyCharacter',
    }),
  ],
})


```

### As a component
Or access the component directly:

```ts
import {AsyncList} from 'sanity-plugin-async-list'

defineField({
  name: 'myString',
  components: {
    // Must pass the default props as the first argument
    input: (props) => AsyncList(props, config),
  },
})
```
### Example configurations
```ts
// sanity.config.ts
import {defineConfig} from 'sanity'
import {asyncList} from 'sanity-plugin-async-list'

export default defineConfig({
  // ...rest of config
  plugins: [
    asyncList({
      // Basic fetch with a minimal transformation
      schemaType: 'disneyCharacter',
      url: 'https://api.disneyapi.dev/character',
      transform: (result: {data: {name: string}[]}) =>
        result.data.map((item) => {
          return {value: item.name, ...item}
        }),
    }),
    // Similarly basic fetch but passing props to the underlying Autocomplete component
    asyncList({
      schemaType: 'pokemon',
      url: 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0',
      transform: (result: {results: {name: string}[]}) =>
        result.results.map((item) => {
          return {value: item.name, ...item}
        }),
      autocompleteProps: {
        placeholder: 'Search Pokemon',
      },
    }),
    // More advanced usage w/headers via fetchOptions
    asyncList({
      schemaType: 'parkInfo',
      url: 'https://developer.nps.gov/api/v1/parks?parkCode=acad',
      fetchOptions: {
        headers: {
          'X-Api-Key': process.env.SANITY_STUDIO_KEY ?? '',
        },
      },
      transform: (result: {data: {fullName: string}[]}) =>
        result.data.map((item) => {
          return {value: item.fullName, ...item}
        }),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
```

## Options
The plugin options are typed as `AsyncListPluginConfig` if you'd prefer to explore the options there.
### schemaType
`string` - Field type name for schema definitions 
### url
`string | URL` - URL to fetch data from
### fetchOptions
`RequestInit` - Passthrough for 2nd argument to fetch request for headers, body, etc.
### transform
`(result: any) => Array<{value: string} & Record<string, unknown>>` - Function to drill down into fetched data and modify it before passing to the built in `Autocomplete` component. The `Autocomplete` expects an array of objects with the property `value`. You can also pass additional properties in each object to use in custom option previews with `autocompleteProps.renderOption`
### autocompleteProps
`AutoCompleteProps` - Passthrough for the underlying Autocomplete component from @sanity/ui: https://www.sanity.io/ui/docs/component/autocomplete

## License

[MIT](LICENSE) © Chris LaRocque

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](TODO/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
