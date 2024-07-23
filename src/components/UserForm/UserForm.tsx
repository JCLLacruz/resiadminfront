import { Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, Select } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RegisterValues, UserInterface } from '../../interfaces/authInterfaces';
import { useDispatch, useSelector } from 'react-redux';
import { register, updateUser } from '../../features/auth/authSlice';
import { eyeOpenIcon, eyeClosedIcon } from '../../assets/icons/icons';
import { AppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { roleOptions } from '../../utils/formOptions';

interface UserFormProps {
	userProp?: UserInterface | null;
}

const UserForm: FC<UserFormProps> = ({ userProp }) => {
	const [show, setShow] = useState<boolean>(false);
	const handleClick = () => setShow(!show);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
    const {user: userState} = useSelector((state: any) => state.auth || {});
	const [user, setUser] = useState<RegisterValues>({
		firstname: '',
		lastname: '',
		email: '',
		telephonnumber: '',
		password: '',
		confirmPassword: '',
		role: '',
		birthday: new Date(),
	});
	console.log(userProp);

	useEffect(() => {
		if (userProp) {
			const { _id, connections, createdAt, CommentIds,  images, updatedAt, birthday, emailConfirmed, ...restUser } = userProp;
			const birthdaySliced = birthday.slice(0, 10);
			console.log(birthdaySliced);

			setUser({ ...restUser, birthday: birthdaySliced, password: '', confirmPassword: '' });
		}
	}, [userProp, userState]);

	const formik = useFormik<RegisterValues>({
		initialValues: user,
        enableReinitialize: true,
		validationSchema: Yup.object({
			firstname: Yup.string().required('Required'),
			lastname: Yup.string().required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			telephonnumber: Yup.number()
				.required('Required')
				.positive('Must be a positive number')
				.integer('Must be an integer')
				.min(9, 'Must be at least 9 digits'),
			birthday: Yup.date().required('Required'),
			role: Yup.string().required('Required'),
			...(userProp
				? {}
				: {
						password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
						confirmPassword: Yup.string()
							.oneOf([Yup.ref('password')], 'Passwords must match')
							.required('Required'),
				  }),
		}),
		onSubmit: (values) => {
			if (userProp) {
				dispatch(updateUser({ user: values, id: userProp._id }));
				navigate('/usercard/' + userProp._id);
			} else {
				dispatch(register(values));
				navigate('/users');
			}
			formik.resetForm();
		},
	});

	return (
		<Container id='registerContainer' maxW='container.sm' marginBottom={'6rem'} marginTop={'1rem'}>
			<Heading id='registerHeading' as='h1' size='lg' textAlign='center' mb={'1rem'}>
				{userProp ? `Edita el usuario ${userProp.firstname}` : 'Registra un empleado'}
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
				<FormControl isInvalid={!!(formik.errors.telephonnumber && formik.touched.telephonnumber)} mt={'1rem'}>
					<FormLabel htmlFor='telephonnumberInput'>Teléfono</FormLabel>
					<InputGroup>
						<Input
							id='telephonnumberInput'
							name='telephonnumber'
							placeholder='Telephone Number'
							type='number'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.telephonnumber}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.telephonnumber}
					</FormErrorMessage>
				</FormControl>
				{!userProp && (
					<>
						<FormControl isInvalid={!!(formik.errors.password && formik.touched.password)} mt={'1rem'}>
							<FormLabel htmlFor='passwordInput'>Contraseña</FormLabel>
							<InputGroup size='md'>
								<Input
									id='passwordInput'
									name='password'
									pr='4.5rem'
									type={show ? 'text' : 'password'}
									placeholder='Enter password'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.password}
								/>
								<InputRightElement width='4.5rem'>
									<Button h='1.75rem' size='sm' onClick={handleClick}>
										{show ? eyeClosedIcon : eyeOpenIcon}
									</Button>
								</InputRightElement>
							</InputGroup>
							<FormErrorMessage position={'absolute'} right={'0'}>
								{formik.errors.password}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={!!(formik.errors.confirmPassword && formik.touched.confirmPassword)} mt={'2rem'}>
							<InputGroup size='md'>
								<Input
									name='confirmPassword'
									pr='4.5rem'
									type={show ? 'text' : 'password'}
									placeholder='Confirma la contraseña'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.confirmPassword}
								/>
								<InputRightElement width='4.5rem'>
									<Button h='1.75rem' size='sm' onClick={handleClick}>
										{show ? eyeClosedIcon : eyeOpenIcon}
									</Button>
								</InputRightElement>
							</InputGroup>
							<FormErrorMessage position={'absolute'} right={'0'}>
								{formik.errors.confirmPassword}
							</FormErrorMessage>
						</FormControl>
					</>
				)}
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
						{!!formik.errors.birthday}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.role && formik.touched.role)} mt={'1rem'}>
					<FormLabel htmlFor='identificatorInput'>Identificador de grupo</FormLabel>
					<Select
						id='roleInput'
						name='role'
						placeholder='Selecciona un rol'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.role}
					>
						{roleOptions.map((role) => (
							<option key={role} value={role}>
								{role}
							</option>
						))}
					</Select>
				</FormControl>
				<Button mt={'2rem'} size={'lg'} width={'full'} type='submit'>
					{userProp ? 'Actualizar usuario' : 'Registrar'}
				</Button>
			</form>
		</Container>
	);
};

export default UserForm;
