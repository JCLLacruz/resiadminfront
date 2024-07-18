import { Box, Container, Divider, Heading, Stack, Text, Spinner, Button, Image } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { deleteResident, getResidentById, resetLoading } from '../../features/residents/residentSlice';
import { closeIcon, plusBoxIcon, trashIcon } from '../../assets/icons/icons';
import ImageUploadForm from '../ImageUploadForm/ImageUploadForm';
import AllImages from '../AllImages/AllImages';
import { UserInterface } from '../../interfaces/authInterfaces';
import { getSessionsByResidentId } from '../../features/sessions/sessionSlice';

const ResidentCard: FC = () => {
	const { _id } = useParams<{ _id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { resident, image, images, isLoading, imagesIsLoading } = useSelector((state: RootState) => state.resident || {});
	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [isUploadImageVisible, setIsUploadImageVisible] = useState(false);
	const [isAllImagesVisible, setIsAllImagesVisible] = useState(false);
	const [imageSrc, setImageSrc] = useState<any>('');
	const user: UserInterface = JSON.parse(localStorage.getItem('user') || '{}');

	useEffect(() => {
		if (_id) {
			dispatch(getResidentById(_id));
			dispatch(getSessionsByResidentId(_id));
		}
		return () => {
			dispatch(resetLoading());
		};
	}, [_id, dispatch]);

	const handleDeleteResident = (_id: string) => {
		dispatch(deleteResident(_id));
		navigate('/residents');
	};

	useEffect(() => {
		if (images.length > 0) {
			setImageSrc(images[images.length - 1].src);
		}
	}, [images, image]);

	useEffect(() => {		
		if (images.length > 0) {
			setImageSrc(images[images.length - 1].src);
		} else{
			setImageSrc(image?.src);
		}
	}, [image]);

	if (isLoading || !resident) {
		return (
			<Container maxW='container.xl' width={'100vw'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
				<Spinner size='xl' />
			</Container>
		);
	}

	return (
		<Container maxW='container.xl' paddingBottom={'10rem'} overflowY={'auto'}>
			{isUploadImageVisible && (
				<Box
					display={'flex'}
					flexDirection={'column'}
					position={'fixed'}
					top={'15rem'}
					left={'50%'}
					transform={'translateX(-50%)'}
					alignItems={'center'}
					width={'90%'}
					borderWidth='1px'
					borderRadius='lg'
					overflow='hidden'
					boxShadow='md'
					paddingX={'2rem'}
					paddingY={'1rem'}
					bg='white'
					zIndex={1000}
				>
					<Text
						position={'absolute'}
						top={2}
						right={2}
						fontSize={'2xl'}
						color={'brand.500'}
						cursor={'pointer'}
						onClick={() => setIsUploadImageVisible(false)}
					>
						{closeIcon}
					</Text>
					<ImageUploadForm type='resident' id={resident._id} />
				</Box>
			)}
			{isAllImagesVisible && (
				<Box
					display={'flex'}
					flexDirection={'column'}
					position={'fixed'}
					top={'15rem'}
					left={'50%'}
					transform={'translateX(-50%)'}
					alignItems={'center'}
					width={'90%'}
					borderWidth='1px'
					borderRadius='lg'
					overflow='hidden'
					boxShadow='md'
					paddingX={'2rem'}
					paddingY={'1rem'}
					bg='white'
					zIndex={1000}
				>
					<Text
						position={'absolute'}
						top={2}
						right={2}
						fontSize={'2xl'}
						color={'brand.500'}
						cursor={'pointer'}
						onClick={() => setIsAllImagesVisible(false)}
					>
						{closeIcon}
					</Text>
					<AllImages images={true} />
				</Box>
			)}
			<Box display={'flex'} gap={'1rem'} justifyContent={'end'} marginBottom={'1rem'}>
				<Button onClick={() => setIsAllImagesVisible(!isAllImagesVisible)}>Todas las imagenes</Button>
				<Button onClick={() => navigate('/sessions/' + resident._id)}>Sesiones</Button>
				{user.role === 'superadmin' && <Button onClick={() => setIsAlertVisible(!isAlertVisible)}>{trashIcon}</Button>}
				{isAlertVisible && (
					<Box position={'absolute'} right={'1rem'} top={'7.5rem'} justifyContent='center' textAlign='center' height='200px' width={'350px'} zIndex={1000}>
						<Box
							display={'flex'}
							flexDirection={'column'}
							alignItems={'center'}
							borderWidth='1px'
							borderRadius='lg'
							overflow='hidden'
							boxShadow='md'
							paddingX={'2rem'}
							paddingY={'1rem'}
							bg='white'
						>
							<Text
								position={'absolute'}
								top={2}
								right={2}
								fontSize={'2xl'}
								color={'brand.500'}
								cursor={'pointer'}
								onClick={() => setIsAlertVisible(false)}
							>
								{closeIcon}
							</Text>
							<Text>¿Está seguro de querer eliminar este residente? Esta acción no se puede deshacer.</Text>
							<Button bg='red' size='sm' mt={4} onClick={() => handleDeleteResident(resident._id)}>
								Sí, eliminar
							</Button>
						</Box>
					</Box>
				)}
			</Box>
			<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
				<Heading mb={'2rem'} size={'3xl'}>
					{resident.firstname} {resident.lastname}
				</Heading>
			</Box>
			<Divider marginBottom={'2rem'} bg={'brand.600'} />
			<Box display={'flex'} gap={'1rem'}>
				<Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'80%'} height={'60%'}>
					{image == null ? (
						<Box width={'100%'} height={'250px'} display={'flex'} justifyContent={'center'} alignItems={'center'} border={'solid'}>
							{imagesIsLoading ? (
								<Spinner size='xl' />
							) : (
								<Button padding={'2rem'} margin={'0'} bg='transparent' _hover={{ bg: 'transparent' }} onClick={() => setIsUploadImageVisible(true)}>
									{plusBoxIcon}
								</Button>
							)}
						</Box>
					) : (
						<Box width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
							<Image width={'120%'} src={imageSrc} cursor={'pointer'} onClick={() => setIsUploadImageVisible(true)} />
						</Box>
					)}
				</Box>
				<Stack direction={{ base: 'column', md: 'row' }} spacing='24px'>
					<Box>
						<Text fontSize='lg' mb={'1rem'}>
							Información de contacto:
						</Text>
						<Text mb={'1rem'} paddingLeft={'1rem'}>
							Email: {resident.email}
						</Text>
						<Text mb={'1rem'} paddingLeft={'1rem'}>
							Teléfono: {resident.phoneNumber}
						</Text>
						<Text mb={'1rem'}>Dirección:</Text>
						<Text mb={'1rem'} paddingLeft={'1rem'}>
							{resident.address.street}, {resident.address.yardnumber}, {resident.address.zipcode}, {resident.address.city},{' '}
							{resident.address.country}
						</Text>
						<Text mb={'1rem'}>Cumpleaños: {new Date(resident.birthday).toLocaleDateString()}</Text>
					</Box>
				</Stack>
			</Box>
			<Divider my={'2rem'} bg={'brand.600'} />
			<Text fontSize='lg' mb={'1rem'}>
				Información de emergencia:
			</Text>
			<Text mb={'1rem'} paddingLeft={'1rem'}>
				Contacto de emergencia: {resident.emergency.nameOfEmergencyContact}
			</Text>
			<Text mb={'1rem'} paddingLeft={'1rem'}>
				Teléfono de emergencia: {resident.emergency.phoneNumber}
			</Text>
			<Divider my={'2rem'} bg={'brand.600'} />
			<Text fontSize='lg' mb={'1rem'}>
				Más información:
			</Text>
			<Text mb={'1rem'} paddingLeft={'1rem'}>
				{resident.moreinfo}
			</Text>
		</Container>
	);
};

export default ResidentCard;