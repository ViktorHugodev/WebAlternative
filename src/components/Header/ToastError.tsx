import { useToast, Button } from '@chakra-ui/react';
export function ToastError() {
	const toast = useToast();
	return (
		<Button
			bg="red.500"
			onClick={() =>
				toast({
					title: 'Login necessário! Faça login para continuar',
					description:
						'É necessário estar logado para adicionar um novo vídeo.',
					status: 'error',
					duration: 9000,
					isClosable: true,
				})
			}
		></Button>
	);
}
