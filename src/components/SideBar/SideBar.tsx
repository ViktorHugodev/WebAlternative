import {Stack} from '@chakra-ui/react'
import { RiHome2Line, RiVideoLine } from 'react-icons/ri'
import {NavLink} from './NavLink'
import {NavContent} from './NavContent'

export function SidebarNav(){
  return (
    <Stack spacing="12" align="center" justifyContent="center">
    <NavContent >
      <NavLink href="/dashboard" icon={RiHome2Line}>Início</NavLink>
      <NavLink href="/users"icon={RiVideoLine}>Vídeos</NavLink>
    </NavContent>
 
  </Stack>
  )
}