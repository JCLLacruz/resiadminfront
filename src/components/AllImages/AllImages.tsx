import { Box, Button, Divider, Image, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { deleteImageResident, getResidentById } from '../../features/residents/residentSlice';
import { ImageDataResidentInterface } from '../../interfaces/residentInterfaces';
import { deleteImageUser, getUserById } from '../../features/auth/authSlice';
import { ImageDataUserInterface } from '../../interfaces/authInterfaces';

interface AllImagesProps {
	images: 'user' | 'resident';
}

const AllImages: FC<AllImagesProps> = ({ images }) => {
	const dispatch = useDispatch<AppDispatch>();
	const resident = useSelector((state: RootState) => state.resident?.resident);
	const imagesResidentState = useSelector((state: RootState) => state.resident?.images || []);
	const residentImage = useSelector((state: RootState) => state.resident?.image);

	const user = useSelector((state: RootState) => state.auth?.user);
	const imagesUserState = useSelector((state: RootState) => state.auth?.images || []);
	const userImage = useSelector((state: RootState) => state.auth?.image);

	const [allImages, setAllImages] = useState<ImageDataResidentInterface[] | ImageDataUserInterface[]>([]);

	useEffect(() => {
		if (images === 'resident') {
			setAllImages(imagesResidentState);
		} else if (images === 'user') {
			setAllImages(imagesUserState);
		}
	}, [images, imagesResidentState, imagesUserState, residentImage, userImage, dispatch]);

	const handleDeleteImage = (imageId: string, id?: string) => {
		if (!id) return;
		if (images === 'resident') {
			dispatch(deleteImageResident({ imageId, id }));
			if(resident?._id){
				dispatch(getResidentById(resident._id));
			}
		} else if (images === 'user') {
			dispatch(deleteImageUser({ imageId, id }));
			if(user?._id){
				dispatch(getUserById(user._id))
			}
		}
	};

	return (
		<Box backgroundColor={'brand.50'} width={'100vW'} padding={'1rem'} border={'solid'} borderColor={'brand.500'} borderRadius={'10px'}>
			{allImages.length === 0 ? (
				<Text key='nonImages'>No hay imágenes</Text>
			) : (
				<>
					<Text fontSize={'2xl'}>Todas las imagenes</Text>
					<Divider bg={'brand.500'} marginBottom={'1rem'} />
					<Box display='flex' flexWrap='wrap' gap='1rem' height={'100%'}>
						{allImages.map((image: ImageDataResidentInterface | ImageDataUserInterface, index: number) => (
							<Box key={image._id} display={'flex'} flexDirection={'column'} alignItems={'center'} height={'100%'}>
								<Box key={index} display='flex' width={'6rem'} height={'6rem'} justifyContent='center'>
									<Image width='100%' src={image.src} alt='resident' objectFit={'cover'} />
								</Box>
								<Button
									width={'6rem'}
									size={'xs'}
									bg='red'
									onClick={() => handleDeleteImage(image._id, images === 'resident' ? resident?._id : user?._id)}
								>
									Eliminar
								</Button>
							</Box>
						))}
					</Box>
				</>
			)}
		</Box>
	);
};

export default AllImages;
