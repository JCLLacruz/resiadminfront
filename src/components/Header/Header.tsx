import { Box, Button, Container, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { switchOffIcon } from '../../assets/icons/icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { logoutUser, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Footer: FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const logout = () => {
		setIsVisible(false);
		dispatch(logoutUser());
		reset();
		navigate('/');
	};

	return (
		<Container
			display={'flex'}
			padding={'0'}
			paddingRight={'1rem'}
			marginBottom={'1rem'}
			maxW='container.xxl'
			height={'3.5rem'}
			bg='brand.50'
			position={'sticky'}
			top={'0'}
			boxShadow='0 10px 6px rgba(0, 0, 0, 0.1)'
			alignItems={'center'}
			justifyContent={'end'}
			zIndex={1000}
		>
			<Button id='logoutButton' onClick={isVisible ? () => setIsVisible(false) : () => setIsVisible(true)}>
				{switchOffIcon}
			</Button>
			{isVisible && (
				<Box position={'absolute'} top={'5rem'} justifyContent='center' textAlign='center' height='200px' width={'350px'}>
					<Box
						display={'flex'}
						flexDirection={'column'}
						alignItems={'center'}
						borderWidth='1px'
						borderRadius='lg'
						overflow='hidden'
						maxW='sm'
						boxShadow='md'
						paddingX={'2rem'}
						paddingY={'1rem'}
						zIndex={1000}
						bg='white'
					>
						<Text position={'absolute'} padding={'0'} marginX={'-1.60rem'} marginY={'-1.2rem'} alignSelf={'end'} fontSize={'2xl'} color={'brand.500'} onClick={isVisible ? () => setIsVisible(false) : () => setIsVisible(true)}>X</Text>
						<Text>¿Está seguro de querer cerrar sesión?</Text>
						<Button id='confirmLogoutButton' bg='red' size='sm' mt={4} onClick={logout}>
							Sí, cerrar sesión
						</Button>
					</Box>
				</Box>
			)}
		</Container>
	);
};

export default Footer;
