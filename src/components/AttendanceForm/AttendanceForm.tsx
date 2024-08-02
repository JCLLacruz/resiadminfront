import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, Tag, TagLabel } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { attendanceValues, ResidentInterface } from '../../interfaces/residentInterfaces';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { getAllResidents, updateAttendance } from '../../features/residents/residentSlice';
import { formatToISODate } from '../../utils/functions';

const AttendanceForm: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { residents } = useSelector((state: any) => state.resident || {});
	const [filteredResidents, setFilteredResidents] = useState(residents);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		dispatch(getAllResidents());
	}, []);

	useEffect(() => {
		setFilteredResidents(
			residents.filter(
				(resident: any) =>
					resident.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || resident.lastname.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [residents, searchTerm]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const formik = useFormik<attendanceValues>({
		initialValues: {
			residentIds: [],
			date: new Date().toISOString().split('T')[0],
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			residentIds: Yup.array().of(Yup.string()),
			date: Yup.string().required('Añade una fecha'),
		}),
		onSubmit: (values) => {
			const formattedDate = formatToISODate(values.date);
			dispatch(updateAttendance({ ...values, date: formattedDate }));
			navigate('/residents');
			formik.resetForm();
		},
	});
	return (
		<Container
			id='sessionFormContainer'
			maxW='container.sm'
			marginTop={'1rem'}
			marginBottom={'10rem'}
			border={'solid'}
			borderColor={'brand.500'}
			backgroundColor={'brand.50'}
			borderRadius={'lg'}
			padding={'1rem'}
		>
			<Heading id='sessionFormHeading' as='h1' size='lg' textAlign='center' mb={'1rem'}>
				Registrar asistencia
			</Heading>
			<form onSubmit={formik.handleSubmit}>
				<FormControl isInvalid={!!(formik.errors.date && formik.touched.date)}>
					<FormLabel htmlFor='dateInput'>Fecha</FormLabel>
					<InputGroup>
						<Input
							id='dateInput'
							name='date'
							placeholder='Fecha de asistencia'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							type='date'
							value={formik.values.date}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.date}
					</FormErrorMessage>
				</FormControl>
				<FormControl mt={'1rem'}>
					<FormLabel>No asistentes</FormLabel>
					<Input placeholder='Buscar residente' mb={'1rem'} value={searchTerm} onChange={handleChange} />
					<Box display={'flex'} flexWrap={'wrap'} gap={'0.5rem'}>
						{filteredResidents.map((resident: ResidentInterface) => (
							<Tag
								key={resident._id}
								size='lg'
								borderRadius='full'
								variant={formik.values.residentIds.includes(resident._id) ? 'solid' : 'outline'}
								onClick={() => {
									if (formik.values.residentIds.includes(resident._id)) {
										formik.setFieldValue(
											'residentIds',
											formik.values.residentIds.filter((id) => id !== resident._id)
										);
									} else {
										formik.setFieldValue('residentIds', [...formik.values.residentIds, resident._id]);
									}
								}}
								cursor='pointer'
							>
								<TagLabel>
									{resident.firstname} {resident.lastname}
								</TagLabel>
							</Tag>
						))}
					</Box>
				</FormControl>
				<Button mt={'2rem'} size={'lg'} width={'full'} type='submit'>
					Registrar
				</Button>
			</form>
		</Container>
	);
};

export default AttendanceForm;
