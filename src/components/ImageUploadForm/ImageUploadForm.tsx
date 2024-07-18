import { FC, useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, FormControl, FormLabel, Input, Image, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { uploadImageResident } from '../../features/residents/residentSlice';

interface FormValues {
	image: File | null;
}

interface FormImageUploadProps {
	id: string;
	type: string;
}

const ImageUploadForm: FC<FormImageUploadProps> = ({ id, type }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [preview, setPreview] = useState<string | null>(null);
	const { isLoading } = useSelector((state: any) => state.resident || {});
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
				formData.append('residentId', id);
			}
			if (type === 'user') {
				formData.append('userId', id);
			}

			isLoading && setIsUploading(true);

			dispatch(uploadImageResident(formData));

			!isLoading && setIsUploading(false);
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
		<Box padding={'0.25rem'} maxW='md' mx='auto' zIndex={2000}>
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
