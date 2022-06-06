import * as Fabric from '@centrifuge/fabric'
import * as FabricFlex from '@centrifuge/fabric/dist/components/Flex'
import React, { AnchorHTMLAttributes } from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { ColorProps, system, TypographyProps } from 'styled-system'

export function forwardAs<T, P>(
  Component: React.ComponentType<P & { forwardedAs?: T }>
): React.ComponentType<P & { as?: T }> {
  return ({ as, ...rest }: any) => <Component forwardedAs={as as any} {...rest} />
}

// Box

export interface BoxProps extends Omit<React.HTMLAttributes<never>, 'color'>, Fabric.StyledBoxProps {
  as?: string | React.ComponentType
  transform?: string
  children?: React.ReactNode
}
export const Box = styled(Fabric.Box)<BoxProps>(system({ transform: true }))

// Layout

export interface ContainerProps extends Fabric.ContainerProps {
  children?: React.ReactNode
}
export const Container: React.ComponentType<ContainerProps> = Fabric.Container

export interface FlexProps extends FabricFlex.FlexProps {
  children?: React.ReactNode
}
export const Flex: React.ComponentType<FlexProps> = FabricFlex.Flex

export interface GridProps extends Fabric.GridProps {
  children?: React.ReactNode
}
export const Grid: React.ComponentType<GridProps> = Fabric.Grid

// Text

export interface TextProps extends TypographyProps, ColorProps {
  as?: string | React.ComponentType
  cursor?: string
  textDecoration?: string
  whiteSpace?: string
  children?: React.ReactNode
}
export const Text = forwardAs(
  styled(({ as = 'span', ...rest }: TextProps) => {
    return <Fabric.Text as={as} {...rest} />
  })<TextProps>(system({ cursor: true, whiteSpace: true, textDecoration: true }))
)
export const span = Text

// Paragraph

export type ParagraphProps = BoxProps & {
  Text?: React.ComponentType<TextProps>
  variant?: keyof DefaultTheme['typography']
}
export function Paragraph(props: ParagraphProps) {
  const { Text: TextComponent = Text, variant = `body1`, children, ...rest } = props
  return (
    <Box as="p" my={[1, 2]} {...rest}>
      <TextComponent variant={variant}>{children}</TextComponent>
    </Box>
  )
}
export const p = Paragraph

// Headings

export type HeadingProps = BoxProps & {
  Text?: React.ComponentType<TextProps>
  as?: string | React.ComponentType
  variant?: keyof DefaultTheme['typography']
  badge?: React.ReactNode
}
export function Heading(props: HeadingProps) {
  const { Text: TextComponent = Text, as = `h2`, variant = `heading2`, badge, children, ...rest } = props
  return (
    <Box as={as} position="relative" m={0} mb={2} {...rest}>
      <TextComponent variant={variant}>{children}</TextComponent>
      {badge}
    </Box>
  )
}
export const h1 = (props: BoxProps) => <Heading as="h1" variant="heading1" {...props} />
export const h2 = (props: BoxProps) => <Heading as="h2" variant="heading2" {...props} />
export const h3 = (props: BoxProps) => <Heading as="h3" variant="heading3" {...props} />
export const h4 = (props: BoxProps) => <Heading as="h4" variant="heading4" {...props} />
export const h5 = (props: BoxProps) => <Heading as="h5" variant="heading5" {...props} />
export const h6 = (props: BoxProps) => <Heading as="h6" variant="heading6" {...props} />

// Links

export interface LinkProps extends TextProps, Omit<AnchorHTMLAttributes<'a'>, 'color'> {}
export function Link(props: LinkProps) {
  return <Text as="a" cursor="pointer" textDecoration="underline" {...props} />
}
export const a = Link

// Images

export interface ImageProps
  extends Fabric.StyledBoxProps,
    Omit<React.ImgHTMLAttributes<never>, 'width' | 'height' | 'color'> {
  as?: string | React.ComponentType
  transform?: string
  children?: React.ReactNode
}
export function Image(props: ImageProps) {
  return <Box as="img" {...props} />
}
export const img = Image

// Lists

export type ListProps = BoxProps
export function List(props: ListProps) {
  return <Box as="ul" {...props} />
}
export const ul = List

export type ItemProps = BoxProps & {
  Text?: React.ComponentType<TextProps>
}
export function Item({ Text: TextComponent = Text, children, ...rest }: ItemProps) {
  return (
    <Box as="li" {...rest}>
      <TextComponent>{children}</TextComponent>
    </Box>
  )
}
export const li = Item

// Export component shortcodes for MDX integration

export const shortcodes = { h1, h2, h3, h4, h5, h6, span, a, p, img, ul, li }
