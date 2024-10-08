import { Box, Container, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivities } from '../../features/activities/activitySlice';
import { ActivityInterface } from '../../interfaces/activityIntefaces';
import { AppDispatch, RootState } from '../../app/store';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const Activities: FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const { activities, activity, isLoading } = useSelector((state: RootState) => state.activity || {});
	const [filteredActivities, setFilteredActivities] = useState(activities);
	const [searchTerm, setSearchTerm] = useState('');
	
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getAllActivities());
	}, [activity]);

	useEffect(() => {
		setFilteredActivities(activities.filter((activity: ActivityInterface) => activity.title.toLowerCase().includes(searchTerm.toLowerCase())));
	}, [activities, searchTerm]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const goTo = (_id: string) => {
		navigate(`/activitycard/${_id}`);
	};

	if (isLoading || !activities) {
		return (
			<Container maxW='container.xl' width={'100vw'} height={'60vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
				<Spinner size='xl' />
			</Container>
		);
	}

	return (
		<Container maxW='container.sm' marginBottom={'7rem'}>
			<Heading size={'3xl'} mb={'2rem'} onClick={() => navigate('/activities')} cursor={'pointer'}>
				Actividades
			</Heading>
			<Input placeholder='Buscar actividad' mb={'2rem'} value={searchTerm} onChange={handleChange} />
			<Box
				key={'activityContainerFilter'}
				maxW='container.xl'
				display={'flex'}
				gap={'1rem'}
				width={'100%'}
				justifyContent={'center'}
				flexWrap={'wrap'}
			>
				{filteredActivities.map((activity: ActivityInterface) => (
					<Box
						key={activity._id}
						width={'100%'}
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						borderWidth='1px'
						borderRadius='lg'
						overflow='hidden'
						boxShadow='md'
						paddingX={'2rem'}
						paddingY={'1rem'}
						cursor={'pointer'}
						onClick={() => goTo(activity._id)}
					>
						<Heading as='h3' size='lg'>
							{activity.title}
						</Heading>
						<Text>{activity.description}</Text>
					</Box>
				))}
			</Box>
		</Container>
	);
};

export default Activities;
