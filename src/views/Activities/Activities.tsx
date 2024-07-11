import { Container, Heading, Input } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivities } from '../../features/activities/activitySlice';
import { ActivityInterface } from '../../interfaces/activityIntefaces';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import { AppDispatch } from '../../app/store';

const Activities: FC = () => {
  const {activities} = useSelector((state: any) => state.activity || {});
  const [filteredActivities, setFilteredActivities] = useState(activities);
	const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(getAllActivities())
  }, []);

  useEffect(() => {
    setFilteredActivities(
        activities.filter((activity: any) => 
            activity.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
}, [activities, searchTerm]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
};

	return (
		<Container maxW='container.sm' padding={'2rem'}>
			<Heading size={'3xl'} mb={'2rem'}>Actividades</Heading>
      <Input placeholder='Buscar actividad' mb={'2rem'} value={searchTerm} onChange={handleChange} />
      {filteredActivities.map((activity: ActivityInterface) => <ActivityCard key={activity._id} activity={activity} />)}
		</Container>
	);
};

export default Activities;
