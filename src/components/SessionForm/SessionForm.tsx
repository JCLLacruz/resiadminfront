import { FC, useEffect, useState } from 'react';
import { SessionValuesInterface } from '../../interfaces/sessionInterfaces';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { createSession } from '../../features/sessions/sessionSlice';
import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	InputGroup,
	Select,
	Textarea,
} from '@chakra-ui/react';
import { getAllActivities } from '../../features/activities/activitySlice';
import { getAllResidents } from '../../features/residents/residentSlice';
import { groupOptions, sudivisionGroupOptions } from '../../utils/formOptions';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ResidentInterface } from '../../interfaces/residentInterfaces';
import { ActivityInterface } from '../../interfaces/activityIntefaces';

const SessionForm: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate: NavigateFunction = useNavigate();
	const { activities } = useSelector((state: RootState) => state.activity || {});
	const { residents } = useSelector((state: RootState) => state.resident || {});
	const [group, setGroup] = useState('');
	const [subdivision, setSubdivision] = useState('');
	const [filteredResidents, setFilteredResidents] = useState<ResidentInterface[]>([]);

	useEffect(() => {
		dispatch(getAllResidents());
		dispatch(getAllActivities());
	}, [dispatch]);

	useEffect(() => {
		if (group) {
			const filtered = residents.filter((resident: ResidentInterface) => {
				return (
					resident.group.identificator === group &&
					(subdivision === '' || resident.group.subdivision === subdivision)
				);
			});
			setFilteredResidents(filtered);
		} else {
			setFilteredResidents([]);
		}
	}, [group, subdivision, residents]);

	const formik = useFormik<SessionValuesInterface>({
		initialValues: {
			activityId: '',
			observations: '',
			group: { identificator: '', subdivision: '' },
			residentIds: [],
		},
		validationSchema: Yup.object({
			activityId: Yup.string().required('Elige una actividad'),
			observations: Yup.string().required('Añade una observación'),
			residentIds: Yup.array().min(1, 'Elige al menos un residente'),
			group: Yup.object({
				identificator: Yup.string().required('Identificador de grupo es requerido'),
				subdivision: Yup.string(),
			}),
		}),
		onSubmit: (values) => {
			dispatch(createSession(values));
			navigate('/activities');
			formik.resetForm();
		},
	});

	const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		formik.setFieldValue(name, value);
		setGroup(value);

		// Clear subdivision if group is not "I"
		if (value !== 'I') {
			formik.setFieldValue('group.subdivision', '');
			setSubdivision('');
		}
	};

	const handleSubdivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		formik.setFieldValue(name, value);
		setSubdivision(value);
	};

	return (
		<Container
			id='sessionFormContainer'
			maxW='container.sm'
			marginTop={'1rem'}
			marginBottom={'6rem'}
			border={'solid'}
			borderColor={'brand.500'}
			backgroundColor={'brand.50'}
			borderRadius={'lg'}
			padding={'1rem'}
		>
			<Heading id='sessionFormHeading' as='h1' size='lg' textAlign='center' mb={'1rem'}>
				Nueva Sesión
			</Heading>
			<form onSubmit={formik.handleSubmit}>
				<FormControl isInvalid={!!(formik.errors.activityId && formik.touched.activityId)} mt={'1rem'}>
					<FormLabel htmlFor='identificatorInput'>Actividad</FormLabel>
					<Select
						id='activityIdInput'
						name='activityId'
						placeholder='Selecciona una opción'
						value={formik.values.activityId}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					>
						{activities.map((activity: ActivityInterface) => (
							<option key={activity._id} value={activity._id}>
								{activity.title}
							</option>
						))}
					</Select>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.group?.identificator}
					</FormErrorMessage>
				</FormControl>
				<FormControl mt={'1rem'}>
					<FormLabel htmlFor='observationsInput'>Observaciones</FormLabel>
					<InputGroup>
						<Textarea
							id='observationsInput'
							name='observations'
							placeholder='Más Información'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.observations}
						/>
					</InputGroup>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.group?.identificator && formik.touched.group?.identificator)} mt={'1rem'}>
					<FormLabel htmlFor='identificatorInput'>Grupo</FormLabel>
					<Select
						id='identificatorInput'
						name='group.identificator'
						placeholder='Selecciona una opción'
						value={formik.values.group.identificator}
						onChange={handleGroupChange}
						onBlur={formik.handleBlur}
					>
						{groupOptions.map((option) => (
							<option key={`groupOption${option}`} value={option}>
								{option}
							</option>
						))}
					</Select>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.group?.identificator}
					</FormErrorMessage>
				</FormControl>
				<FormControl mt={'1rem'}>
					<FormLabel htmlFor='subdivisionInput'>Subdivisión</FormLabel>
					<Select
						id='subdivisionInput'
						name='group.subdivision'
						placeholder='Ninguna subdivisión'
						onChange={handleSubdivisionChange}
						onBlur={formik.handleBlur}
						value={formik.values.group.subdivision}
						disabled={group !== 'I'}
					>
						{sudivisionGroupOptions.map((subdivision) => (
							<option key={subdivision} value={subdivision}>
								{subdivision}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.residentIds && formik.touched.residentIds)} mt={'1rem'}>
					<FormLabel htmlFor='residentIds'>Residentes</FormLabel>
					<CheckboxGroup value={formik.values.residentIds} onChange={(value) => formik.setFieldValue('residentIds', value)}>
						<Box display={'flex'} gap={'1rem'} flexWrap={'wrap'}>
							{filteredResidents.map((resident) => (
								<Checkbox
									key={resident._id}
									value={resident._id}
									colorScheme='brand'
									onChange={() => {
										const currentValue = formik.values.residentIds;
										if (currentValue.includes(resident._id)) {
											formik.setFieldValue(
												'residentIds',
												currentValue.filter((id) => id !== resident._id)
											);
										} else {
											formik.setFieldValue('residentIds', [...currentValue, resident._id]);
										}
									}}
								>
									{resident.firstname} {resident.lastname}
								</Checkbox>
							))}
						</Box>
					</CheckboxGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.residentIds}
					</FormErrorMessage>
				</FormControl>
				<Button mt={'2rem'} type='submit'>
					Registrar
				</Button>
			</form>
		</Container>
	);
};

export default SessionForm;
