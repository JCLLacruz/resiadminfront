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
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Spinner,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteActivity, getActivityById } from '../../features/activities/activitySlice';
import { AppDispatch } from '../../app/store';
import { editIcon, trashIcon } from '../../assets/icons/icons';
import { getSessionsByActivityId } from '../../features/sessions/sessionSlice';
import ActivityForm from '../ActivityForm/ActivityForm';
import { GroupedSessions } from '../../interfaces/activityIntefaces';
import { groupSessionsByMonth } from '../../utils/functions';

const ActivityCard: FC = () => {
	const { _id } = useParams<{ _id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalContent, setModalContent] = useState<'activityform' | 'alert' | null>(null);
	const { activity, isLoading } = useSelector((state: any) => state.activity || {});
	const { currentUser } = useSelector((state: any) => state.auth || {});
	const [sessions, setSessions] = useState<GroupedSessions[]>([]);

	useEffect(() => {
		if (_id) {
			dispatch(getActivityById(_id));
			dispatch(getSessionsByActivityId(_id));
		}
	}, [_id, dispatch]);

	useEffect(() => {
		if (activity) {
			const groupedSessions: GroupedSessions[] = groupSessionsByMonth(activity.sessions);
			setSessions(groupedSessions);
		}
	}, [activity]);

	const handleDeleteActivity = () => {
		dispatch(deleteActivity(activity._id));
		navigate('/activities');
	};

	if (isLoading) {
		return (
			<Container maxW='container.xl' display={'flex'} width={'100vw'} height={'60vh'} justifyContent={'center'} alignItems={'center'}>
				<Spinner size='xl' />
			</Container>
		);
	}
	return (
		<>
			<Container
				maxW='container.md'
				paddingBottom={'10rem'}
				overflowY={'auto'}
				border={'solid'}
				borderColor={'brand.500'}
				borderRadius={'10px'}
				padding={'1rem'}
				marginBottom={'7rem'}
			>
				<Box display={'flex'} gap={'1rem'} justifyContent={'end'}>
					<Button onClick={() => navigate('/sessions/activity')} marginBottom={'1rem'}>
						Todas las sesiones
					</Button>
					<Box margin={0} padding={0} display={'flex'} flexDirection={'column'} gap={'1rem'}>
						{currentUser.role === 'superadmin' && (
							<Button backgroundColor={'red'} _hover={{ bg: 'red' }} onClick={() => {
								setModalContent('alert');
								onOpen();
							}}>
								{trashIcon}
							</Button>
						)}
						<Button
							onClick={() => {
								onOpen();
							}}
						>
							{editIcon}
						</Button>
					</Box>
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
						Resumen de sesiones:
					</Text>
					{sessions.length === 0 ? (
						<Text paddingLeft={'1rem'}>No hay sesiones</Text>
					) : (
						<>
							{sessions.map((group, index) => (
								<AccordionItem key={`month_sessions_${index}`} backgroundColor={'brand.50'}>
									<AccordionButton>
										<Box as='span' flex='1' textAlign='left'>
											Total sesiones: <strong>{group.sessions.length}</strong> en {group.month}
										</Box>
										<AccordionIcon />
									</AccordionButton>
									{group.sessions.map((session, index) => (
										<AccordionPanel pb={4} key={`session_${session._id}` + index}>
											<Text>Creada el: {session.createdAt}</Text>
											<Text>Observaciones:</Text>
											<Text>{session.observations}</Text>
											<Divider bg={'brand.700'} />
											<Text>Numero de participantes: {session.residentIds.length}</Text>
											<Divider bg={'brand.700'} />
										</AccordionPanel>
									))}
								</AccordionItem>
							))}
						</>
					)}
				</Accordion>
				<Divider bg={'brand.500'} marginTop={'1rem'} />
			</Container>
			<Modal isOpen={isOpen} onClose={onClose} size={'lg'} isCentered={false}>
				<ModalOverlay />
				<ModalContent backgroundColor={'transparent'} border={'none'} boxShadow={'none'}>
					<ModalBody padding={0}>
						{modalContent === 'activityform' && <ActivityForm activityProp={activity} />}
						{modalContent === 'alert' && (
							<Box
								display={'flex'}
								flexDirection={'column'}
								alignItems={'center'}
								borderWidth='1px'
								overflow='hidden'
								paddingX={'2rem'}
								paddingY={'1rem'}
								bg='white'
								backgroundColor={'brand.50'}
								border={'solid'}
								borderColor={'brand.500'}
								borderRadius={'10px'}
							>
								<Text>
									¿Está seguro de querer eliminar esta actividad? Esta acción no se puede deshacer y se borrarán todos los registros de las sessiones.
								</Text>{' '}
								<Button bg='red' size='sm' _hover={{ bg: 'red' }} mt={4} onClick={handleDeleteActivity}>
									Sí, eliminar
								</Button>
							</Box>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ActivityCard;
