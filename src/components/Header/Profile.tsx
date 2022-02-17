import {Flex, Box, Avatar, Button,Text} from '@chakra-ui/react'

interface ProfileProps {
  user?: any
}

export function Profile({user }:any) {
  function formatName(name: string) {
    const nameBefore = `${user?.displayName.split(" ")[0]} ${user?.displayName.split(" ")[1]}` 
    console.log(nameBefore)
    return nameBefore
  }
  return (
    <Flex
      
      align="center">
   <Avatar src={user.photoURL} name={user?.displayName} size="sm" mr="4" />
    <Text>{formatName(user?.displayName)}</Text>
    </Flex>
  )
}