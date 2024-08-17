import { Box, Button, Container, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllResidents } from '../../features/residents/residentSlice';
import { AppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { groupOptions } from '../../utils/formOptions';

const Residents: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { residents, isLoading } = useSelector((state: any) => state.resident || {});
	const [filteredResidents, setFilteredResidents] = useState(residents);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		dispatch(getAllResidents());
	}, []);

	useEffect(() => {
		setFilteredResidents(
			residents.filter(
				(resident: any) =>
					resident.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || resident.lastname.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [residents, searchTerm]);

	const groupFilter = (group: string) => {
		setFilteredResidents(residents.filter((resident: any) => resident.group.identificator === group));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleClick = (_id: string) => {
		navigate(`/residentcard/${_id}`);
	};
	if (isLoading || !residents) {
		return (
			<Container maxW='container.sm' width={'100vw'} height={'60vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
				<Spinner size='xl' />
			</Container>
		);
	}

	return (
		<Container maxW='container.sm' marginBottom={'7rem'}>
			<Heading size={'3xl'} mb={'2rem'} onClick={() => navigate('/residents')} cursor={'pointer'}>
				Residentes
			</Heading>
			<Input placeholder='Buscar residente' mb={'1rem'} value={searchTerm} onChange={handleChange} />
			<Box display={'flex'} mb={'1rem'} gap={'1rem'}>
				<Button onClick={() => setFilteredResidents(residents)}>Todos</Button>
				{groupOptions.map((group, i) => (
					<Button key={i + group} onClick={() => groupFilter(group)}>{`Grupo ${group}`}</Button>
				))}
			</Box>
			<Box key={'residentContainerFilter'} display={'flex'} gap={'0.5rem'} width={'100%'} justifyContent={'center'} flexWrap={'wrap'}>
				{filteredResidents.map((resident: any) => (
					<>
						<Box
							key={`resident_${resident._id}`}
							width={'100%'}
							display={'flex'}
							flexDirection={'column'}
							justifyContent={'center'}
							borderWidth='1px'
							borderRadius='lg'
							overflow='hidden'
							boxShadow='md'
							paddingX={'2rem'}
							paddingY={'1rem'}
							cursor={'pointer'}
							onClick={() => handleClick(resident._id)}
						>
							<Box display={'flex'}>
							<Heading marginRight={'1rem'}>
								{resident.firstname} {resident.lastname}
							</Heading>
							<Text color={'brand.500'}>Grupo {resident.group.identificator}</Text>
							</Box>
							<Box>
								<Text>Teléfono: {resident.phoneNumber}</Text>
							</Box>
						</Box>
					</>
				))}
			</Box>
		</Container>
	);
};

export default Residents;
