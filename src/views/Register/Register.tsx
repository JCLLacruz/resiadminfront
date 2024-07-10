import { Box, Button, FormControl, FormErrorMessage, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RegisterValues } from '../../interfaces/authInterfaces';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';


const Register: FC = () => {
	const [show, setShow] = useState<boolean>(false);
	const handleClick = () => setShow(!show);
    const dispatch: any = useDispatch();

	const formik = useFormik<RegisterValues>({
		initialValues: {
			firstname: '',
			lastname: '',
			email: '',
			telephonnumber: '',
			password: '',
			confirmPassword: '',
			birthday: new Date(),
		},
		validationSchema: Yup.object({
			firstname: Yup.string().required('Required'),
			lastname: Yup.string().required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			telephonnumber: Yup.number().required('Required').positive('Must be a positive number').integer('Must be an integer').min(9,'Must be at least 9 digits'),
			password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password')], 'Passwords must match')
				.required('Required'),
			birthday: Yup.date().required('Required'),
		}),
		onSubmit: (values) => {
            dispatch(register(values))
            formik.resetForm();
		},
	});

	return (
		<Box id='registerBox' padding={'2rem'}>
			<Heading id='registerHeading' as='h1' size='lg' textAlign='center' mb={4}>
				Register
			</Heading>
			<form onSubmit={formik.handleSubmit}>
				<FormControl isInvalid={!!(formik.errors.firstname && formik.touched.firstname)}>
					<InputGroup>
						<Input
							name='firstname'
							placeholder='First Name'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.firstname}
						/>
					</InputGroup>
					<FormErrorMessage>{formik.errors.firstname}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.lastname && formik.touched.lastname)} mt={'1rem'}>
					<InputGroup>
						<Input name='lastname' placeholder='Last Name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastname} />
					</InputGroup>
					<FormErrorMessage>{formik.errors.lastname}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.email && formik.touched.email)} mt={'1rem'}>
					<InputGroup>
						<Input name='email' placeholder='Your email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
					</InputGroup>
					<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.telephonnumber && formik.touched.telephonnumber)} mt={'1rem'}>
					<InputGroup>
						<Input
							name='telephonnumber'
							placeholder='Telephone Number'
                            type='number'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.telephonnumber}
						/>
					</InputGroup>
					<FormErrorMessage>{formik.errors.telephonnumber}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.password && formik.touched.password)} mt={'1rem'}>
					<InputGroup size='md'>
						<Input
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
								{show ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
					<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.confirmPassword && formik.touched.confirmPassword)} mt={'1rem'}>
					<InputGroup size='md'>
						<Input
							name='confirmPassword'
							pr='4.5rem'
							type={show ? 'text' : 'password'}
							placeholder='Confirm password'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.confirmPassword}
						/>
						<InputRightElement width='4.5rem'>
							<Button h='1.75rem' size='sm' onClick={handleClick}>
								{show ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
					<FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!(formik.errors.birthday && formik.touched.birthday)} mt={'1rem'}>
					<InputGroup>
						<Input
							name='birthday'
							type='date'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.birthday}
						/>
					</InputGroup>
					<FormErrorMessage>{!!formik.errors.birthday}</FormErrorMessage>
				</FormControl>
				<Button mt={4} type='submit'>
					Register
				</Button>
			</form>
		</Box>
	);
};

export default Register;
