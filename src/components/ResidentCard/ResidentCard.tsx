import {
	Box,
	Container,
	Divider,
	Heading,
	Stack,
	Text,
	Spinner,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Image,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { deleteResident, getResidentById, resetLoading } from '../../features/residents/residentSlice';
import { closeIcon, plusBoxIcon, trashIcon } from '../../assets/icons/icons';
import FormImageUpload from '../FormImageUpload/FormImageUpload';
import AllImages from '../AllImages/AllImages';

const ResidentCard: FC = () => {
	const { _id } = useParams<{ _id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { resident, images, isLoading } = useSelector((state: RootState) => state.resident || {});
	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [isUploadImageVisible, setIsUploadImageVisible] = useState(false);
	const [isAllImagesVisible, setIsAllImagesVisible] = useState(false);
	const [imageSrc, setImageSrc] = useState<any>('');

	useEffect(() => {
		dispatch(getResidentById(_id));
		return () => {
			dispatch(resetLoading());
		};
	}, [_id, dispatch]);

	const handleDeleteResident = (_id: string) => {
		dispatch(deleteResident(_id));
		navigate('/residents');
	};
	
	useEffect(() => {
		if(resident) {
			if(images.length > 0) {
				setImageSrc(images[images.length - 1].src);
			}
		}
	}, [resident, dispatch]);

	if (isLoading || !resident) {
		return (
			<Container maxW='container.xl' width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
				<Spinner size='xl' />
			</Container>
		);
	}

	if (!Array.isArray(resident.sessions)) {
		return (
			<Container maxW='container.xl' width={'100%'}>
				<Heading mb={'2rem'}>
					{resident.firstname} {resident.lastname}
				</Heading>
				<Text>No hay sesiones disponibles para este residente.</Text>
			</Container>
		);
	}

	return (
		<Container maxW='container.xl' width={'100%'}>
			{isUploadImageVisible && (
				<Box
					display={'flex'}
					flexDirection={'column'}
					position={'absolute'}
					top={'15rem'}
					alignItems={'center'}
					width={'600px'}
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
						marginX={'-1.60rem'}
						marginY={'-1.2rem'}
						alignSelf={'end'}
						fontSize={'2xl'}
						color={'brand.500'}
						onClick={isUploadImageVisible ? () => setIsUploadImageVisible(false) : () => setIsUploadImageVisible(true)}
					>
						{closeIcon}
					</Text>
					<FormImageUpload type='resident' id={resident._id}/>
				</Box>
			)}
			{isAllImagesVisible && (
				<Box
					display={'flex'}
					flexDirection={'column'}
					position={'absolute'}
					top={'15rem'}
					alignItems={'center'}
					width={'600px'}
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
						marginX={'-1.5rem'}
						marginY={'-1rem'}
						alignSelf={'end'}
						fontSize={'2xl'}
						color={'brand.500'}
						onClick={isAllImagesVisible ? () => setIsAllImagesVisible(false) : () => setIsAllImagesVisible(true)}
					>
						{closeIcon}
					</Text>
					<AllImages images={true}/>
				</Box>
			)}
			<Box display={'flex'} gap={'1rem'} justifyContent={'end'} marginBottom={'1rem'}>
				<Menu>
					<Button onClick={isAllImagesVisible ? () => setIsAllImagesVisible(false) : () => setIsAllImagesVisible(true)}>Todas las imagenes</Button>
					<MenuButton margin={'0'} as={Button} _hover={'transparent'}>
						Sessiones
					</MenuButton>
					<MenuList marginBottom={'1rem'}>
						{resident.sessions.length === 0 ? (
							<Text paddingX={'1rem'}>No hay sesiones registradas</Text>
						) : (
							resident.sessions.map((session: any) => (
								<MenuItem key={session._id} height={'4rem'} display={'flex'} flexDirection={'column'}>
									<Text>Actividad: {session.activityId.title}</Text>
									<Text>Fecha de sesión: {new Date(session.sessionDate).toLocaleDateString()}</Text>
								</MenuItem>
							))
						)}
					</MenuList>
				</Menu>
				<Button onClick={isAlertVisible ? () => setIsAlertVisible(false) : () => setIsAlertVisible(true)}>{trashIcon}</Button>
				{isAlertVisible && (
					<Box position={'absolute'} right={'1rem'} top={'7.5rem'} justifyContent='center' textAlign='center' height='200px' width={'350px'}>
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
								marginX={'-1.60rem'}
								marginY={'-1.2rem'}
								alignSelf={'end'}
								fontSize={'2xl'}
								color={'brand.500'}
								onClick={isAlertVisible ? () => setIsAlertVisible(false) : () => setIsAlertVisible(true)}
							>
								X
							</Text>
							<Text>¿Está seguro de querer eliminar este residente? Esta acción no se puede deshacer.</Text>
							<Button id='confirmLogoutButton' bg='red' size='sm' mt={4} onClick={() => handleDeleteResident(resident._id)}>
								Sí, eliminar
							</Button>
						</Box>
					</Box>
				)}
			</Box>
			<Box display={'flex'} justifyContent={'space-between'} alignContent={'center'}>
				<Heading mb={'2rem'} size={'3xl'}>
					{resident.firstname} {resident.lastname}
				</Heading>
			</Box>
			<Divider marginBottom={'2rem'} bg={'brand.600'} />
			<Box display={'flex'} gap={'1rem'}>
				<Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'200px'} height={'200px'}>
					{images.length == 0 ? (
						<Box width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} border={'solid'}>
							<Button
								padding={'2rem'}
								margin={'0'}
								as={Button}
								bg='transparent'
								_hover={'transparent'}
								onClick={isUploadImageVisible ? () => setIsUploadImageVisible(false) : () => setIsUploadImageVisible(true)}
							>
								{plusBoxIcon}
							</Button>
						</Box>
					) : (
						<Box width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
							<Image width={'120%'} src={imageSrc} onClick={isUploadImageVisible ? () => setIsUploadImageVisible(false) : () => setIsUploadImageVisible(true)}></Image>
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
