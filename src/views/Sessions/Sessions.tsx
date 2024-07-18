import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { getAllSessions } from '../../features/sessions/sessionSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Divider, FormLabel, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import { getResidentById } from '../../features/residents/residentSlice';

const Sessions: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { _id } = useParams<{ _id: string }>();
	const { sessions, isLoading: sessionsLoading, error: sessionsError } = useSelector((state: any) => state.session || {});
	const { resident: residentState, isLoading: residentLoading, error: residentError } = useSelector((state: any) => state.resident || {});
	const { activity: activityState } = useSelector((state: any) => state.activity || {});
	const activity = JSON.parse(localStorage.getItem('activity') || '{}');
	const resident = JSON.parse(localStorage.getItem('resident') || '{}');

	const [filteredSessions, setFilteredSessions] = useState(sessions);
	const [searchTerm, setSearchTerm] = useState('');

	const filteredResidentSessions = () => {
		return sessions.filter((session: any) => session.residentIds.some((resident: any) => resident._id === _id));
	};

	const filteredActivitySessions = () => {
		return sessions.filter((session: any) => session.activityId._id === activity._id);
	};

	useEffect(() => {
		dispatch(getAllSessions());
		if (_id != 'activity') {
			dispatch(getResidentById(_id));
		}
		if (activityState) {
			localStorage.setItem('activity', JSON.stringify(activityState));
		}
		if (residentState) {
			localStorage.setItem('resident', JSON.stringify(residentState));
		}
		return () => {
			localStorage.removeItem('resident');
			localStorage.removeItem('activity');
		};
	}, [dispatch]);

	useEffect(() => {
		if (_id != 'activity' && sessions.length > 0) {
			setFilteredSessions(filteredResidentSessions());
		}
		if (_id == 'activity') {
			setFilteredSessions(filteredActivitySessions());
		}
	}, [sessions, _id]);

	useEffect(() => {
		setFilteredSessions(sessions.filter((session: any) => session.createdAt.slice(0, 10) === searchTerm));
	}, [searchTerm]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	if (sessionsLoading || residentLoading) {
		return (
			<Box width={'100vw'} height={'100vh'}>
				<Spinner size='xl' />
			</Box>
		);
	}

	if (sessionsError || residentError) {
		return (
			<Box width={'100vw'} height={'100vh'}>
				<Text>Error loading data...</Text>
			</Box>
		);
	}

	return (
		<>
			{_id != 'activity' ? (
				<Container maxW='container.xl'>
					<Heading size={'3xl'} marginY={'2rem'}>
						{_id ? `Sesiones de ${resident?.firstname}` : 'Sesiones'}
					</Heading>
					<FormLabel>Buscar por fecha</FormLabel>
					<Input type='date' placeholder='Buscar por fecha' mb={'1rem'} value={searchTerm} onChange={handleChange} />
					{filteredSessions.length === 0 && <Text fontSize={'xl'}>No hay sesiones</Text>}
					{filteredSessions.map((session: any) => (
						<Box key={`session_${session._id}`} marginTop={'1rem'}>
							<Divider bg={'brand.700'} />
							<Box>
								<Heading size={'xl'} marginBottom={'1rem'}>
									Actividad: {session.activityId.title} el {session.createdAt.slice(0, 10)}
								</Heading>
								<Text key={`textFilteredSessions_${session._id}`} fontSize={'xl'}>Observaciones: {session.observations}</Text>
							</Box>
						</Box>
					))}
				</Container>
			) : (
				<Container maxW='container.xl'>
					<Heading size={'3xl'} marginY={'2rem'}>
						Sesiones de {activity.title}
					</Heading>
					<FormLabel>Buscar por fecha</FormLabel>
					<Input type='date' placeholder='Buscar por fecha' mb={'1rem'} value={searchTerm} onChange={handleChange} />
					{filteredSessions.length === 0 && <Text fontSize={'xl'}>No hay sesiones</Text>}
					{filteredSessions.map((session: any) => (
						<Box key={`activitySession_${session._id}`} marginTop={'1rem'}>
							<Divider bg={'brand.700'} />
							<Box>
								<Heading size={'xl'} marginBottom={'1rem'}>
									Fecha: {session.createdAt.slice(0, 10)}
								</Heading>
								<Text fontSize={'xl'}>Observaciones: {session.observations}</Text>
							</Box>
							<Box marginY={'1rem'}>
								<Heading size={'xl'} marginBottom={'1rem'}>
									Participantes
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
				</Container>
			)}
		</>
	);
};

export default Sessions;
