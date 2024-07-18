import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Container,
	Divider,
	Heading,
	Spinner,
	Text,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getActivityById } from '../../features/activities/activitySlice';
import { AppDispatch } from '../../app/store';
import { trashIcon } from '../../assets/icons/icons';

const ActivityCard: FC = () => {
	const { _id } = useParams<{ _id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { activity, isLoading } = useSelector((state: any) => state.activity || {});

	useEffect(() => {
		if (_id) {
			dispatch(getActivityById(_id));
		}
	}, [_id, dispatch]);

	if (isLoading) {
		return (
			<Container maxW='container.xl' width={'100%'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
				<Spinner size='xl' />
			</Container>
		);
	}
	return (
		<Container maxW='container.xl' width={'100%'}>
			<Box display={'flex'} gap={'1rem'} justifyContent={'end'}>
				<Button onClick={() => navigate('/sessions/activity')} marginBottom={'1rem'}>
					Todas las sesiones
				</Button>
				<Button>{trashIcon}</Button>
			</Box>
			<Heading size={'3xl'} mb={'2rem'}>
				{activity?.title}
			</Heading>
			<Divider bg={'brand.500'} marginBottom={'1rem'} />
			<Text fontSize={'xl'} mb={'1rem'}>
				Descripción de la actividad:
			</Text>
			<Text mb={'1rem'} paddingLeft={'1rem'}>
				{activity?.description}
			</Text>
			<Divider bg={'brand.500'} marginBottom={'1rem'} />
			<Accordion allowToggle>
				<Text fontSize={'xl'} mb={'1rem'}>
					Resumen de sesiones:{' '}
				</Text>
				{activity?.sessions?.map((session: any, index: number) => (
					<AccordionItem key={index} backgroundColor={'brand.50'}>
						<AccordionButton>
							<Box as='span' flex='1' textAlign='left'>
								Fecha: {session.createdAt.slice(0, 10)}
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<Text>Observaciones: {session.observations}</Text>
							<Divider bg={'brand.700'} />
							<Text>Numero de participantes: {session.residentIds.length}</Text>
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
			<Divider bg={'brand.500'} marginTop={'1rem'} />
		</Container>
	);
};

export default ActivityCard;
