import {
	Box,
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FC, useEffect, useState } from 'react';
import { MonthResumeValuesInterface } from '../../interfaces/activityIntefaces';
import { groupOptions, sudivisionGroupOptions } from '../../utils/formOptions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { monthResume, resetError, resetSuccess } from '../../features/documents/documentSlice';

const MonthResumeForm: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const toast = useToast();
	const { isLoading, isError, isSuccess } = useSelector((state: RootState) => state.document || {});
	const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
	const [blobUrl, setBlobUrl] = useState<string | null>(null);

	useEffect(() => {
		if (isError) {
			toast({
				title: 'Ha ocurrido un error obteniendo el documento',
				description: 'Por favor, intenta de nuevo',
				status: 'error',
				duration: 6000,
				isClosable: true,
			});
			dispatch(resetError());
		}
		if (isSuccess) {
			toast({
				title: 'Puede descargar el documento',
				description: 'El documento se ha generado correctamente',
				status: 'success',
				duration: 6000,
				isClosable: true,
			});
			dispatch(resetSuccess());
		}
	}, [isError, isSuccess, toast, dispatch]);

	const formik = useFormik<MonthResumeValuesInterface>({
		initialValues: {
			month: '6',
			year: '2024',
			identificator: '',
			subdivision: 'nothing',
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			month: Yup.string().required('Mes requerido'),
			year: Yup.string().required('Año requerido'),
			identificator: Yup.string().required('Identificador de grupo requerido'),
			subdivision: Yup.string().required('Subdivisión de grupo requerida'),
		}),
		onSubmit: async (values) => {
			try {
				let response = null;
				if(values.subdivision === 'nothing'){
					values.subdivision = '';
					response = await dispatch(monthResume(values)).unwrap();
				} else{
					response = await dispatch(monthResume(values)).unwrap();
				}
				const blob = new Blob([response], { type: 'application/pdf' });
				const url = window.URL.createObjectURL(blob);
				setBlobUrl(url);
				setButtonDisabled(false); // Habilitar el botón de descarga
			} catch (error) {
				console.error('Error fetching PDF:', error);
			}
			formik.resetForm();
		},
	});

	const handleDownload = () => {
		if (blobUrl) {
			const link = document.createElement('a');
			link.href = blobUrl;
			link.setAttribute('download', 'actividad.pdf');
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(blobUrl);
			setBlobUrl(null); 
			setButtonDisabled(true); 
		}
	};

	return (
		<Container
			id='monthResumeFormContainer'
			maxW='container.sm'
			marginTop={'1rem'}
			border={'solid'}
			borderColor={'brand.500'}
			backgroundColor={'brand.50'}
			borderRadius={'lg'}
			padding={'1rem'}
		>
			<Heading id='monthResumeFormHeading' as='h1' size='lg' textAlign='center' mb={'1rem'}>
				Resumen mensual
			</Heading>
			<form onSubmit={formik.handleSubmit}>
				<Box display={'flex'}>
					<FormControl isInvalid={!!(formik.errors.month && formik.touched.month)}>
						<FormLabel htmlFor='titleInput'>Mes</FormLabel>
						<NumberInput
							size='md'
							maxW={20}
							min={1}
							max={12}
							value={formik.values.month}
							onChange={(valueString) => formik.setFieldValue('month', valueString)}
							onBlur={formik.handleBlur}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<FormErrorMessage position={'absolute'} right={'0'}>
							{formik.errors.month}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={!!(formik.errors.year && formik.touched.year)}>
						<FormLabel htmlFor='titleInput'>Año</FormLabel>
						<NumberInput
							size='md'
							maxW={20}
							min={2024}
							max={3000}
							value={formik.values.year}
							onChange={(valueString) => formik.setFieldValue('year', valueString)}
							onBlur={formik.handleBlur}
						>
							<NumberInputField padding={'1rem'}/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<FormErrorMessage position={'absolute'} right={'0'}>
							{formik.errors.year}
						</FormErrorMessage>
					</FormControl>
				</Box>
				<FormControl isInvalid={!!(formik.errors.identificator && formik.touched.identificator)} mt={'1rem'}>
					<FormLabel htmlFor='identificatorInput'>Identificador de grupo</FormLabel>
					<Select
						id='identificatorInput'
						name='identificator'
						placeholder='Selecciona un grupo'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.identificator}
					>
						{groupOptions.map((group) => (
							<option key={group} value={group}>
								{group}
							</option>
						))}
					</Select>
					<FormErrorMessage position={'absolute'} right={'0'}>
						{formik.errors.identificator}
					</FormErrorMessage>
				</FormControl>
				<FormControl mt={'1rem'}>
					<FormLabel htmlFor='subdivisionInput'>Subdivisión</FormLabel>
					<Select
						id='subdivisionInput'
						name='subdivision'
						placeholder='Selecciona una subdivisión'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.subdivision}
						isDisabled={formik.values.identificator === 'I' ? false : true}
					>
						{sudivisionGroupOptions.map((subdivision) => (
							<option key={subdivision} value={subdivision}>
								{subdivision}
							</option>
						))}
					</Select>
				</FormControl>
				<Button mt={'2rem'} size={'lg'} width={'full'} type='submit'>
					Solicitar resumen
				</Button>
				<Button mt={'2rem'} size={'lg'} width={'full'} type='submit' isDisabled={buttonDisabled} isLoading={isLoading} onClick={handleDownload}>
					Descargar resumen
				</Button>
			</form>
		</Container>
	);
};

export default MonthResumeForm;
