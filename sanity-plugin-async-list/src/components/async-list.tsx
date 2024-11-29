import {Autocomplete, Card, Flex, Spinner, Text} from '@sanity/ui'
import {type JSX, useCallback, useEffect, useState} from 'react'
import {set, type StringInputProps, unset} from 'sanity'

import type {AsyncListPluginConfig} from '..'

// Confirm array being returned will work with Autocomplete
function validArray(arr: unknown) {
  if (!Array.isArray(arr)) {
    return false
  }
  return (
    arr.length > 0 &&
    arr.every((item) => typeof item === 'object' && item !== null && item.hasOwnProperty('value'))
  )
}
export const AsyncList = (props: StringInputProps, options: AsyncListPluginConfig): JSX.Element => {
  const [data, setData] = useState<Array<{value: string} & Record<string, unknown>> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | Error>(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(options.url, {headers: options.headers ?? {}})

      let result = await response.json()

      if (options.transform) {
        result = options.transform(result)
      }

      if (validArray(result)) {
        setData(result)
      } else {
        console.error(
          'sanity-plugin-async-list: Problem with passed data, do you need to use the `transform` function?',
          result,
        )
        setError(new Error('Error parsing data, check console for more info.'))
      }
      setLoading(false)
    } catch (e) {
      console.error(e)
      //   setError(e instanceof Error ? e : new Error(String(e)))
      setError(new Error('Error fetching data, check console for more info.'))
      setLoading(false)
    }
  }, [options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleChange = useCallback(
    (value?: string) => props.onChange(value ? set(value) : unset()),
    [props],
  )
  if (loading) {
    return (
      <Card>
        <Flex justify="center">
          <Spinner />
        </Flex>
      </Card>
    )
  }

  if (error) {
    const readOnly = {
      ...props,
      elementProps: {...props.elementProps, readOnly: true},
    }
    return (
      <Card>
        {readOnly.renderDefault(readOnly)}
        <Card tone="critical" padding={2}>
          <Text size={1}>{error.message}</Text>
        </Card>
      </Card>
    )
  }

  return (
    <Card>
      {data && (
        <Autocomplete
          id={`async-list-${options.schemaType}`}
          openButton
          onChange={handleChange}
          options={data}
          value={props.value}
          {...options.autocompleteProps}
        />
      )}
    </Card>
  )
}
