import { Box, Container, Heading, Input, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivities } from '../../features/activities/activitySlice';
import { ActivityInterface } from '../../interfaces/activityIntefaces';
import { AppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';

const Activities: FC = () => {
	const navigate = useNavigate();
	const { activities } = useSelector((state: any) => state.activity || {});
	const [filteredActivities, setFilteredActivities] = useState(activities);
	const [searchTerm, setSearchTerm] = useState('');

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getAllActivities());
	}, []);

	useEffect(() => {
		setFilteredActivities(activities.filter((activity: any) => activity.title.toLowerCase().includes(searchTerm.toLowerCase())));
	}, [activities, searchTerm]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const goTo = (_id: string) => {
		navigate(`/activitycard/${_id}`);
	};

	return (
		<Container maxW='container.sm' padding={'2rem'}>
			<Heading size={'3xl'} mb={'2rem'}>
				Actividades
			</Heading>
			<Input placeholder='Buscar actividad' mb={'2rem'} value={searchTerm} onChange={handleChange} />
			{filteredActivities.map((activity: ActivityInterface) => (
				<Box
					borderWidth='1px'
					borderRadius='lg'
					overflow='hidden'
					maxW='sm'
					boxShadow='md'
					paddingX={'2rem'}
					paddingY={'1rem'}
					onClick={() => goTo(activity._id)}
				>
					<Heading as='h3' size='lg'>
						{activity.title}
					</Heading>
					<Text>{activity.description}</Text>
				</Box>
			))}
		</Container>
	);
};

export default Activities;
