import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Container,
	Divider,
	Heading,
	Spinner,
	Text,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getActivityById } from '../../features/activities/activitySlice';
import { AppDispatch } from '../../app/store';


const ActivityCard: FC= () => {
	const { _id } = useParams<{ _id: string }>();
	const dispatch = useDispatch<AppDispatch>();
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
			<Heading size={'3xl'} mb={'2rem'}>
				{activity?.title}
			</Heading>
			<Text mb={'1rem'}>Descripción de la actividad:</Text>
			<Text mb={'1rem'} paddingLeft={'1rem'}>
				{activity?.description}
			</Text>
			<Text>Sesiones:</Text>
			<Accordion allowToggle>
				{activity?.sessions?.map((session: any, index: number) => (
					<AccordionItem key={index}>
						<h2>
							<AccordionButton>
								<Box as='span' flex='1' textAlign='left'>
									Fecha: {session.createdAt.slice(0, 10)}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<Text>Observaciones: {session.observations}</Text>
							<Divider bg={'black'} />
							<Text>Numero de participantes: {session.residentIds.length}</Text>
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</Container>
	);
};

export default ActivityCard;
