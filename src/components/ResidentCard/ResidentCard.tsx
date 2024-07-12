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
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { getResidentById, resetLoading } from '../../features/residents/residentSlice';

const ResidentCard: FC = () => {
	const { _id } = useParams<{ _id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const { resident, isLoading } = useSelector((state: RootState) => state.resident || {});

	useEffect(() => {
		dispatch(getResidentById(_id));
		return () => {
			dispatch(resetLoading());
		};
	}, [_id, dispatch]);

	if (isLoading || !resident) {
		return (
			<Container maxW='container.xl' padding={'2rem'} width={'100%'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
				<Spinner size='xl' />
			</Container>
		);
	}

	if (!Array.isArray(resident.sessions)) {
		return (
			<Container maxW='container.xl' padding={'2rem'} width={'100%'}>
				<Heading mb={'2rem'}>
					{resident.firstname} {resident.lastname}
				</Heading>
				<Text>No hay sesiones disponibles para este residente.</Text>
			</Container>
		);
	}

	return (
		<Container maxW='container.xl' padding={'2rem'} width={'100%'}>
			<Box display={'flex'} justifyContent={'space-between'} alignContent={'center'}>
				<Heading mb={'2rem'}>
					{resident.firstname} {resident.lastname}
				</Heading>
				<Menu>
					<MenuButton margin={'0'} as={Button} _hover={'transparent'}>
						Sessiones
					</MenuButton>
					<MenuList marginBottom={'1rem'}>
						{resident.sessions.map((session: any) => (
							<MenuItem key={session._id} height={'4rem'} display={'flex'} flexDirection={'column'}>
								<Text>Actividad: {session.activityId.title}</Text>
								<Text>Fecha de sesión: {new Date(session.sessionDate).toLocaleDateString()}</Text>
							</MenuItem>
						))}
					</MenuList>
				</Menu>
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
						{resident.address.street}, {resident.address.yardnumber}, {resident.address.zipcode}, {resident.address.city}, {resident.address.country}
					</Text>
					<Text mb={'1rem'}>Cumpleaños: {new Date(resident.birthday).toLocaleDateString()}</Text>
				</Box>
			</Stack>
			<Divider my={'2rem'}  bg={'brand.600'}/>
			<Text fontSize='lg' mb={'1rem'}>
				Información de emergencia:
			</Text>
			<Text mb={'1rem'} paddingLeft={'1rem'}>
				Contacto de emergencia: {resident.emergency.nameOfEmergencyContact}
			</Text>
			<Text mb={'1rem'} paddingLeft={'1rem'}>
				Teléfono de emergencia: {resident.emergency.phoneNumber}
			</Text>
			<Divider my={'2rem'} bg={'brand.600'}/>
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
