import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Box, BoxProps, Flex, Grid, Heading, Link, LinkProps, List, Item, Text, TextProps } from '../components'
import { useLeverPostings } from '../hooks/use-lever-postings'
import { AddressParagraph, Sidebar } from '../layout'
import { SectionProps } from './Section'

const UnderlineText = (props: TextProps) => <Text textDecoration="underline" {...props} />
const UnderlineLink = styled(Link)<LinkProps>`
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`

const EXCLUDED_JOBS = ['https://jobs.lever.co/centrifuge/c0f7a908-8d9e-4f3c-9b15-a4f81e033484']

const Careers = styled((props: SectionProps) => {
  const careers = useLeverPostings('centrifuge')

  if (careers === undefined) {
    return null
  }

  return (
    <Box {...props}>
      <Heading Text={UnderlineText} variant="heading4">
        Join our growing team at k/f
      </Heading>
      <Grid as={List} columns={1} gap="20px">
        {careers
          .filter(({ hostedUrl }) => !EXCLUDED_JOBS.includes(hostedUrl))
          .map((posting) => {
            const TextComponent = (props: TextProps) => (
              <UnderlineLink href={posting.hostedUrl ?? ''} target="_blank" {...props} />
            )
            return <Item key={posting.id} Text={TextComponent} children={posting.text} />
          })}
      </Grid>
    </Box>
  )
})`
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
`

const colors = ['#FCD1E3', '#FCB3D2', '#FC86B7', '#FC6CA9', '#FC539A', '#FC3A8B', '#FC1475'].reverse()

const Gradient = styled((props: BoxProps) => (
  <Flex flexDirection="column-reverse" {...props}>
    <Box flex={['1', '1', '1', '0']} minHeight={['62px', '62px', '62px', 'auto']} background={colors[0]}>
      <AddressParagraph display={['none', 'none', 'none', 'block']} p={2} />
    </Box>
    {colors.slice(1).map((color) => (
      <Box key={color} flex={['1', '1', '1', '0']} minHeight="62px" background={color} />
    ))}
  </Flex>
))``

export interface HiringEmailProps extends BoxProps {
  email: string
}

const HiringEmailLink = (props: LinkProps) => (
  <Link whiteSpace="nowrap" textDecoration="none" fontSize="32px" fontWeight="600" {...props} />
)

const HiringEmail = styled(({ email, ...rest }: HiringEmailProps) => (
  <Box as={HiringEmailLink} href={`mailto:${email}`} target="_blank" children={email} {...rest} />
))`
  transform-origin: top right;
  transform: rotate(-90deg) translateY(-100%);
`

export function SidebarHiring(props: BoxProps) {
  return (
    <Flex
      as={Sidebar}
      flexDirection={{ L: 'column' }}
      position={{ L: 'sticky' }}
      top={{ L: '0' }}
      maxHeight={{ L: '100vh' }}
      ml={[2, 3, 4, 0]}
      my={[2, 2, 2, 0]}
      borderWidth={['2px 0', '2px 0', '2px 0', '0 0 0 2px']}
      borderStyle="solid"
      borderColor="borderPrimary"
      overflow="visible"
      {...props}
    >
      <Box position="relative" flex="1">
        <Careers width="270px" py={[2, 2, 2, 3]} px={{ L: 3 }} />
        <HiringEmail position="absolute" top={[2, 2, 2, 4]} right={[0, 0, 0, '100%']} email="work@k-f.co" />
      </Box>
      <Gradient overflow="hidden" flex="1" maxWidth={['336px', '336px', '336px', '100%']} />
    </Flex>
  )
}

export default SidebarHiring
