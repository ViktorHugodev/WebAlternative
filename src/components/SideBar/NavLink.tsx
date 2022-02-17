import { Icon, Link as ChakraLink, LinkProps, Text, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { ElementType } from 'react'


interface NavLinkProps extends LinkProps {
  title: string
  icon: ElementType
  href: string
}

export function NavLink({ title, icon, href,...rest}: NavLinkProps){
  return (
  <Link href={href} passHref>
    <ChakraLink display="flex"align="center" {...rest} >
      <Flex flexDirection="column" align="center" mt="4"justifyContent="center"

      >
        
      <Icon as={icon} fontSize="30"/>
      <Text textAlign="center"  fontWeight="medium" >{title}</Text>
      </Flex>
    </ChakraLink>
  </Link>
  
  )
}