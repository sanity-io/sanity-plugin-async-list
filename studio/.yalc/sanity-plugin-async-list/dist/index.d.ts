import {ElementType} from 'react'
import {HTMLProps} from 'react'
import {JSX as JSX_2} from 'react'
import {MutableRefObject} from 'react'
import {Plugin as Plugin_2} from 'sanity'
import {ReactElement} from 'react'
import {ReactNode} from 'react'
import {Ref} from 'react'
import {RefCallback} from 'react'
import {StringInputProps} from 'sanity'

export declare const AsyncList: (
  props: StringInputProps,
  options: AsyncListPluginConfig,
) => JSX_2.Element

export declare interface AsyncListPluginConfig {
  url: string
  /**
   * Pass request headers to the `fetch` call
   */
  headers?: Record<string, string>
  /**
   * Parse fetched data to extract `value`
   *
   * The sanity/ui Autocomplete component requires an array of "options" objects, each with a `value` property
   */
  transform?: (result: unknown) => Array<
    {
      value: string
    } & Record<string, unknown>
  >
  autocompleteProps?: AutocompleteProps
}

/**
 * @public
 */
declare type AutocompleteOpenButtonProps = Omit<ButtonProps, 'as'> &
  Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref'>

/**
 * @public
 */
declare interface AutocompleteProps<
  Option extends BaseAutocompleteOption = BaseAutocompleteOption,
> {
  border?: boolean
  customValidity?: string
  filterOption?: (query: string, option: Option) => boolean
  fontSize?: number | number[]
  icon?: ElementType | ReactNode
  id: string
  /** @beta */
  listBox?: BoxProps
  loading?: boolean
  onChange?: (value: string) => void
  onQueryChange?: (query: string | null) => void
  onSelect?: (value: string) => void
  /** @beta */
  openButton?: boolean | AutocompleteOpenButtonProps
  /** @beta */
  openOnFocus?: boolean
  /** The options to render. */
  options?: Option[]
  padding?: number | number[]
  popover?: Omit<PopoverProps, 'content' | 'onMouseEnter' | 'onMouseLeave' | 'open'> &
    Omit<HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content' | 'ref' | 'width'>
  prefix?: ReactNode
  radius?: Radius | Radius[]
  /** @beta */
  relatedElements?: HTMLElement[]
  /** The callback function for rendering each option. */
  renderOption?: (option: Option) => ReactElement
  /** @beta */
  renderPopover?: (
    props: {
      content: ReactElement | null
      hidden: boolean
      inputElement: HTMLInputElement | null
      onMouseEnter: () => void
      onMouseLeave: () => void
    },
    ref: Ref<HTMLDivElement>,
  ) => ReactNode
  renderValue?: (value: string, option?: Option) => string
  suffix?: ReactNode
  /** The current value. */
  value?: string
}

/**
 * @public
 */
declare interface BaseAutocompleteOption {
  value: string
}

/**
 * @public
 */
declare type BoxDisplay = 'none' | 'block' | 'grid' | 'flex' | 'inline-block'

/**
 * @public
 */
declare type BoxHeight = 'stretch' | 'fill'

/**
 * @public
 */
declare type BoxOverflow = 'visible' | 'hidden' | 'auto'

/**
 * @public
 */
declare interface BoxProps
  extends ResponsiveFlexItemProps,
    ResponsiveBoxProps,
    ResponsiveGridItemProps,
    ResponsiveMarginProps,
    ResponsivePaddingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  forwardedAs?: React.ElementType | keyof JSX.IntrinsicElements
}

/**
 * @public
 */
declare type BoxSizing = 'content' | 'border'

/**
 * @public
 */
declare type ButtonMode = ThemeColorButtonModeKey

/**
 * @public
 */
declare interface ButtonProps extends ResponsivePaddingProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
  mode?: ButtonMode
  icon?: React.ElementType | React.ReactNode
  iconRight?: React.ElementType | React.ReactNode
  justify?: FlexJustify | FlexJustify[]
  /**
   * @beta Do not use in production, as this might change.
   */
  loading?: boolean
  selected?: boolean
  space?: number | number[]
  textAlign?: ButtonTextAlign
  muted?: boolean
  text?: React.ReactNode
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
  width?: ButtonWidth
}

/**
 * @public
 */
declare type ButtonTextAlign = 'left' | 'right' | 'center'

/**
 * @public
 */
declare type ButtonTone = ThemeColorStateToneKey

/**
 * @public
 */
declare type ButtonWidth = 'fill'

/**
 * @public
 */
declare type CardTone = ThemeColorCardToneKey | 'inherit'

/**
 * @public
 */
declare type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

/**
 * @public
 */
declare type FlexValue = number | 'none' | 'auto' | 'initial'

/**
 * @public
 */
declare type GridItemColumn = 'auto' | 'full' | number

/**
 * @public
 */
declare type GridItemColumnEnd = 'auto' | number

/**
 * @public
 */
declare type GridItemColumnStart = 'auto' | number

/**
 * @public
 */
declare type GridItemRow = 'auto' | 'full' | number

/**
 * @public
 */
declare type GridItemRowEnd = 'auto' | number

/**
 * @public
 */
declare type GridItemRowStart = 'auto' | number

/**
 * @public
 */
declare interface LayerProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  /** A callback that fires when the layer becomes the top layer when it was not the top layer before. */
  onActivate?: (props: {activeElement: HTMLElement | null}) => void
  zOffset?: number | number[]
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
export declare const myPlugin: Plugin_2<AsyncListPluginConfig>

/**
 * Placement of floating UI elements.
 *
 * @public
 */
declare type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

/**
 * @beta
 */
declare type PopoverMargins = [number, number, number, number]

/** @public */
declare interface PopoverProps
  extends Omit<LayerProps, 'as'>,
    ResponsiveRadiusProps,
    ResponsiveShadowProps {
  /** @beta */
  __unstable_margins?: PopoverMargins
  /**
   * Whether the popover should animate in and out.
   *
   * @beta
   * @defaultValue false
   */
  animate?: boolean
  arrow?: boolean
  /** @deprecated Use `floatingBoundary` and/or `referenceBoundary` instead */
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
  /**
     * When `true`, prevent overflow within the current boundary:
     * - by flipping on its side axis
     * - by resizing
     /*
     * Note that:
     * - setting `preventOverflow` to `true` also prevents overflow on its side axis
     * - setting `matchReferenceWidth` to `true` also causes the popover to resize
     *
     * @defaultValue false
     */
  constrainSize?: boolean
  content?: React.ReactNode
  disabled?: boolean
  fallbackPlacements?: Placement[]
  floatingBoundary?: HTMLElement | null
  /**
   * When `true`, set the maximum width to match the reference element, and also prevent overflow within
   * the current boundary by resizing.
   *
   * Note that setting `constrainSize` to `true` also causes the popover to resize
   *
   * @defaultValue false
   */
  matchReferenceWidth?: boolean
  open?: boolean
  overflow?: BoxOverflow
  padding?: number | number[]
  placement?: Placement
  /** Whether or not to render the popover in a portal element. */
  portal?: boolean | string
  preventOverflow?: boolean
  referenceBoundary?: HTMLElement | null
  /**
   * When defined, the popover will be positioned relative to this element.
   * The children of the popover won't be rendered.
   */
  referenceElement?: HTMLElement | null
  scheme?: ThemeColorSchemeKey
  tone?: CardTone
  /** @beta */
  updateRef?:
    | MutableRefObject<PopoverUpdateCallback | undefined>
    | RefCallback<PopoverUpdateCallback | undefined>
  width?: PopoverWidth | PopoverWidth[]
}

/** @beta */
declare type PopoverUpdateCallback = () => void

/** @public */
declare type PopoverWidth = number | 'auto'

/**
 * @public
 */
declare type Radius = number | 'full'

/**
 * @public
 */
declare interface ResponsiveBoxProps {
  display?: BoxDisplay | BoxDisplay[]
  height?: BoxHeight | BoxHeight[]
  overflow?: BoxOverflow | BoxOverflow[]
  sizing?: BoxSizing | BoxSizing[]
}

/**
 * @public
 */
declare interface ResponsiveFlexItemProps {
  /** Sets the flex CSS attribute. The property is responsive. */
  flex?: FlexValue | FlexValue[]
}

/**
 * @public
 */
declare interface ResponsiveGridItemProps {
  column?: GridItemColumn | GridItemColumn[]
  columnStart?: GridItemColumnStart | GridItemColumnStart[]
  columnEnd?: GridItemColumnEnd | GridItemColumnEnd[]
  row?: GridItemRow | GridItemRow[]
  rowStart?: GridItemRowStart | GridItemRowStart[]
  rowEnd?: GridItemRowEnd | GridItemRowEnd[]
}

/**
 * @public
 */
declare interface ResponsiveMarginProps {
  /** Applies margins to all sides. The property is responsive. */
  margin?: number | number[]
  /** Applies margins to the left and right sides. The property is responsive. */
  marginX?: number | number[]
  /** Applies margins to the top and bottom sides. The property is responsive. */
  marginY?: number | number[]
  marginTop?: number | number[]
  marginRight?: number | number[]
  marginBottom?: number | number[]
  marginLeft?: number | number[]
}

/**
 * @public
 */
declare interface ResponsivePaddingProps {
  padding?: number | number[]
  paddingX?: number | number[]
  paddingY?: number | number[]
  paddingTop?: number | number[]
  paddingRight?: number | number[]
  paddingBottom?: number | number[]
  paddingLeft?: number | number[]
}

/**
 * @public
 */
declare interface ResponsiveRadiusProps {
  radius?: Radius | Radius[]
}

/**
 * @public
 */
declare interface ResponsiveShadowProps {
  shadow?: number | number[]
}

/** @public */
declare const THEME_COLOR_BUTTON_MODES: readonly ['default', 'ghost', 'bleed']

/** @public */
declare const THEME_COLOR_CARD_TONES: readonly [
  'transparent',
  'default',
  'primary',
  'positive',
  'caution',
  'critical',
]

/** @public */
declare const THEME_COLOR_SCHEMES: readonly ['light', 'dark']

/** @public */
declare const THEME_COLOR_STATE_TONES: readonly [
  'default',
  'primary',
  'positive',
  'caution',
  'critical',
]

/** @public */
declare type ThemeColorButtonModeKey = (typeof THEME_COLOR_BUTTON_MODES)[number]

/** @public */
declare type ThemeColorCardToneKey = (typeof THEME_COLOR_CARD_TONES)[number]

/**
 * @public
 */
declare type ThemeColorSchemeKey = (typeof THEME_COLOR_SCHEMES)[number]

/** @public */
declare type ThemeColorStateToneKey = (typeof THEME_COLOR_STATE_TONES)[number]

export {}
