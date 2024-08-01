import { Box, Button, Container, Heading, Image, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import Activities from '../Activities/Activities';
import Users from '../Users/Users';
import Residents from '../Residents/Residents';
import { useSelector } from 'react-redux';
import { getImageSrc } from '../../utils/functions';
import noProfileImage from '../../assets/images/no-profile-image.png';
import ResidentForm from '../../components/RedidentForm/ResidentForm';
import ImageUploadForm from '../../components/ImageUploadForm/ImageUploadForm';
import ActivityForm from '../../components/ActivityForm/ActivityForm';
import SessionForm from '../../components/SessionForm/SessionForm';
import Birthdays from '../../components/Birthdays/Birthdays';

const AdminPanel: FC = () => {
	const { currentUser, image, images } = useSelector((state: any) => state.auth);
	const { residents } = useSelector((state: any) => state.resident);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [databaseVisible, setDatabaseVisible] = useState<string>('activities');
	const [imageSrc, setImageSrc] = useState('');
	const [modalContent, setModalContent] = useState<'sessionform' | 'residentform' | 'activityform' | 'upload' | 'birthdays' | null>(null);

	useEffect(() => {
		if (currentUser.images.length > 0) {
			setImageSrc(getImageSrc((currentUser.images[0] as any)?.data?.data, (currentUser.images[0] as any)?.contentType));
		}
	}, [images, image, currentUser]);

	const renderice = () => {
		switch (databaseVisible) {
			case 'activities':
				return <Activities />;
			case 'residents':
				return <Residents />;
			case 'users':
				return <Users />;

			default:
				break;
		}
	};
	return (
		<Container display={'flex'} padding={0} maxW='container.xxl' width={'100%'} height={'90vh'} overflowY={'hidden'} margin={0}>
			<Box display={'flex'} width={'100%'} height={'95%'} justifyContent={'space-around'} margin={0} className='hola'>
				<Box display={'flex'} flexDirection={'column'} width={'20%'} height={'100%'}>
					<Box
						id='userBox'
						width={'100%'}
						height={'60%'}
						overflow={'auto'}
						border={'solid'}
						borderColor={'brand.500'}
						borderRadius={'lg'}
						padding={'1rem'}
						marginBottom={'1rem'}
						sx={{ scrollbarWidth: 'none' }}
					>
						<Image
							width={'40%'}
							src={imageSrc != '' ? imageSrc : noProfileImage}
							cursor={'pointer'}
							onClick={() => {
								setModalContent('upload');
								onOpen();
							}}
						/>
						<Heading size={'xl'} marginY={'1rem'}>
							{currentUser.firstname} {currentUser.lastname}
						</Heading>
						<Box display={'flex'} gap={'2rem'}>
							<Box>
								<Text mb={'1rem'}>
									<strong>Email:</strong> {currentUser.email}
								</Text>
								<Text mb={'1rem'}>
									<strong>Teléfono:</strong> {currentUser.telephonnumber}
								</Text>
								<Text mb={'1rem'}>
									<strong>Cumpleaños:</strong> {new Date(currentUser.birthday).toLocaleDateString()}
								</Text>
								<Text mb={'1rem'}>
									<strong>Rol:</strong> {currentUser.role}
								</Text>
							</Box>
						</Box>
					</Box>
					<Box border={'solid'} borderColor={'brand.500'} borderRadius={'10px'} width={'100%'} height={'30%'} padding={'1rem'}>
						<Heading marginBottom={'1rem'}>Herramientas</Heading>
						<Box display={'flex'} flexDirection={'column'} gap={'0.5rem'} width={'100%'} cursor={'pointer'}>
							<Text as='u'>Resumen mensual</Text>
							<Text
								as='u'
								onClick={() => {
									setModalContent('residentform');
									onOpen();
								}}
							>
								Nuevo residente
							</Text>
							<Text
								as='u'
								onClick={() => {
									setModalContent('activityform');
									onOpen();
								}}
							>
								Nueva actividad
							</Text>
							<Text
								as='u'
								onClick={() => {
									setModalContent('sessionform');
									onOpen();
								}}
							>
								Nueva sesión
							</Text>
							<Text
								as='u'
								onClick={() => {
									setModalContent('birthdays');
									onOpen();
								}}
							>
								Proximos  cumpleaños
							</Text>
						</Box>
					</Box>
				</Box>
				<Box
					id='statisticsBox'
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					width={'30%'}
					height={'50%'}
					border={'solid'}
					borderColor={'brand.500'}
					borderRadius={'lg'}
					padding={'1rem'}
				>
					<Box id='monthBox' width={'100%'} height={'10rem'} bg={'gray'} marginBottom={'1rem'}></Box>
					<Box id='activityBox' width={'100%'} height={'10rem'} bg={'gray'}></Box>
				</Box>
				<Box
					id='databaseBox'
					display={'flex'}
					flexDirection={'column'}
					width={'45%'}
					height={'100%'}
					border={'solid'}
					borderColor={'brand.500'}
					borderRadius={'lg'}
					padding={'1rem'}
				>
					<Box display={'flex'} gap={'0.5rem'} marginBottom={'1rem'}>
						<Button onClick={() => setDatabaseVisible('activities')}>Actividades</Button>
						<Button onClick={() => setDatabaseVisible('residents')}>Residentes</Button>
						<Button onClick={() => setDatabaseVisible('users')}>Empleados</Button>
					</Box>
					<Box height={'100%'} overflow={'auto'} sx={{ scrollbarWidth: 'none' }}>
						{renderice()}
					</Box>
				</Box>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} size={'lg'} >
				<ModalOverlay />
				<ModalContent backgroundColor={'transparent'} border={'none'} boxShadow={'none'}>
					<ModalBody padding={'3rem'}>
						{modalContent === 'residentform' && <ResidentForm />}
						{modalContent === 'activityform' && <ActivityForm />}
						{modalContent === 'sessionform' && <SessionForm />}
						{modalContent === 'birthdays' && <Birthdays residents={residents}/>}
						{modalContent === 'upload' && <ImageUploadForm type='user' id={currentUser._id} />}
					</ModalBody>
				</ModalContent>
			</Modal>
		</Container>
	);
};

export default AdminPanel;
