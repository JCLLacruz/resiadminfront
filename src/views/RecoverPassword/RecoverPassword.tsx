import {
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	useToast,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { recoverPassword } from '../../features/auth/authSlice';
import { recoverPasswordValues } from '../../interfaces/authInterfaces';
import { AppDispatch, RootState } from '../../app/store';

const RecoverPassword: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate: NavigateFunction = useNavigate();
	const { isLoading, isError, isSuccess } = useSelector((state: RootState) => state.auth || {});
	const toast = useToast();

	useEffect(() => {
		if (isError) {
			toast({
				title: 'Ha ocurrido un error',
				description: 'Por favor, intenta de nuevo',
				status: 'error',
				duration: 6000,
				isClosable: true,
			});
		}
		if (isSuccess) {
			toast({
				title: 'Servidor conectado',
				description: 'Habrá un email en tu bandeja de entrada para cambiar su contraseña',
				status: 'success',
				duration: 6000,
				isClosable: true,
			});
			navigate('/login');
		}
	}, [isError, isSuccess]);

	const formik = useFormik<recoverPasswordValues>({
		initialValues: {
			email: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().required('Required'),
		}),
		onSubmit: (values) => {
			dispatch(recoverPassword(values.email));
			formik.resetForm();
			navigate('/');
		},
	});

	return (
		<Container id='loginContainer' maxW='container.sm' padding={'2rem'}>
			<Heading id='loginHeading' as='h1' size='lg' textAlign='center' mb={4}>
				Introduce tu email
			</Heading>
			<form onSubmit={formik.handleSubmit}>
				<FormControl isInvalid={!!(formik.errors.email && formik.touched.email)} mt={'1rem'}>
					<FormLabel htmlFor='emailInput'>Email</FormLabel>
					<InputGroup size='md'>
						<Input
							id='emailInput'
							name='email'
							pr='4.5rem'
							placeholder='Introduzca su email'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
						/>
					</InputGroup>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.email}
					</FormErrorMessage>
				</FormControl>
				<Button mt={4} type='submit' isLoading={isLoading}>
					Cambiar contraseña
				</Button>
			</form>
		</Container>
	);
};

export default RecoverPassword;
