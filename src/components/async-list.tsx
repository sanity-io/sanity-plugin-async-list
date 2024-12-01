import {Autocomplete, Card, Flex, Spinner, Text} from '@sanity/ui'
import {type JSX, useCallback, useEffect, useState} from 'react'
import {set, type StringInputProps, unset} from 'sanity'

import type {AsyncListPluginConfig} from '..'

// Object for Autocomplpete's `options` prop
interface OptionsItem {
  value: string
  [key: string]: unknown
}

// Autocomplete options validation
function validOptions(arr: unknown): arr is OptionsItem[] {
  return (
    Array.isArray(arr) &&
    arr.length > 0 &&
    arr.every((item) => typeof item === 'object' && item !== null && 'value' in item)
  )
}

export const AsyncList = (props: StringInputProps, options: AsyncListPluginConfig): JSX.Element => {
  const [data, setData] = useState<OptionsItem[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    try {
      // Reset previous error state
      setError(null)
      setLoading(true)

      // Fetch with configurable headers
      const response = await fetch(options.url, options.fetchOptions ?? {})

      // Parse JSON
      let result = await response.json()

      // Optional transformation
      if (options.transform) {
        result = options.transform(result)
      }

      // Validate and set data
      if (validOptions(result)) {
        setData(result)
      } else {
        console.error(
          'sanity-plugin-async-list data error - use `transform` to make data match options from @sanity/ui Autocomplete https://www.sanity.io/ui/docs/component/autocomplete',
          result,
        )
        setError(new Error('Error with list data. Check console for more info.'))
      }
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unknown error occurred while fetching data'

      console.error('sanity-plugin-async-list fetch error:', errorMessage)
      setError(new Error('Error fetching list, check console for more info'))
    } finally {
      // Ensure loading state is always updated
      setLoading(false)
    }
  }, [options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Set value in content lake
  const handleChange = useCallback(
    (value?: string) => props.onChange(value ? set(value) : unset()),
    [props],
  )

  // Render loading state
  if (loading) {
    return (
      <Card>
        <Flex justify="center">
          <Spinner />
        </Flex>
      </Card>
    )
  }

  // Render error state
  if (error) {
    const readOnlyProps = {
      ...props,
      elementProps: {...props.elementProps, readOnly: true},
    }

    return (
      <Card>
        {readOnlyProps.renderDefault(readOnlyProps)}
        <Card tone="critical" padding={2}>
          <Text size={1}>{error.message}</Text>
        </Card>
      </Card>
    )
  }

  // Render autocomplete
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
