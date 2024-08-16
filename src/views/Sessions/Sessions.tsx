import { FC, useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	Divider,
	FormLabel,
	Heading,
	Input,
	Spinner,
	Text,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { trashIcon } from '../../assets/icons/icons';
import { deleteSession } from '../../features/sessions/sessionSlice';

const Sessions: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { type } = useParams<{ type: string }>();
	const { sessions, isLoading: sessionsLoading } = useSelector((state: any) => state.session || {});
	const { activity } = useSelector((state: any) => state.activity || {});
	const { resident } = useSelector((state: any) => state.resident || {});

	const [filteredSessions, setFilteredSessions] = useState(sessions);
	const [searchTerm, setSearchTerm] = useState('');
	const [idSessionToDelete, setIdSessionToDelete] = useState('');

	useEffect(() => {
		setFilteredSessions(sessions);
	}, [sessions]);

	useEffect(() => {
		if (searchTerm != '') {
			setFilteredSessions(sessions.filter((session: any) => session.createdAt.slice(0, 10) === searchTerm));
		}
	}, [searchTerm, sessions]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleDeleteSession = () => {
		dispatch(deleteSession(idSessionToDelete));
		onClose();
		setFilteredSessions(sessions.filter((session: any) => session._id !== idSessionToDelete));
	};

	return (
		<>
			<Container
				maxW='container.md'
				paddingBottom={'10rem'}
				overflowY={'auto'}
				border={'solid'}
				borderColor={'brand.500'}
				borderRadius={'10px'}
				padding={'1rem'}
				marginBottom={'7rem'}
			>
				{type !== 'activity' ? (
					<>
						<Heading size={'3xl'} marginY={'2rem'}>
							{`Sesiones de ${resident.firstname} ${resident.lastname}`}
						</Heading>
						<Divider bg={'brand.500'} marginY={'1rem'} />
						<FormLabel>Buscar por fecha</FormLabel>
						<Box display={'flex'} gap={'0.5rem'}>
							<Input type='date' placeholder='Buscar por fecha' mb={'1rem'} value={searchTerm} onChange={handleChange} width={'50%'} />
							<Button onClick={() => setFilteredSessions(sessions)}>Todas las sesiones</Button>
						</Box>
						<Divider bg={'brand.500'} marginY={'1rem'} />
						{sessions.length === 0 && <Text fontSize={'xl'}>No hay sesiones</Text>}
						{sessionsLoading ? (
							<Box width={'100vw'} height={'100vh'}>
								<Spinner size='xl' />
							</Box>
						) : (
							<>
								{filteredSessions.map((session: any) => (
									<Box key={`session_${session._id}`} marginTop={'1rem'}>
										<Divider bg={'brand.700'} marginBottom={'1rem'} />
										<Box>
											<Box display={'flex'} justifyContent={'space-between'} marginBottom={'1rem'}>
												<Heading size={'xl'} marginBottom={'1rem'}>
													Actividad: {session.activityId.title} el {session.createdAt.slice(0, 10)}
												</Heading>
												<Button
													backgroundColor={'red'}
													_hover={{ bg: 'red' }}
													size={'l'}
													onClick={() => {
														setIdSessionToDelete(session._id);
														onOpen();
													}}
												>
													{trashIcon}
												</Button>
											</Box>
											<Text key={`textFilteredSessions_${session._id}`} fontSize={'xl'}>
												Observaciones: {session.observations}
											</Text>
										</Box>
									</Box>
								))}
							</>
						)}
					</>
				) : (
					<>
						<Heading size={'3xl'} marginY={'2rem'}>
							Sesiones de {activity.title}
						</Heading>
						<Divider bg={'brand.500'} marginY={'1rem'} />
						<FormLabel>Buscar por fecha</FormLabel>
						<Box display={'flex'} gap={'0.5rem'}>
							<Input type='date' placeholder='Buscar por fecha' mb={'1rem'} value={searchTerm} onChange={handleChange} width={'50%'} />
							<Button onClick={() => setFilteredSessions(sessions)}>Todas las sesiones</Button>
						</Box>
						<Divider bg={'brand.500'} marginY={'1rem'} />
						{sessions.length === 0 && <Text fontSize={'xl'}>No hay sesiones</Text>}
						{sessionsLoading ? (
							<Box width={'100vw'} height={'100vh'}>
								<Spinner size='xl' />
							</Box>
						) : (
							<>
								{filteredSessions.map((session: any) => (
									<Box key={`activitySession_${session._id}`} marginTop={'1rem'}>
										<Box>
											<Box display={'flex'} justifyContent={'space-between'} marginBottom={'1rem'}>
												<Heading size={'xl'} marginBottom={'1rem'}>
													Fecha: {session.createdAt.slice(0, 10)}
												</Heading>
												<Button
													backgroundColor={'red'}
													_hover={{ bg: 'red' }}
													onClick={() => {
														setIdSessionToDelete(session._id);
														onOpen();
													}}
												>
													{trashIcon}
												</Button>
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
					</>
				)}
			</Container>
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
							<Text>¿Está seguro de querer eliminar esta sesión? Esta acción no se puede deshacer.</Text>
							<Button bg='red' size='sm' _hover={{ bg: 'red' }} mt={4} onClick={handleDeleteSession}>
								Sí, eliminar
							</Button>
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Sessions;
