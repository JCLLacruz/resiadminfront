import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, Textarea } from '@chakra-ui/react';
import { ActivityInterface, ActivityValuesInterface } from '../../interfaces/activityIntefaces';
import { createActivity, updateActivity } from '../../features/activities/activitySlice';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface ActivityFormProps {
	activityProp?: ActivityInterface | null;
}

const ActivityForm: FC<ActivityFormProps> = ({ activityProp }) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate: NavigateFunction = useNavigate();
	const [activity, setActivity] = useState<ActivityValuesInterface>({
		title: '',
		description: '',
	});

	useEffect(() => {
		if (activityProp) {
			const { _id, ...editActivity } = activityProp;
			setActivity(editActivity);
		}
	}, [activityProp]);

	const formik = useFormik<ActivityValuesInterface>({
		initialValues: activity,
		enableReinitialize: true,
		validationSchema: Yup.object({
			title: Yup.string().required('Añade un tíluto'),
			description: Yup.string().required('Añade una descripción'),
		}),
		onSubmit: (values) => {
			if (activityProp) {
				dispatch(updateActivity({ activity: values, id: activityProp._id }));
				navigate('/activitycard/' + activityProp._id);
			} else {
				dispatch(createActivity(values));
				navigate('/activities');
			}
			formik.resetForm();
		},
	});

	return (
		<Container
			id='activityFormContainer'
			maxW='container.sm'
			marginTop={'1rem'}
			border={'solid'}
			borderColor={'brand.500'}
			backgroundColor={'brand.50'}
			borderRadius={'lg'}
			padding={'1rem'}
		>
			<Heading id='activityFormHeading' as='h1' size='lg' textAlign='center' mb={'1rem'}>
				{activityProp ? 'Editar Actividad' : 'Nueva Actividad'}
			</Heading>
			<form onSubmit={formik.handleSubmit}>
				<FormControl isInvalid={!!(formik.errors.title && formik.touched.title)}>
					<FormLabel htmlFor='titleInput'>Título</FormLabel>
					<InputGroup>
						<Input
							id='titleInput'
							name='title'
							placeholder='Título de la actividad'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.title}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.title}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.description && formik.touched.description)} mt={'1rem'}>
					<FormLabel htmlFor='descriptionInput'>Descripción</FormLabel>
					<InputGroup>
						<Textarea
							id='descriptionInput'
							name='description'
							placeholder='Más Información'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.description}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.description}
					</FormErrorMessage>
				</FormControl>
				<Button mt={'2rem'} size={'lg'} width={'full'} type='submit'>
					{activityProp ? 'Actualizar actividad' : 'Crear actividad'}
				</Button>
			</form>
		</Container>
	);
};

export default ActivityForm;
