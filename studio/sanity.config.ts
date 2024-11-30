import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {asyncList} from 'sanity-plugin-async-list'
interface DisneyCharacter {
  _id: number
  films: string[]
  shortFilms: string[]
  tvShows: string[]
  videoGames: string[]
  parkAttractions: string[]
  allies: string[]
  enemies: string[]
  sourceUrl: string
  name: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  url: string
  __v: number
}
export default defineConfig({
  name: 'default',
  title: 'delete me',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'plugin',

  plugins: [
    structureTool(),
    visionTool(),

    asyncList({
      schemaType: 'disneyCharacter',
      url: 'https://api.disneyapi.dev/character',
      transform: (result: {data: DisneyCharacter[]}) =>
        result.data.map((item) => {
          return {value: item.name, ...item}
        }),
    }),
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
    // More advanced usage w/headers
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
