import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Container, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { switchOffIcon } from '../../assets/icons/icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { logoutUser, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Footer: FC = () => {
	const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
	const [isAlertVisible, setIsAlertVisible] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

	const showAlert = () => {
		if (isAlertVisible) {
			onOpen();
		} else {
			onClose();
		}
	};

	useEffect(() => {
		showAlert();
	}, [isAlertVisible]);

    const logout = () => {
        onClose();
        dispatch(logoutUser());
        reset();
        navigate('/');
    }

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
			<Button id='logoutButton' onClick={isAlertVisible ?() => setIsAlertVisible(false) : () => setIsAlertVisible(true)}>
				{switchOffIcon}
			</Button>
			{isVisible && (
				<Alert
					position={'absolute'}
					top={'5rem'}
					status='error'
					variant='subtle'
					justifyContent='center'
					textAlign='center'
					height='200px'
					width={'350px'}
				>
					<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
						<AlertIcon boxSize='40px' />
						<AlertTitle mt={4} mb={1} fontSize='lg'>
							Cerrando sesión
						</AlertTitle>
						<AlertDescription maxWidth='sm'>¿Está seguro de querer cerrar sesión?</AlertDescription>
						<Button id='confirmLogoutButton' bg='red' size='sm' mt={4} onClick={logout}>
							Sí, cerrar sesión
						</Button>
					</Box>
				</Alert>
			)}
		</Container>
	);
};

export default Footer;
