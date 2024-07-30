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
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { deleteResident, getResidentById } from '../../features/residents/residentSlice';
import { closeIcon, editIcon, trashIcon } from '../../assets/icons/icons';
import ImageUploadForm from '../ImageUploadForm/ImageUploadForm';
import AllImages from '../AllImages/AllImages';
import { getSessionsByResidentId } from '../../features/sessions/sessionSlice';
import ResidentForm from '../RedidentForm/ResidentForm';

const ResidentCard: FC = () => {
	const { _id } = useParams<{ _id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { resident, image, images, isLoading, imagesIsLoading } = useSelector((state: RootState) => state.resident || {});
	const { user } = useSelector((state: RootState) => state.auth || {});
	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [imageSrc, setImageSrc] = useState<any>('');
	const [modalContent, setModalContent] = useState<'images' | 'form' | 'upload' | null>(null);

	useEffect(() => {
		if (_id) {
			dispatch(getResidentById(_id));
			dispatch(getSessionsByResidentId(_id));
		}
	}, [_id, dispatch]);

	const handleDeleteResident = (_id: string) => {
		dispatch(deleteResident(_id));
		navigate('/residents');
	};

	useEffect(() => {
		if (images.length > 0) {
			setImageSrc(images[images.length - 1].src);
		}
	}, [images, image]);

	useEffect(() => {
		if (images.length > 0) {
			setImageSrc(images[images.length - 1].src);
		} else {
			setImageSrc(image?.src);
		}
	}, [image]);

	if (isLoading || !resident) {
		return (
			<Container maxW='container.xl' width={'100vw'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
				<Spinner size='xl' />
			</Container>
		);
	}

	return (
		<>
			<Container maxW='container.xl' paddingBottom={'10rem'} overflowY={'auto'}>
				<Box display={'flex'} gap={'1rem'} justifyContent={'end'} marginBottom={'1rem'}>
					<Button
						onClick={() => {
							setModalContent('images');
							onOpen();
						}}
					>
						Todas las imagenes
					</Button>
					<Button onClick={() => navigate('/sessions/' + resident._id)}>Sesiones</Button>
					<Box margin={0} padding={0} display={'flex'} flexDirection={'column'} gap={'1rem'}>
						{user?.role === 'superadmin' && (
							<Button backgroundColor={'red'} _hover={{ bg: 'red' }} onClick={() => setIsAlertVisible(!isAlertVisible)}>
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
					{isAlertVisible && (
						<Box
							position={'absolute'}
							right={'1rem'}
							top={'7.5rem'}
							justifyContent='center'
							textAlign='center'
							height='200px'
							width={'350px'}
							zIndex={1000}
						>
							<Box
								display={'flex'}
								flexDirection={'column'}
								alignItems={'center'}
								borderWidth='1px'
								borderRadius='lg'
								overflow='hidden'
								boxShadow='md'
								paddingX={'2rem'}
								paddingY={'1rem'}
								bg='white'
							>
								<Text
									position={'absolute'}
									top={2}
									right={2}
									fontSize={'2xl'}
									color={'brand.500'}
									cursor={'pointer'}
									onClick={() => setIsAlertVisible(false)}
								>
									{closeIcon}
								</Text>
								<Text>¿Está seguro de querer eliminar este residente? Esta acción no se puede deshacer.</Text>
								<Button bg='red' _hover={{ bg: 'red' }} size='sm' mt={4} onClick={() => handleDeleteResident(resident._id)}>
									Sí, eliminar
								</Button>
							</Box>
						</Box>
					)}
				</Box>
				<Box display={'flex'} justifyContent={'center'} marginTop={'2rem'} marginBottom={'2rem'}>
					<Box width={'15rem'} height={'15rem'} padding={0} margin={0}>
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
												src='/src/assets/images/no-profile-image.png'
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
						{resident.firstname} {resident.lastname}
					</Heading>
				</Box>
				<Divider marginBottom={'2rem'} bg={'brand.600'} />
				<Box display={'flex'} gap={'2rem'}>
					<Box>
						<Text fontSize='lg' mb={'1rem'}>
            <strong>Información de contacto:</strong>
						</Text>
						<Text mb={'1rem'} paddingLeft={'1rem'}>
            <strong>Email:</strong> {resident.email}
						</Text>
						<Text mb={'1rem'} paddingLeft={'1rem'}>
            <strong>Teléfono:</strong> {resident.phoneNumber}
						</Text>
						<Text mb={'1rem'}><strong>Dirección:</strong></Text>
						<Text mb={'1rem'} paddingLeft={'1rem'}>
							{resident.address.street}, {resident.address.yardnumber}, {resident.address.zipcode}, {resident.address.city},{' '}
							{resident.address.country}
						</Text>
						<Text mb={'1rem'}><strong>Cumpleaños:</strong> {new Date(resident.birthday).toLocaleDateString()}</Text>
					</Box>
				</Box>
				<Divider my={'2rem'} bg={'brand.600'} />
				<Text fontSize='lg' mb={'1rem'}>
        <strong>Información de emergencia:</strong>
				</Text>
				<Text mb={'1rem'} paddingLeft={'1rem'}>
        <strong>Contacto de emergencia:</strong> {resident.emergency.nameOfEmergencyContact}
				</Text>
				<Text mb={'1rem'} paddingLeft={'1rem'}>
        <strong>Teléfono de emergencia:</strong> {resident.emergency.phoneNumber}
				</Text>
				<Divider my={'2rem'} bg={'brand.600'} />
				<Text fontSize='lg' mb={'1rem'}>
        <strong>Más información:</strong>
				</Text>
				<Text mb={'1rem'} paddingLeft={'1rem'}>
					{resident.moreinfo}
				</Text>
			</Container>
			<Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
				<ModalOverlay />
				<ModalContent>
					<Text position={'absolute'} top={2} right={2} fontSize={'2xl'} color={'brand.500'} cursor={'pointer'} onClick={onClose}>
						{closeIcon}
					</Text>{' '}
					<ModalBody>
						{modalContent === 'images' && <AllImages images={'resident'} />}
						{modalContent === 'form' && <ResidentForm residentProp={resident} />}
						{modalContent === 'upload' && <ImageUploadForm type='resident' id={resident._id} />}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ResidentCard;
