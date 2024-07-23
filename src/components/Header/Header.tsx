import { Box, Button, Container, Image, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { closeIcon, switchOffIcon, userIcon } from '../../assets/icons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { logoutUser, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Footer: FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const { currentUser, image, images } = useSelector((state: any) => state.auth || {});
	const [imageSrc, setImageSrc] = useState<any>('');
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		if (images.length > 0) {
			setImageSrc(images[images.length - 1].src);
		}
	}, [images, image]);

	useEffect(() => {
		if (images.length > 0) {
			setImageSrc(images[images.length - 1].src);
		} else {
			setImageSrc(image?.src);
		}
	}, [image]);

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
			justifyContent={'space-between'}
			zIndex={1000}
		>
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
				{image == null ? userIcon : <Image width={'100%'} height={'100%'} src={imageSrc} objectFit={'cover'} borderRadius={'50%'} />}
			</Box>
			{currentUser.role === 'superadmin' && <Button onClick={() => navigate('/users')}>Empleados</Button>}
			</Box>
			<Button id='logoutButton' onClick={isVisible ? () => setIsVisible(false) : () => setIsVisible(true)}>
				{switchOffIcon}
			</Button>
			{isVisible && (
				<Box position={'absolute'} top={'4rem'} justifyContent='center' textAlign='center' height='200px' width={'350px'}>
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
						<Text
							position={'absolute'}
							padding={'0'}
							marginX={'-1.80rem'}
							marginY={'-0.8rem'}
							alignSelf={'end'}
							fontSize={'2xl'}
							onClick={isVisible ? () => setIsVisible(false) : () => setIsVisible(true)}
						>
							{closeIcon}
						</Text>
						<Text marginTop={'1rem'} marginBottom={'0.5rem'}>
							¿Está seguro de querer cerrar sesión?
						</Text>
						<Button id='confirmLogoutButton' bg='red' size='sm' mt={4} onClick={logout}>
							Sí, cerrar sesión!
						</Button>
					</Box>
				</Box>
			)}
		</Container>
	);
};

export default Footer;
