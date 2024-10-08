import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Birthdays from '../../components/Birthdays/Birthdays';
import { useDispatch, useSelector } from 'react-redux';
import { getAllResidents } from '../../features/residents/residentSlice';
import { AppDispatch, RootState } from '../../app/store';
import Statistics from '../../components/Statistics/Statistics';

const Information: FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { residents } = useSelector((state: RootState) => state.resident || {});

	useEffect(() => {
		dispatch(getAllResidents());
	}, []);
	return (
		<Container maxW='container.sm' marginBottom={'7rem'}>
			<Box display={'flex'} gap={'1rem'} justifyContent={'end'} marginBottom={'1rem'}>
				<Button onClick={() => navigate('/monthresume')}>Resumen mensual</Button>
			</Box>
			<Heading size={'3xl'} mb={'2rem'} onClick={() => navigate('/statistics')} cursor={'pointer'}>
				Información extra
			</Heading>
			<Box>
				<Birthdays residents={residents} />
			</Box>
			<Box>
				<Statistics/>
			</Box>
		</Container>
	);
};

export default Information;
