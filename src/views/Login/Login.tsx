import {
	Box,
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Text,
	useToast,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetError, resetSuccess } from '../../features/auth/authSlice';
import { LoginValues } from '../../interfaces/authInterfaces';
import { AppDispatch } from '../../app/store';
import { serverStatus } from '../../features/server/serverSlice';
import useWindowSize from '../../hooks/useWindowSize';

const Login: FC = () => {
	const isMobile = useWindowSize();
	const { isError, isSuccess, msg, currentUser } = useSelector((state: any) => state.auth || {});
	const { isError: errorServer, isSuccess: successServer, msg: msgServer } = useSelector((state: any) => state.server || {});
	const toast = useToast();
	const [show, setShow] = useState<boolean>(false);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleStatusServer = () => {
		dispatch(serverStatus());
	};

	useEffect(() => {
		handleStatusServer();
	}, []);

	useEffect(() => {
		if (isError) {
			toast({
				title: 'Ha ocurrido un error',
				description: 'Por favor, intenta de nuevo',
				status: 'error',
				duration: 6000,
				isClosable: true,
			});
			dispatch(resetError());
		}
		if (isSuccess) {
			toast({
				title: 'Login exitoso',
				description: 'Has iniciado sesión correctamente',
				status: 'success',
				duration: 6000,
				isClosable: true,
			});
			isMobile ? navigate('/activities') : navigate('/adminpanel');
			dispatch(resetSuccess());
		}
	}, [currentUser, isError, isSuccess, msg, toast, dispatch]);

	useEffect(() => {
		if (errorServer) {
			toast({
				title: 'Ha ocurrido un error',
				description: 'Por favor, intenta de nuevo',
				status: 'error',
				duration: 6000,
				isClosable: true,
			});
			dispatch(resetError());
		}
		if (successServer) {
			toast({
				title: 'Servidor conectado',
				description: 'El servidor se ha conectado correctamente',
				status: 'success',
				duration: 6000,
				isClosable: true,
			});
		}
	}, [errorServer, successServer, msgServer, dispatch]);

	const handleClick = () => setShow(!show);

	const formik = useFormik<LoginValues>({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
		}),
		onSubmit: (values) => {
			dispatch(login(values));
			formik.resetForm();
		},
	});

	return (
		<Container id='loginContainer' maxW='container.sm' padding={'2rem'}>
			{!successServer ? (
				<Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={'100%'} height={'80vh'}>
					<Text marginBottom={'3rem'}>Conectando con el servidor.</Text>
					<Spinner size='xl' />
				</Box>
			) : (
				<>
					<Heading id='loginHeading' as='h1' size='lg' textAlign='center' mb={4}>
						Login
					</Heading>
					<form onSubmit={formik.handleSubmit}>
						<Box>
							<FormControl id='email' isInvalid={!!formik.errors.email && formik.touched.email}>
								<InputGroup>
									<Input
										id='emailInput'
										name='email'
										placeholder='Your email'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.email}
									/>
								</InputGroup>
								<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
							</FormControl>
							<FormControl id='password' isInvalid={!!formik.errors.password && formik.touched.password} mt={'1rem'}>
								<InputGroup size='md' display={'flex'}>
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
									<InputRightElement width={'4rem'}>
										<Button onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
									</InputRightElement>
								</InputGroup>
								<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
							</FormControl>
						</Box>
						<Button mt={4} type='submit'>
							Login
						</Button>
					</form>
					<Box mt={4} textAlign='center'>
						Has olvidado tu contraseña?
						<Text color={'brand.500'} onClick={() => navigate('/recoverpassword')}>
							haz click aquí
						</Text>
					</Box>
				</>
			)}
		</Container>
	);
};

export default Login;
