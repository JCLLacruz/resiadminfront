import { Box, Button, Image, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { deleteImageResident, getResidentById } from '../../features/residents/residentSlice';
import { ImageData } from '../../interfaces/residentInterfaces';
<<<<<<< HEAD

=======
>>>>>>> develop
interface AllImagesProps {
	images: boolean;
}

const AllImages: FC<AllImagesProps> = ({ images }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {resident, images: imagesState, image} = useSelector((state: any) => state.resident || {});
    
	const [allImages, setAllImages] = useState<ImageData[]>([]);

	useEffect(() => {
		if (images) {
			setAllImages(imagesState);
		}
	}, [images, imagesState, dispatch]);

    const handleDeleteImage = (imageId: string, residentId: string) => {
        dispatch(deleteImageResident({imageId, residentId}));
        dispatch(getResidentById(resident._id))
    }

	return (
		<Box>
			{image == null ? (
				<Text>No hay imágenes</Text>
			) : (
				<>
					<Text fontSize={'2xl'}>Todas las imagenes</Text>
					<Box display='flex' flexWrap='wrap' gap='1rem'>
						{allImages.map((image: any, index: any) => (
							<Box key={index} display='flex' width='100px' justifyContent='center' position='relative'>
								<Image width='100%' src={image.src} alt='resident' />
								<Button position='absolute' bottom={'0'} bg='red' width='100px' onClick={()=>handleDeleteImage(image._id,resident._id)}>
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
