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
} from '@chakra-ui/react';
import { groupOptions } from '../../utils/formOptions';
import { ActivityInterface } from '../../interfaces/activityIntefaces';
import { formatDate } from '../../utils/functions';
import { getAllActivities } from '../../features/activities/activitySlice';

const Statistics: FC = () => {
    const dispatch = useDispatch<AppDispatch>();

	const { activities } = useSelector((state: RootState) => state.activity || {});

	const [selectedGroup, setSelectedGroup] = useState<string>('I');
	const [month, setMonth] = useState<number>(+formatDate(new Date().toISOString()).slice(3, 5));

    useEffect(() => {
		dispatch(getAllActivities());
	}, [dispatch]);

	const handleChangeMonth = (value: string) => setMonth(+value);

	const filterSessions = (activity: ActivityInterface, subdivision: string) => {
		const filteredSessions = activity.sessions.filter((sess) => {
			const sessionMonth = +sess.createdAt.slice(5, 7);
			if (sessionMonth !== month) return false;

			const residentsInSubdivision = sess.residentIds.filter(resident => resident.group.subdivision === subdivision);
			return residentsInSubdivision.length > 0;
		});
		return filteredSessions;
	};

	const calculateTotalSessionsAndResidents = (subdivision: string) => {
		let totalSessions = 0;
		let totalResidents = 0;

		activities.forEach((activity: ActivityInterface) => {
			const numOfSessions = filterSessions(activity, subdivision);
			totalSessions += numOfSessions.length;
			totalResidents += numOfSessions.reduce((total, session) => {
				return total + session.residentIds.filter(resident => resident.group.subdivision === subdivision).length;
			}, 0);
		});

		return { totalSessions, totalResidents };
	};

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
			<Box display={'flex'} mb={'1rem'} gap={'1rem'}>
				{groupOptions.map((group, i) => (
					<Button key={i + group} onClick={() => setSelectedGroup(group)}>{`Grupo ${group}`}</Button>
				))}
			</Box>
			<Divider bg={'brand.500'} marginY={'1rem'} />
			<Box display={'flex'} alignItems={'center'}>
				<Text marginRight={'0.25rem'}>Mes:</Text>
				<Box>
					<NumberInput size='md' maxW={20} defaultValue={month} min={1} max={12} onChange={handleChangeMonth}>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Box>
			</Box>
			<Divider bg={'brand.500'} marginY={'1rem'} />
			{selectedGroup == 'I' && (
				<>
					<TableContainer>
						<Heading>GRUPO A / Talleres</Heading>
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
									const numOfSessions = filterSessions(activity, 'A');
									const numOfResidents = numOfSessions.reduce((total, session) => {
										return total + session.residentIds.filter(resident => resident.group.subdivision === 'A').length;
									}, 0);
									
									return (
										<Tr key={activity.title}>
											<Td>{activity.title}</Td>
											<Td>{numOfSessions.length}</Td>
											<Td>{numOfResidents}</Td>
										</Tr>
									);
								})}
							</Tbody>
                            <Tfoot>
                                <Tr fontWeight="bold">
                                    <Td>Total</Td>
                                    <Td>{calculateTotalSessionsAndResidents('A').totalSessions}</Td>
                                    <Td>{calculateTotalSessionsAndResidents('A').totalResidents}</Td>
                                </Tr>
                            </Tfoot>
						</Table>
					</TableContainer>
					<TableContainer marginTop={'1rem'}>
						<Heading>GRUPO B / Polivalente</Heading>
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
									const numOfSessions = filterSessions(activity, 'B');
									const numOfResidents = numOfSessions.reduce((total, session) => {
										return total + session.residentIds.filter(resident => resident.group.subdivision === 'B').length;
									}, 0);
									
									return (
										<Tr key={activity.title}>
											<Td>{activity.title}</Td>
											<Td>{numOfSessions.length}</Td>
											<Td>{numOfResidents}</Td>
										</Tr>
									);
								})}
							</Tbody>
                            <Tfoot>
                                <Tr fontWeight="bold">
                                    <Td>Total</Td>
                                    <Td>{calculateTotalSessionsAndResidents('B').totalSessions}</Td>
                                    <Td>{calculateTotalSessionsAndResidents('B').totalResidents}</Td>
                                </Tr>
                            </Tfoot>
						</Table>
					</TableContainer>
				</>
			)}
			{selectedGroup == 'II' && (
				<>
					<TableContainer>
						<Heading>GRUPO II</Heading>
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
									const numOfSessions = activity.sessions.filter((sess) => +sess.createdAt.slice(5, 7) == month && sess.residentIds.some(resident => resident.group.identificator === 'II'));
									const numOfResidents = numOfSessions.reduce((total, session) => {
										return total + session.residentIds.filter(resident => resident.group.identificator === 'II').length;
									}, 0);
									
									return (
										<Tr key={activity.title}>
											<Td>{activity.title}</Td>
											<Td>{numOfResidents === 0 ? 0 : numOfSessions.length}</Td>
											<Td>{numOfResidents}</Td>
										</Tr>
									);
								})}
							</Tbody>
                            <Tfoot>
                                <Tr fontWeight="bold">
                                    <Td>Total</Td>
                                    <Td>{calculateTotalSessionsAndResidents('II').totalSessions}</Td>
                                    <Td>{calculateTotalSessionsAndResidents('II').totalResidents}</Td>
                                </Tr>
                            </Tfoot>
						</Table>
					</TableContainer>
				</>
			)}
		</Container>
	);
};

export default Statistics;
