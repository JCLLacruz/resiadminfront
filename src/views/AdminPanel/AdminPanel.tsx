import { Box, Button, Container, Heading, Image, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import Activities from '../Activities/Activities';
import Users from '../Users/Users';
import Residents from '../Residents/Residents';
import { useSelector } from 'react-redux';
import { getImageSrc } from '../../utils/functions';
import noProfileImage from '../../assets/images/no-profile-image.png';

const AdminPanel: FC = () => {
	const { currentUser, image, images } = useSelector((state: any) => state.auth);
	const [databaseVisible, setDatabaseVisible] = useState<string>('activities');
	const [imageSrc, setImageSrc] = useState('');

	console.log('currentuser', currentUser);

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
		<Container display={'flex'} padding={'0'} maxW='container.xxl' width={'100%'} height={'90vh'} alignItems={'center'}>
			<Box display={'flex'} width={'100%'} justifyContent={'space-around'}>
				<Box display={'flex'} flexDirection={'column'} gap={'1rem'}>
					<Box
						id='userBox'
						width={'20rem'}
						height={'30rem'}
						overflow={'auto'}
						border={'solid'}
						borderColor={'brand.500'}
						borderRadius={'10px'}
						padding={'1rem'}
					>
						<Image width={'8rem'} src={imageSrc != '' ? imageSrc : noProfileImage} />
						<Heading size={'3xl'} marginY={'1rem'}>
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
					<Box border={'solid'} borderColor={'brand.500'} borderRadius={'10px'} bg='grey' width={'100%'} height={'15rem'}>
                        <Button>Resumen mensual</Button>
                    </Box>
				</Box>
				<Box
					id='statisticsBox'
					display={'flex'}
					flexDirection={'column'}
					width={'30rem'}
					height={'23rem'}
					gap={'1rem'}
					border={'solid'}
					borderColor={'brand.500'}
					borderRadius={'10px'}
					padding={'1rem'}
				>
					<Box id='monthBox' width={'100%'} height={'10rem'} bg={'gray'}></Box>
					<Box id='activityBox' width={'100%'} height={'10rem'} bg={'gray'}></Box>
				</Box>
				<Box
					id='databaseBox'
					display={'flex'}
					flexDirection={'column'}
					width={'25rem'}
					height={'80vh'}
					border={'solid'}
					borderColor={'brand.500'}
					borderRadius={'10px'}
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
		</Container>
	);
};

export default AdminPanel;
