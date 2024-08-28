import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import {
	Box,
	Button,
	Container,
	Divider,
	Heading,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	Tfoot,
	Spinner,
} from '@chakra-ui/react';
import { groupOptions, sudivisionGroupOptions } from '../../utils/formOptions';
import { ActivityInterface } from '../../interfaces/activityIntefaces';
import { SessionInterface } from '../../interfaces/sessionInterfaces';
import { formatDate } from '../../utils/functions';
import { getAllActivities } from '../../features/activities/activitySlice';
import { getAllSessions } from '../../features/sessions/sessionSlice';

const Statistics: FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const { sessions, isLoading } = useSelector((state: RootState) => state.session || {});
	const { activities } = useSelector((state: RootState) => state.activity || {});
	const [sessionsByMonth, setSesionsByMonth] = useState<SessionInterface[]>([]);
	const [sessionsByGroup, setSesionsByGroup] = useState<SessionInterface[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<string>('I');
	const [selectedSubdivision, setSelectedSubdivision] = useState<string>('A');
	const [month, setMonth] = useState<number>(+formatDate(new Date().toISOString()).slice(3, 5));

	console.log('sessions', sessions);
	console.log('sessionsByGroup', sessionsByGroup);
	console.log('selectedGroup', selectedGroup);
	console.log('selectedSubdivision', selectedSubdivision);
	console.log('month', month);
	console.log('sessionsByMonth', sessionsByMonth);

	useEffect(() => {
		dispatch(getAllSessions());
		dispatch(getAllActivities());
	}, []);

	useEffect(() => {
		if (sessions) {
			setSesionsByMonth(sessions.filter((session: SessionInterface) => +session.createdAt.slice(5, 7) === month));
		}
	}, [sessions, month]);

	useEffect(() => {
		if (sessions) {
			setSesionsByGroup(
				sessionsByMonth.filter(
					(session: SessionInterface) => session.group.identificator === selectedGroup && session.group.subdivision === selectedSubdivision
				)
			);
		}
	}, [selectedSubdivision, selectedGroup, sessionsByMonth]);

	const handleChangeMonth = (value: string) => setMonth(+value);

	return (
		<Container
			maxW='container.xl'
			marginBottom={'7rem'}
			overflowY={'auto'}
			border={'solid'}
			borderColor={'brand.500'}
			borderRadius={'10px'}
			padding={'1rem'}
			backgroundColor={'brand.50'}
			sx={{ scrollbarWidth: 'none' }}
		>
			{isLoading ? (
				<Box display={'flex'} justifyContent={'center'}>
					<Spinner size='xl' />
				</Box>
			) : (
				<>
					<Box>
						<Box display={'flex'} mb={'1rem'} gap={'1rem'}>
							{groupOptions.map((group, i) => (
								<Button
									key={i + group}
									onClick={() => {
										setSelectedGroup(group);
										selectedGroup == 'II' && setSelectedSubdivision('A');
										selectedGroup == 'I' && setSelectedSubdivision('');
									}}
								>{`Grupo ${group}`}</Button>
							))}
						</Box>
						{selectedGroup == 'I' && (
							<Box display={'flex'} mb={'1rem'} gap={'1rem'}>
								{sudivisionGroupOptions.map((subdivision, i) => (
									<Button key={i + subdivision} onClick={() => setSelectedSubdivision(subdivision)}>{`Subdivisón ${subdivision}`}</Button>
								))}
							</Box>
						)}
						<Box display={'flex'} alignItems={'center'}>
							<Box display={'flex'} alignItems={'center'}>
								<Text marginRight={'0.25rem'}>Mes:</Text>
								<NumberInput size='md' maxW={20} defaultValue={month} min={1} max={12} onChange={handleChangeMonth}>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</Box>
						</Box>
					</Box>
					<Divider bg={'brand.500'} marginY={'1rem'} />
					<Box>
						<Heading>
							{`GRUPO ${selectedGroup}`}
							{selectedGroup == 'I' && ' / '}
							{selectedSubdivision}
						</Heading>
						<TableContainer>
							<Table variant='striped' size={'sm'}>
								<Thead>
									<Tr>
										<Th>Actividades</Th>
										<Th>N° Sesiones</Th>
										<Th>N° Participantes</Th>
									</Tr>
								</Thead>
								<Tbody>
									{activities.map((activity: ActivityInterface) => {
										const numOfSessions = sessionsByGroup.filter((session: SessionInterface) => session.activityId._id == activity._id);
										const numOfResidents = numOfSessions.reduce((total, session) => {
											return (
												total +
												session.residentIds.filter(
													(resident) => resident.group.identificator === selectedGroup && resident.group.subdivision === selectedSubdivision
												).length
											);
										}, 0);

										return (
											<Tr key={activity._id}>
												<Td>{activity.title}</Td>
												<Td>{numOfSessions.length}</Td>
												<Td>{numOfResidents}</Td>
											</Tr>
										);
									})}
								</Tbody>
								<Tfoot>
									<Tr fontWeight='bold'>
										<Td>Total</Td>
										<Td>{sessionsByGroup.length}</Td>
									</Tr>
								</Tfoot>
								{/* {sessionsByGroup.map((session: SessionInterface) => {
					
					return (
						<>
						</>
					)
				}
				
				)} */}
							</Table>
						</TableContainer>
					</Box>
				</>
			)}
		</Container>
	);
};

export default Statistics;
