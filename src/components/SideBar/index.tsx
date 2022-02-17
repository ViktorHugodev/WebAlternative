import { Box, Flex } from '@chakra-ui/react';
import { NavLink } from './NavLink';
import { SidebarNav } from './SideBar';
import { RiHome2Line, RiVideoLine } from 'react-icons/ri';

export function Sidebar() {
	return (
		<Flex as="aside" w="24" bg="dark.black" align="center">
			<Flex flexDirection="column" w="100%"  m="0 auto">
				<NavLink title="Início"_hover={{bg: 'gray.300'}} href="/" icon={RiHome2Line} />
			
				<NavLink href="/" icon={RiVideoLine} title="Vídeos"/> 
		

			</Flex>
		</Flex>
	);
}
