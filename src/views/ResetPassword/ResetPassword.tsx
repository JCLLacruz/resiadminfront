import {
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
    useToast,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../features/auth/authSlice';
import { resetPasswordValues } from '../../interfaces/authInterfaces';
import { AppDispatch } from '../../app/store';
import { eyeClosedIcon, eyeOpenIcon } from '../../assets/icons/icons';

const ResetPassword: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
    const {recovertoken} = useParams();
    const {isLoading, isError, isSuccess} = useSelector((state: any) => state.auth || {});
    const [show, setShow] = useState<boolean>(false);
    const toast = useToast();
    const handleClick = () => setShow(!show);

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
				title: 'Contraseña cambiada',
				description: 'Su contraseña ha sido cambiada exitosamente',
				status: 'success',
				duration: 6000,
				isClosable: true,
			});
            navigate('/');
        }
    }, [isError, isSuccess]);


	const formik = useFormik<resetPasswordValues>({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
						confirmPassword: Yup.string()
							.oneOf([Yup.ref('password')], 'Passwords must match')
							.required('Required'),
		}),
		onSubmit: (values) => {
			dispatch(resetPassword({password: values, recoverToken: recovertoken || ''}));
			formik.resetForm();
		},
	});

	return (
		<Container id='loginContainer' maxW='container.sm' padding={'2rem'}>
			<Heading id='loginHeading' as='h1' size='lg' textAlign='center' mb={4}>
				Cambia tu ontraseña
			</Heading>
			<form onSubmit={formik.handleSubmit}>
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
				<Button mt={4} type='submit' isLoading={isLoading}>
					Cambiar contraseña
				</Button>
			</form>
		</Container>
	);
};

export default ResetPassword;
