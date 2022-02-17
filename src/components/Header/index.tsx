import { Flex, useBreakpointValue, IconButton, Icon, Button } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
// import { useSidebarDrawer } from '../../Contexts/SideBarDrawerContext'
import { Logo } from './Logo'
import {  UploadButton } from './UploadButton'
import { UploadInput } from './UploadInput'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'
import {useProps} from '../../hooks/PropsContext'

export function Header(){
  // const {onOpen} = useSidebarDrawer()
  const {user, signIn} = useProps()
  console.log(user)
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg:true
  })
  return (
   <Flex w="100%" maxWidth={1480} bg="dark.black" h="14" mx="auto" boxShadow="xl" px="6" align="center" justifyContent="space-between">
    {/*      
     {!isWideVersion && (
       <IconButton
       mr="2"
       variant="unstyled"
       fontSize="24"
       aria-label="Open navigation"
       onClick={onOpen}
       icon={<Icon as={RiMenuLine}/>}
       />
     )} */}
     
    <Logo/>
    {/* {isWideVersion && (<SearchBox/>)} */}

 
      <UploadInput></UploadInput>
      {/* <UploadButton /> */}
      {!user ? <Button onClick={() => signIn()}>Login Google</Button> : <Profile user={user} signIn={signIn} /> }
    

    </Flex>
    
  )
}