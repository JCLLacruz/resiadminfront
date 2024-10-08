import { FC, useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, FormControl, FormLabel, Input, Image, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getResidentById, uploadImageResident } from '../../features/residents/residentSlice';
import { getUserById, updateCurrentUser, uploadImageUser } from '../../features/auth/authSlice';

interface FormValues {
	image: File | null;
}

interface FormImageUploadProps {
	id: string | undefined;
	type: string;
}

const ImageUploadForm: FC<FormImageUploadProps> = ({ id, type }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [preview, setPreview] = useState<string | null>(null);
	const { isLoading } = useSelector((state: RootState) => state.resident || {});
	const { currentUser } = useSelector((state: RootState) => state.auth || {});
	const [isUploading, setIsUploading] = useState(false);

	const formik = useFormik<FormValues>({
		initialValues: {
			image: null,
		},
		onSubmit: async (values) => {
			if (!values.image) return;

			const formData = new FormData();
			formData.append('image', values.image);
			if (type === 'resident') {
				if (id) {
					formData.append('residentId', id);
				}
			}
			if (type === 'user') {
				if (id) {
					formData.append('userId', id);
				}
			}
			isLoading && setIsUploading(true);
			if (type == 'resident') {
				dispatch(uploadImageResident(formData));
				if (id) {
					dispatch(getResidentById(id));
				}
				!isLoading && setIsUploading(false);
			} else if (type == 'user') {
				dispatch(uploadImageUser(formData));
				if (id) {
					dispatch(getUserById(id));
				}
			}
			if (currentUser?._id == id) {
					if (id) {
						setTimeout(() => {
							dispatch(updateCurrentUser(id));
						}, 1000);
					}
			}
			formik.resetForm();
		},
	});

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			formik.setFieldValue('image', file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Box
			padding={'1rem'}
			maxW='md'
			mx='auto'
			zIndex={2000}
			border={'solid'}
			borderColor={'brand.500'}
			borderRadius={'lg'}
			backgroundColor={'brand.50'}
		>
			<form onSubmit={formik.handleSubmit}>
				<FormControl>
					<FormLabel>Sube una imagen</FormLabel>
					<Input type='file' accept='image/*' padding={'0.25rem'} onChange={handleImageChange} />
				</FormControl>
				{preview && (
					<Box mt={4}>
						<Image src={preview} alt='Image preview' />
					</Box>
				)}
				<Button mt={4} colorScheme='teal' isLoading={isUploading} type='submit'>
					Añadir imagen
				</Button>
				{isUploading && <Spinner />}
			</form>
		</Box>
	);
};

export default ImageUploadForm;
