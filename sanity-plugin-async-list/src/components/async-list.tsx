import {Autocomplete, Card} from '@sanity/ui'
import {type JSX, useEffect, useState} from 'react'
import {set, type StringInputProps, unset} from 'sanity'

import type {AsyncListPluginConfig} from '..'

export const AsyncList = (props: StringInputProps, options: AsyncListPluginConfig): JSX.Element => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | Error>(null)
  console.log('options', options)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(options.url, {headers: options.headers ?? {}})
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        let result = await response.json()
        if (options.transform) {
          result = options.transform(result)
        }
        console.log('result', result)
        setData(result)
        setLoading(false)
      } catch (e) {
        console.error(e)
        setError(e instanceof Error ? e : new Error(String(e)))
        setLoading(false)
      }
    }

    fetchData()
  }, [options])
  const handleChange = (value?: string) => props.onChange(value ? set(value) : unset())
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Card>
      {data && (
        <Autocomplete
          id="async-list"
          openButton
          onChange={handleChange}
          options={data}
          {...options.autocompleteProps}
        />
      )}
    </Card>
  )
}
