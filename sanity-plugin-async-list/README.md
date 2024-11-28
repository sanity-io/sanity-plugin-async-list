# sanity-plugin-async-list

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install sanity-plugin-async-list
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {myPlugin} from 'sanity-plugin-async-list'

export default defineConfig({
  //...
  plugins: [myPlugin({})],
})
```

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

## License

[MIT](LICENSE) © Chris LaRocque

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
