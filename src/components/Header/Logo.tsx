import { Text } from '@chakra-ui/react';
import Link from 'next/link';

export function Logo() {
	return (
		<Link href="/">
			<a>
				<Text
					fontSize={['xl', '2xl', '3xl']}
					fontWeight="bold"
					letterSpacing="tight"
					maxW="64"
					ml="2"
				>
					WebAlternative
					<Text as="span" ml="1" mr="2" color="red.500">
						.
					</Text>
				</Text>
			</a>
		</Link>
	);
}
