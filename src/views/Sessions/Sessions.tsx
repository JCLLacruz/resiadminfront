import { FC, useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Divider, FormLabel, Heading, Input, Spinner, Text } from '@chakra-ui/react';

const Sessions: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { _id } = useParams<{ _id: string }>();
	const { sessions, isLoading: sessionsLoading } = useSelector((state: any) => state.session || {});

	const [filteredSessions, setFilteredSessions] = useState(sessions);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setFilteredSessions(sessions);
	}, []);

	useEffect(() => {
		if (searchTerm != '') {
			setFilteredSessions(sessions.filter((session: any) => session.createdAt.slice(0, 10) === searchTerm));
		}
	}, [searchTerm]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<>
			{_id != 'activity' ? (
				<Container maxW='container.xl'>
					<Heading size={'3xl'} marginY={'2rem'}>
						{`Sesiones de ${sessions[0].residentIds[0].firstname} ${sessions[0].residentIds[0].lastname}`}
					</Heading>
					<FormLabel>Buscar por fecha</FormLabel>
					<Box display={'flex'} gap={'0.5rem'}>
						<Input type='date' placeholder='Buscar por fecha' mb={'1rem'} value={searchTerm} onChange={handleChange} width={'50%'} />
						<Button onClick={() => dispatch(() => setFilteredSessions(sessions))}>Todas las sesiones</Button>
					</Box>{' '}
					{filteredSessions.length === 0 && <Text fontSize={'xl'}>No hay sesiones</Text>}
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
										<Heading size={'xl'} marginBottom={'1rem'}>
											Actividad: {session.activityId.title} el {session.createdAt.slice(0, 10)}
										</Heading>
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
						Sesiones de {sessions[0].activityId.title}
					</Heading>
					<FormLabel>Buscar por fecha</FormLabel>
					<Box display={'flex'} gap={'0.5rem'}>
						<Input type='date' placeholder='Buscar por fecha' mb={'1rem'} value={searchTerm} onChange={handleChange} width={'50%'} />
						<Button onClick={() => dispatch(() => setFilteredSessions(sessions))}>Todas las sesiones</Button>
					</Box>
					{filteredSessions.length === 0 && <Text fontSize={'xl'}>No hay sesiones</Text>}
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
										<Heading size={'xl'} marginBottom={'1rem'}>
											Fecha: {session.createdAt.slice(0, 10)}
										</Heading>
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
