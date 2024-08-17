import { Box, Button, Container, Heading, Image, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { switchOffIcon, userIcon } from '../../assets/icons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { logoutUser, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { resetSuccess } from '../../features/server/serverSlice';
import useWindowSize from '../../hooks/useWindowSize';

const Footer: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { currentUser, user, image, images } = useSelector((state: any) => state.auth || {});
	const [imageSrc, setImageSrc] = useState<any>('');
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const isMobile = useWindowSize();

	useEffect(() => {
		setTimeout(() => {
			if (currentUser.images.length > 0 && currentUser?._id === user?._id) {
				if (images.length > 0) {
					setImageSrc(images[0].src);
				} else {
					setImageSrc('');
				}
			}
		}, 1000);
	}, [images, image]);

	useEffect(() => {
		isMobile ? navigate('/activities') : navigate('/adminpanel');
	}, [useWindowSize, isMobile]);

	const logout = () => {
		onClose();
		dispatch(logoutUser());
		dispatch(reset());
		dispatch(resetSuccess());
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
			justifyContent={'space-between'}
			zIndex={1000}
		>
			{isMobile ? (
				<Box display={'flex'} alignItems={'center'} gap={'1rem'}>
					<Box
						height={'3rem'}
						width={'3rem'}
						marginLeft={'1rem'}
						backgroundColor={'brand.100'}
						borderRadius={'50%'}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						onClick={() => navigate('/usercard/' + currentUser._id)}
					>
						{imageSrc == '' ? userIcon : <Image width={'100%'} height={'100%'} src={imageSrc} objectFit={'cover'} borderRadius={'50%'} />}
					</Box>
					{currentUser.role === 'superadmin' && (
						<>
							<Button onClick={() => navigate('/users')}>Empleados</Button>
							<Button onClick={() => navigate('/information')}>Información</Button>
						</>
					)}
				</Box>
			) : (
				<Heading cursor={'pointer'} onClick={() => navigate('/adminpanel')} marginLeft={'1rem'}>
					Panel administrador
				</Heading>
			)}
			<Box display={'flex'} justifyContent={'end'}>
				<Button id='logoutButton' onClick={onOpen}>
					{switchOffIcon}
				</Button>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} size={'xs'} isCentered={false}>
				<ModalOverlay />
				<ModalContent backgroundColor={'transparent'} border={'none'} boxShadow={'none'}>
					<ModalBody padding={0}>
						<Box
							display={'flex'}
							flexDirection={'column'}
							alignItems={'center'}
							borderWidth='1px'
							overflow='hidden'
							paddingX={'2rem'}
							paddingY={'1rem'}
							bg='white'
							backgroundColor={'brand.50'}
							border={'solid'}
							borderColor={'brand.500'}
							borderRadius={'10px'}
						>
							<Text marginTop={'1rem'} marginBottom={'0.5rem'}>
								¿Está seguro de querer cerrar sesión?
							</Text>{' '}
							<Button bg='red' size='sm' _hover={{ bg: 'red' }} mt={4} onClick={logout}>
								Sí, cerrar sesión
							</Button>
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Container>
	);
};

export default Footer;
