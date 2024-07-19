import { Button, Container, FormControl, FormErrorMessage, Heading, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { LoginValues } from '../../interfaces/authInterfaces';
import { AppDispatch } from '../../app/store';


const Login: FC = () => {
	const [show, setShow] = useState<boolean>(false);
	const handleClick = () => setShow(!show);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
	  setTimeout(() => {
		  navigate('/activities');
	  }, 1000);
		},
	});

	return (
		<Container id='loginContainer' maxW='container.sm' padding={'2rem'}>
			<Heading id='loginHeading' as='h1' size='lg' textAlign='center' mb={4}>
				Login
			</Heading>
			<form onSubmit={formik.handleSubmit}>
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
							<Button onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
						</InputRightElement>
					</InputGroup>
					<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
				</FormControl>
				<Button mt={4} type='submit'>
					Login
				</Button>
			</form>
      <Text mt={4} textAlign='center'>
        forgot your password? <Link href='#'>click here</Link>
      </Text>
		</Container>
	);
};

export default Login;
