import {
	Box,
	Container,
	Divider,
	Heading,
	Text,
	Spinner,
	Button,
	Image,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	useDisclosure,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { deleteUser, getUserById } from '../../features/auth/authSlice';
import { editIcon, trashIcon } from '../../assets/icons/icons';
import ImageUploadForm from '../ImageUploadForm/ImageUploadForm';
import AllImages from '../AllImages/AllImages';
import UserForm from '../UserForm/UserForm';
import { ConnectionsInterface, GroupedConnections } from '../../interfaces/authInterfaces';
import noProfileImage from '../../assets/images/no-profile-image.png';
import { groupConnectionsByMonth } from '../../utils/functions';

const UserCard: FC = () => {
	const { _id } = useParams<{ _id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { currentUser, user, image, images, isLoading, imagesIsLoading } = useSelector((state: any) => state.auth || {});
	const [connections, setConnections] = useState<GroupedConnections[]>([]);
	const [imageSrc, setImageSrc] = useState<any>('');
	const [modalContent, setModalContent] = useState<'images' | 'form' | 'upload' | 'alert' | null>(null);

	useEffect(() => {
		if (_id) {
			dispatch(getUserById(_id));
		}
	}, [_id, dispatch]);

	const handleDeleteUser = () => {
		dispatch(deleteUser(user._id));
		navigate('/users');
	};

	useEffect(() => {
		if (images.length > 0) {
			setImageSrc(images[images.length - 1].src);
		} else {
			setImageSrc(image);
		}
	}, [image, images]);

	useEffect(() => {
		if (user) {
			const groupedConnections: GroupedConnections[] = groupConnectionsByMonth(user.connections);
			setConnections(groupedConnections);
		}
	}, [user]);

	if (isLoading || !user) {
		return (
			<Container maxW='container.xl' width={'100vw'} height={'60vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
				<Spinner size='xl' />
			</Container>
		);
	}
	return (
		<>
			<Container
				maxW='container.sm'
				paddingBottom={'10rem'}
				overflowY={'auto'}
				border={'solid'}
				borderColor={'brand.500'}
				borderRadius={'10px'}
				padding={'1rem'}
				marginBottom={'7rem'}
			>
				<Box display={'flex'} gap={'1rem'} justifyContent={'end'} marginBottom={'1rem'}>
					<Button
						onClick={() => {
							setModalContent('images');
							onOpen();
						}}
					>
						Todas las imagenes
					</Button>
					<Box margin={0} padding={0} display={'flex'} flexDirection={'column'} gap={'1rem'}>
						{currentUser?.role === 'superadmin' && (
							<Button
								backgroundColor={'red'}
								_hover={{ bg: 'red' }}
								onClick={() => {
									setModalContent('alert');
									onOpen();
								}}
							>
								{trashIcon}
							</Button>
						)}
						<Button
							onClick={() => {
								setModalContent('form');
								onOpen();
							}}
						>
							{editIcon}
						</Button>
					</Box>
				</Box>
				<Box display={'flex'} justifyContent={'center'} marginTop={'2rem'} marginBottom={'2rem'}>
					<Box display={'flex'} width={'15rem'} height={'15rem'} padding={0} margin={0} justifyContent={'center'} alignItems={'center'}>
						<>
							{image == null ? (
								<Box>
									{imagesIsLoading ? (
										<Spinner size='xl' />
									) : (
										<Box
											margin={'0'}
											bg='transparent'
											_hover={{ bg: 'transparent' }}
											onClick={() => {
												setModalContent('upload');
												onOpen();
											}}
										>
											<Image
												width={'100%'}
												height={'100%'}
												objectFit={'cover'}
												src={noProfileImage}
												cursor={'pointer'}
												onClick={() => {
													setModalContent('upload');
													onOpen();
												}}
											/>
										</Box>
									)}
								</Box>
							) : (
								<>
									<Image
										width={'100%'}
										height={'100%'}
										objectFit={'cover'}
										src={imageSrc}
										cursor={'pointer'}
										onClick={() => {
											setModalContent('upload');
											onOpen();
										}}
									/>
								</>
							)}
						</>
					</Box>
				</Box>
				<Box display={'flex'} justifyContent={'center'} alignItems={'center'} marginTop={'1rem'}>
					<Heading mb={'2rem'} size={'3xl'}>
						{user.firstname} {user.lastname}
					</Heading>
				</Box>
				<Divider marginBottom={'2rem'} bg={'brand.600'} />
				<Box display={'flex'} gap={'2rem'}>
					<Box>
						<Text fontSize='lg' mb={'1rem'}>
							<strong>Información de contacto:</strong>
						</Text>
						<Text mb={'1rem'} paddingLeft={'1rem'}>
							<strong>Email:</strong> {user.email}
						</Text>
						<Text mb={'1rem'} paddingLeft={'1rem'}>
							<strong>Teléfono:</strong> {user.telephonnumber}
						</Text>
						<Text mb={'1rem'} paddingLeft={'1rem'}>
							<strong>Cumpleaños:</strong> {new Date(user.birthday).toLocaleDateString()}
						</Text>
						<Text mb={'1rem'} paddingLeft={'1rem'}>
							<strong>Rol:</strong> {user.role}
						</Text>
						<Text mb={'1rem'} paddingLeft={'1rem'}>
							<strong>Cargo:</strong> {user.jobPosition}
						</Text>
					</Box>
				</Box>
				<Divider my={'2rem'} bg={'brand.600'} />
				<Accordion allowToggle>
					<Text fontSize={'xl'} mb={'1rem'}>
						<strong>Conexiones:</strong>
					</Text>
					{connections.length === 0 ? (
						<Text paddingLeft={'1rem'}>No hay conexiones</Text>
					) : (
						<>
							{connections.map((connection: GroupedConnections, index) => (
								<AccordionItem key={`month_connections_${index}`} backgroundColor={'brand.50'}>
									<AccordionButton>
										<Box as='span' flex='1' textAlign='left'>
											Total conexiones: <strong>{connection.connections.length}</strong> en {connection.month}
										</Box>
										<AccordionIcon />
									</AccordionButton>
									{connection.connections.map((connection: ConnectionsInterface, index: number) => (
										<AccordionPanel pb={4} key={`connection_${connection.token}` + index}>
											<Text>Se conectó el {connection.date}</Text>
											<Divider bg={'brand.700'} />
										</AccordionPanel>
									))}
								</AccordionItem>
							))}
						</>
					)}
				</Accordion>
				<Divider my={'2rem'} bg={'brand.600'} />
				<Modal isOpen={isOpen} onClose={onClose} size={'lg'} isCentered={false}>
					<ModalOverlay />
					<ModalContent backgroundColor={'transparent'} border={'none'} boxShadow={'none'}>
						<ModalBody padding={0}>
							{modalContent === 'images' && <AllImages images={'user'} />}
							{modalContent === 'form' && <UserForm userProp={_id ? user : currentUser} />}
							{modalContent === 'upload' && <ImageUploadForm type='user' id={user._id} />}
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
									<Text>¿Está seguro de querer eliminar este usuario? Esta acción no se puede deshacer.</Text>
									<Button bg='red' size='sm' _hover={{ bg: 'red' }} mt={4} onClick={handleDeleteUser}>
										Sí, eliminar
									</Button>
								</Box>
							)}
						</ModalBody>
					</ModalContent>
				</Modal>
			</Container>
		</>
	);
};

export default UserCard;
