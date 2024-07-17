import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { getAllSessions } from '../../features/sessions/sessionSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Divider, Heading, Text } from '@chakra-ui/react';
import { getResidentById } from '../../features/residents/residentSlice';

const Sessions: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
	const { _id } = useParams<{ _id: string }>();
	const { sessions } = useSelector((state: any) => state.session || {});
	const { resident } = useSelector((state: any) => state.resident || {});
	const { activity } = useSelector((state: any) => state.activity || {});

	const [filteredSessions, setFilteredSessions] = useState(sessions);

	useEffect(() => {
		dispatch(getAllSessions());
		dispatch(getResidentById(_id));
	}, [dispatch]);

	useEffect(() => {
		if (_id != 'activity' && sessions.length > 0) {
			const filteredResidentSessions = () => {
				const filter = sessions.filter((session: any) => session.residentIds.some((resident: any) => resident._id === _id));
				setFilteredSessions(filter);
			};
			filteredResidentSessions();
		}
		if (_id == 'activity') {
			const filteredActivitySessions = () => {
				const filter = sessions.filter((session: any) => session.activityId._id === activity._id);
				setFilteredSessions(filter);
			};
			filteredActivitySessions();
		}
	}, [sessions, _id]);
	console.log('id', _id);
	console.log('activity', activity);
	console.log('filteredSessions', filteredSessions);

	return (
		<>
			{_id != 'activity' ? (
				<Container maxW='container.xl'>
					<Heading size={'3xl'} marginY={'2rem'}>
						{_id ? `Sesiones de ${resident.firstname}` : 'Sesiones'}
					</Heading>
					{filteredSessions.map((session: any) => (
						<>
							<Divider bg={'brand.700'} />
							<Box key={session._id} marginTop={'1rem'}>
								<Box>
									<Heading size={'xl'} marginBottom={'1rem'}>
										Actividad: {session.activityId.title} el {session.createdAt.slice(0, 10)}
									</Heading>
									<Text fontSize={'xl'}>Observaciones: {session.observations}</Text>
								</Box>
							</Box>
						</>
					))}
				</Container>
			) : (
				<Container maxW='container.xl'>
					<Heading size={'3xl'} marginY={'2rem'}>
						Sesiones de {activity.title}
					</Heading>
					{filteredSessions.map((session: any) => (
						<>
							<Divider bg={'brand.700'} />
							<Box key={session._id} marginTop={'1rem'}>
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
                                        {session.residentIds.map((resident:any) => (
                                            <Box>
                                                <Button onClick={()=> navigate('/residentcard/' + resident._id)}>{resident.firstname} {resident.lastname}</Button>
                                            </Box>
                                        ))}
                                    </Box>
								</Box>
							</Box>
                            <Divider bg={'brand.500'} marginY={'1rem'}/>

						</>
					))}
				</Container>
			)}
		</>
	);
};

export default Sessions;
