import { Box, Button, FormControl, FormErrorMessage, Heading, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

interface LoginValues {
	email: string;
	password: string;
}

const Login: FC = () => {
	const [show, setShow] = useState<boolean>(false);
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
			console.log(values);
		},
	});

	return (
		<Box id='loginBox' padding={'2rem'}>
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
				Don't have an account? <Link to='/register'>Register</Link>
			</Text>
		</Box>
	);
};

export default Login;
