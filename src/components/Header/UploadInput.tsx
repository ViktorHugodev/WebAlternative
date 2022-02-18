import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
	useDisclosure,
	Input,
	Icon,
	Flex,
	Box,
	Spacer,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { putVideos, db } from '../../firebase/initFirebase';
import { BiVideoPlus } from 'react-icons/bi';
import { useProps } from '../../hooks/PropsContext';
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
						console.log(user);
						toast({
							title: 'Login necessário! Faça login para continuar',
							description:
								'É necessário estar logado para adicionarm novo vídeo.',
							status: 'error',
							duration: 4000,
							isClosable: true,
						});
					} else {
						console.log(user);
						setOverlay(<OverlayOne />);
						onOpen();
					}
				}}
			>
				<Text>Adicione seu vídeo a plataforma</Text>
				<Icon as={BiVideoPlus} fontSize="28" ml="4" />
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
							onClick={onClose}
						>
							Close
						</Button>

						<Button
							onClick={() => {
								putVideos(db, link, user);
								onClose();
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
