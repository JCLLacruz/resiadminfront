import { Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, Select, Textarea } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { residentValues } from '../../interfaces/residentInterfaces';
import { groupOptions, sudivisionGropuOptions } from '../../utils/formOptions';
import { createResident } from '../../features/residents/residentSlice';

const ResidentForm: FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const formik = useFormik<residentValues>({
		initialValues: {
			firstname: '',
			lastname: '',
			email: '',
			phoneNumber: '',
			emergency: {
				nameOfEmergencyContact: '',
				phoneNumber: '',
			},
			birthday: '',
			address: { street: '', yardnumber: '', zipcode: '', city: '', country: '' },
			moreinfo: '',
			group: { identificator: '', subdivision: '' },
		},
		validationSchema: Yup.object({
			firstname: Yup.string().required('Nombre es requerido'),
			lastname: Yup.string().required('Apellidos son requeridos'),
			email: Yup.string().email('Email inválido').required('Email es requerido'),
			phoneNumber: Yup.string()
				.required('Teléfono es requerido')
				.matches(/^\d{9,}$/, 'Debe ser un número positivo de al menos 9 dígitos'),
			emergency: Yup.object({
				nameOfEmergencyContact: Yup.string().required('Nombre del contacto de emergencia es requerido'),
				phoneNumber: Yup.string()
					.required('Teléfono del contacto de emergencia es requerido')
					.matches(/^\d{9,}$/, 'Debe ser un número positivo de al menos 9 dígitos'),
			}),
			birthday: Yup.date().required('Fecha de nacimiento es requerida'),
			address: Yup.object({
				street: Yup.string().required('Calle es requerida'),
				yardnumber: Yup.string().required('Número de portal es requerido'),
				zipcode: Yup.string()
					.required('Código postal es requerido')
					.matches(/^\d{4,5}$/, 'Debe ser un número de 4 o 5 dígitos'),
				city: Yup.string().required('Ciudad es requerida'),
				country: Yup.string().required('País es requerido'),
			}),
			moreinfo: Yup.string(),
			group: Yup.object({
				identificator: Yup.string().required('Identificador de grupo es requerido'),
				subdivision: Yup.string(),
			}),
		}),
		onSubmit: (values) => {
            console.log('values',values);
			dispatch(createResident(values));
			formik.resetForm();
		},
	});

	return (
		<Container id='registerContainer' maxW='container.sm' minHeight={'100vh'} paddingBottom={'10rem'} paddingTop={'2rem'}>
			<Heading id='registerHeading' as='h1' size='lg' textAlign='center' mb={'1rem'}>
				Nuevo residente
			</Heading>
			<form onSubmit={formik.handleSubmit}>
				<FormControl isInvalid={!!(formik.errors.firstname && formik.touched.firstname)}>
					<FormLabel htmlFor='firstnameInput'>Nombre</FormLabel>
					<InputGroup>
						<Input
							id='firstnameInput'
							name='firstname'
							placeholder='Nombre'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.firstname}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.firstname}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.lastname && formik.touched.lastname)} mt={'1rem'}>
					<FormLabel htmlFor='lastnameInput'>Apellidos</FormLabel>
					<InputGroup>
						<Input
							id='lastnameInput'
							name='lastname'
							placeholder='Apellidos'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.lastname}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.lastname}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.email && formik.touched.email)} mt={'1rem'}>
					<FormLabel htmlFor='emailInput'>Email</FormLabel>
					<InputGroup>
						<Input
							id='emailInput'
							name='email'
							placeholder='Tu email'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.email}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.phoneNumber && formik.touched.phoneNumber)} mt={'1rem'}>
					<FormLabel htmlFor='phoneNumberInput'>Teléfono</FormLabel>
					<InputGroup>
						<Input
							id='phoneNumberInput'
							name='phoneNumber'
							placeholder='Número de teléfono'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.phoneNumber}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.phoneNumber}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.emergency?.nameOfEmergencyContact && formik.touched.emergency?.nameOfEmergencyContact)} mt={'1rem'}>
					<FormLabel htmlFor='nameOfEmergencyContactInput'>Contacto de Emergencia</FormLabel>
					<InputGroup>
						<Input
							id='nameOfEmergencyContactInput'
							name='emergency.nameOfEmergencyContact'
							placeholder='Nombre del Contacto de Emergencia'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.emergency.nameOfEmergencyContact}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.emergency?.nameOfEmergencyContact}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.emergency?.phoneNumber && formik.touched.emergency?.phoneNumber)} mt={'2rem'}>
					<InputGroup>
						<Input
							id='emergencyPhoneNumberInput'
							name='emergency.phoneNumber'
							placeholder='Teléfono del Contacto de Emergencia'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.emergency.phoneNumber}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.emergency?.phoneNumber}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.birthday && formik.touched.birthday)} mt={'1rem'}>
					<FormLabel htmlFor='birthdayInput'>Fecha de nacimiento</FormLabel>
					<InputGroup>
						<Input
							id='birthdayInput'
							name='birthday'
							type='date'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.birthday}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.birthday}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.address?.street && formik.touched.address?.street)} mt={'1rem'}>
					<FormLabel htmlFor='streetInput'>Calle</FormLabel>
					<InputGroup>
						<Input
							id='streetInput'
							name='address.street'
							placeholder='Calle'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address.street}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.address?.street}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.address?.yardnumber && formik.touched.address?.yardnumber)} mt={'1rem'}>
					<FormLabel htmlFor='yardnumberInput'>Número de portal</FormLabel>
					<InputGroup>
						<Input
							id='yardnumberInput'
							name='address.yardnumber'
							placeholder='Número de portal'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address.yardnumber}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.address?.yardnumber}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.address?.zipcode && formik.touched.address?.zipcode)} mt={'1rem'}>
					<FormLabel htmlFor='zipcodeInput'>Código Postal</FormLabel>
					<InputGroup>
						<Input
							id='zipcodeInput'
							name='address.zipcode'
							placeholder='Código Postal'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address.zipcode}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.address?.zipcode}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.address?.city && formik.touched.address?.city)} mt={'1rem'}>
					<FormLabel htmlFor='cityInput'>Ciudad</FormLabel>
					<InputGroup>
						<Input
							id='cityInput'
							name='address.city'
							placeholder='Ciudad'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address.city}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.address?.city}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.address?.country && formik.touched.address?.country)} mt={'1rem'}>
					<FormLabel htmlFor='countryInput'>País</FormLabel>
					<InputGroup>
						<Input
							id='countryInput'
							name='address.country'
							placeholder='País'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address.country}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.address?.country}
					</FormErrorMessage>
				</FormControl>
				<FormControl mt={'1rem'}>
					<FormLabel htmlFor='moreInfoInput'>Más Información</FormLabel>
					<InputGroup>
						<Textarea
							id='moreInfoInput'
							name='moreinfo'
							placeholder='Más Información'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.moreinfo}
						/>
					</InputGroup>
				</FormControl>
                <FormControl isInvalid={!!(formik.errors.group?.identificator && formik.touched.group?.identificator)} mt={'1rem'}>
                    <FormLabel htmlFor='identificatorInput'>Identificador de Grupo</FormLabel>
					<Select id='identificatorInput' name='group.identificator' placeholder='Selecciona una opción' value={formik.values.group.identificator} onChange={formik.handleChange} onBlur={formik.handleBlur}>
						{groupOptions.map((option) => <option key={`gropuOption${option}`} value={option}>{option}</option>)}
					</Select>
                    <FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.group?.identificator}
					</FormErrorMessage>
				</FormControl>
                <FormControl isInvalid={!!(formik.errors.group?.subdivision && formik.touched.group?.subdivision)} mt={'1rem'}>
                <FormLabel htmlFor='subdivisionInput'>Subdivisión</FormLabel>
                <Select id='subdivisionInput' name='group.subdivision' placeholder='Subdivisión' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.group.subdivision}>
                        <option key='ninguna'>Ninguna</option>
                        {sudivisionGropuOptions.map((option) => <option key={`gropuOption${option}`} value={option}>{option}</option>)}
					</Select>
                    <FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.group?.subdivision}
					</FormErrorMessage>
				</FormControl>
				<Button mt={'2rem'} type='submit'>
					Registrar
				</Button>
			</form>
		</Container>
	);
};

export default ResidentForm;
