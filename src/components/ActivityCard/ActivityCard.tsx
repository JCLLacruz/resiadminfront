import { FC } from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { ActivityInterface } from '../../interfaces/activityIntefaces';
import { useNavigate } from 'react-router-dom';

interface ActivityCardProps {
	activity: ActivityInterface;
}

const ActivityCard: FC<ActivityCardProps> = ({ activity }) => {
    const navigate: any = useNavigate();

    const goTo = (id: string) => {
        navigate(`/activityview/${id}`)
    }
	return (
		<Box borderWidth='1px' borderRadius='lg' overflow='hidden' maxW='sm' boxShadow='md' paddingX={'2rem'} paddingY={'1rem'} onClick={()=> goTo(activity._id)}>
					<Heading as='h3' size='lg'>
						{activity.title}
					</Heading>
					<Text>{activity.description}</Text>
		</Box>
	);
};

export default ActivityCard;
