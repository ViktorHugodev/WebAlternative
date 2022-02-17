import {Flex, Icon, Input} from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'

export function SearchBox(){

  return (
    <Flex
    as="label"
    py="2"
    px="8"
    ml="6"
    maxWidth={400}
    flex="1"
    alignSelf="center"
    color="gray.800"
    position="relative"
    bg="gray.200"
    borderRadius="md">
      <Input
      placeholder="Buscar na plataforma"
      _placeholder={{color: "black.700"}}
      variant="unstyled"
   
      px="2"
      mr="2"/>
      <Icon as={RiSearchLine} color="gray.800"fontSize="20"/>
    </Flex>
  )
}