import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react';
interface SignInProps {
	signIn: () => void;
}
export default function GoogleButton({ signIn }: SignInProps) {
	return (
		<Center p={[4, 4, 8]}>
			<Button
				transition="all .3s"
				_hover={{
					filter: 'brightness(.6)',
				}}
				w={['10rem', '14rem']}
				maxW={'md'}
				variant={'outline'}
				onClick={signIn}
				leftIcon={<FcGoogle />}
			>
				<Center>
					<Text fontSize={['12px', '16px', '18px']}>Entrar com Google</Text>
				</Center>
			</Button>
		</Center>
	);
}
