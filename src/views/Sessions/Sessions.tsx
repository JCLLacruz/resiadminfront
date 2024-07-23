import { FC, useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Divider, FormLabel, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import { closeIcon, trashIcon } from '../../assets/icons/icons';
import { deleteSession } from '../../features/sessions/sessionSlice';

const Sessions: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { _id } = useParams<{ _id: string }>();
	const { sessions, isLoading: sessionsLoading } = useSelector((state: any) => state.session || {});
	const {activity} = useSelector((state: any) => state.activity || {});
	const {resident} = useSelector((state: any) => state.resident || {});

	const [filteredSessions, setFilteredSessions] = useState(sessions);
	const [searchTerm, setSearchTerm] = useState('');
	const [isAlertVisible, setIsAlertVisible] = useState(false);

	useEffect(() => {
		setFilteredSessions(sessions);
	}, [dispatch]);

	useEffect(() => {
		if (searchTerm != '') {
			setFilteredSessions(sessions.filter((session: any) => session.createdAt.slice(0, 10) === searchTerm));
		}
	}, [searchTerm]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleDeleteSession = (id: string) => {
		dispatch(deleteSession(id));
		setIsAlertVisible(false);
		setFilteredSessions(sessions.filter((session: any) => session._id !== id));
	};

	const renderAlert = (id: string) => {
		return (
			<>
				{isAlertVisible && (
					<Box
						position={'absolute'}
						right={'10%'}
						top={'50%'}
						justifyContent='center'
						textAlign='center'
						height='200px'
						width={'350px'}
						zIndex={1000}
					>
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
							<Text>¿Está seguro de querer eliminar esta sessión? Esta acción no se puede deshacer.</Text>
							<Button bg='red' size='sm' _hover={{ bg: 'red' }} mt={4} onClick={() => handleDeleteSession(id)}>
								Sí, eliminar
							</Button>
						</Box>
					</Box>
				)}
			</>
		);
	};

	return (
		<>
			{_id != 'activity' ? (
				<Container maxW='container.xl' marginBottom={'5rem'}>
					<Heading size={'3xl'} marginY={'2rem'}>
						{`Sesiones de ${resident.firstname} ${resident.lastname}`}
					</Heading>
					<Divider bg={'brand.500'} marginY={'1rem'} />
					<FormLabel>Buscar por fecha</FormLabel>
					<Box display={'flex'} gap={'0.5rem'}>
						<Input type='date' placeholder='Buscar por fecha' mb={'1rem'} value={searchTerm} onChange={handleChange} width={'50%'} />
						<Button onClick={() => dispatch(() => setFilteredSessions(sessions))}>Todas las sesiones</Button>
					</Box>
					<Divider bg={'brand.500'} marginY={'1rem'} />
					{sessions.length === 0 && (<Text fontSize={'xl'}>No hay sesiones</Text>)}
					{sessionsLoading ? (
						<>
							<Box width={'100vw'} height={'100vh'}>
								<Spinner size='xl' />
							</Box>
						</>
					) : (
						<>
							{filteredSessions.map((session: any) => (
								<Box key={`session_${session._id}`} marginTop={'1rem'}>
									<Divider bg={'brand.700'} marginBottom={'1rem'} />
									<Box>
										<Box display={'flex'} justifyContent={'space-between'}>
											<Heading size={'xl'} marginBottom={'1rem'}>
												Actividad: {session.activityId.title} el {session.createdAt.slice(0, 10)}
											</Heading>
											<Button
												backgroundColor={'red'}
												_hover={{ bg: 'red' }}
												size={'l'}
												onClick={() => {
													setIsAlertVisible(true);
												}}
											>
												{trashIcon}
											</Button>
											{renderAlert(session._id)}
										</Box>
										<Text key={`textFilteredSessions_${session._id}`} fontSize={'xl'}>
											Observaciones: {session.observations}
										</Text>
									</Box>
								</Box>
							))}
						</>
					)}
				</Container>
			) : (
				<Container maxW='container.xl' marginBottom={'5rem'}>
					<Heading size={'3xl'} marginY={'2rem'}>
						Sesiones de {activity.title}
					</Heading>
					<Divider bg={'brand.500'} marginY={'1rem'} />
					<FormLabel>Buscar por fecha</FormLabel>
					<Box display={'flex'} gap={'0.5rem'}>
						<Input type='date' placeholder='Buscar por fecha' mb={'1rem'} value={searchTerm} onChange={handleChange} width={'50%'} />
						<Button onClick={() => dispatch(() => setFilteredSessions(sessions))}>Todas las sesiones</Button>
					</Box>
					<Divider bg={'brand.500'} marginY={'1rem'} />
					{sessions.length === 0 && (<Text fontSize={'xl'}>No hay sesiones</Text>)}
					{sessionsLoading ? (
						<>
							<Box width={'100vw'} height={'100vh'}>
								<Spinner size='xl' />
							</Box>
						</>
					) : (
						<>
							{filteredSessions.map((session: any) => (
								<Box key={`activitySession_${session._id}`} marginTop={'1rem'}>
									<Box>
										<Box display={'flex'} justifyContent={'space-between'}>
											<Heading size={'xl'} marginBottom={'1rem'}>
												Fecha: {session.createdAt.slice(0, 10)}
											</Heading>
											<Button
												backgroundColor={'red'}
												_hover={{ bg: 'red' }}
												size={'l'}
												onClick={() => {
													setIsAlertVisible(true);
												}}
											>
												{trashIcon}
											</Button>
											{renderAlert(session._id)}
										</Box>
										<Text fontSize={'xl'}>Observaciones: {session.observations}</Text>
									</Box>
									<Box marginY={'1rem'}>
										<Heading size={'xl'} marginBottom={'1rem'}>
											Participantes: {session.residentIds.length}
										</Heading>
										<Box display={'flex'} gap={'1rem'} flexWrap={'wrap'}>
											{session.residentIds.map((resident: any) => (
												<Box key={`resident_${session._id}_${resident._id}`}>
													<Button onClick={() => navigate('/residentcard/' + resident._id)}>
														{resident.firstname} {resident.lastname}
													</Button>
												</Box>
											))}
										</Box>
									</Box>
									<Divider bg={'brand.500'} marginY={'1rem'} />
								</Box>
							))}
						</>
					)}
				</Container>
			)}
		</>
	);
};

export default Sessions;
