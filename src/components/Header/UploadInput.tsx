import {
	Button,
	Icon,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useBreakpointValue,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiVideoPlus } from 'react-icons/bi';
import { db, putVideos } from '../../firebase/initFirebase';
import { useProps } from '../../hooks/PropsContext';
interface UploadProps {
	isMobile: any;
}

export function UploadInput() {
	const OverlayOne = () => (
		<ModalOverlay
			bg="blackAlpha.300"
			backdropFilter="blur(10px) hue-rotate(90deg)"
		/>
	);

	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [overlay, setOverlay] = useState(<OverlayOne />);
	const [link, setLink] = useState('');
	const { user } = useProps();
	const isMobile = useBreakpointValue({
		md: true,
		base: false,
	});

	return (
		<>
			<Button
				bg="none"
				variant="outline"
				color="gray.100"
				transition="all"
				_hover={{
					filter: 'brightness(.8)',
				}}
				onClick={() => {
					if (user === null) {
						toast({
							title: 'Login necessário! Faça login para continuar',
							description:
								'É necessário estar logado para adicionar um novo vídeo.',
							status: 'error',
							duration: 4000,
							isClosable: true,
						});
					} else {
						setOverlay(<OverlayOne />);
						onOpen();
					}
				}}
			>
				{isMobile && <Text>Adicione seu vídeo a plataforma</Text>}
				<Icon as={BiVideoPlus} fontSize="28" ml={['0', '0', '4']} />
			</Button>

			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent bg="gray.800">
					<ModalHeader>Cadastrar novo vídeo</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							bg="gray.600"
							value={link}
							variant="filled"
							placeholder="Cole o link do video aqui.."
							onChange={(e) => setLink(e.target.value)}
						/>
					</ModalBody>
					<ModalFooter justifyContent="space-between">
						<Button
							color="gray.100"
							_hover={{ filter: 'brightness(.8)' }}
							bg="red.500"
							onClick={() => {
								onClose;
								setLink('');
							}}
						>
							Close
						</Button>

						<Button
							onClick={() => {
								putVideos(db, link, user);
								onClose();
								setLink('');
							}}
							bg="none"
							variant="outline"
							color="gray.100"
							_hover={{ bg: 'gray.50', color: 'dark.black' }}
						>
							<Text mr="2">Confirmar</Text>
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
