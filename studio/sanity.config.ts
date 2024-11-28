import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myPlugin} from 'sanity-plugin-async-list'
export default defineConfig({
  name: 'default',
  title: 'delete me',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'plugin',

  plugins: [
    structureTool(),
    visionTool(),
    myPlugin({
      url: 'https://api.disneyapi.dev/character',
      headers: {},
      transform: (result) =>
        result.data.map((item) => {
          return {value: item.name}
        }),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
