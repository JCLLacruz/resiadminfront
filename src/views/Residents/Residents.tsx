import { Box, Button, Container, Heading, Input, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllResidents } from '../../features/residents/residentSlice';
import { AppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { groupOptions } from '../../utils/formOptions';

const Residents: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { residents } = useSelector((state: any) => state.resident || {});
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

	return (
		<Container maxW='container.xl'>
			<Heading size={'3xl'} mb={'2rem'}>
				Residentes
			</Heading>
			<Input placeholder='Buscar residente' mb={'1rem'} value={searchTerm} onChange={handleChange} />
			<Box display={'flex'} mb={'1rem'} gap={'1rem'}>
				<Button onClick={() => setFilteredResidents(residents)}>Todos</Button>
				{groupOptions.map((group, i) => (
					<Button key={i + group} onClick={() => groupFilter(group)}>{`Grupo ${group}`}</Button>
				))}
			</Box>
			<Container key={'residentContainer'} maxW='container.xl' display={'flex'} gap={'1rem'} width={'100%'} justifyContent={'center'} flexWrap={'wrap'}>
				{filteredResidents.map((resident: any) => (
					<>
						<Box
							key={`resident_${resident._id}`}
							display={'flex'}
							width={'400px'}
							justifyContent={'space-between'}
							alignItems={'center'}
							borderWidth='1px'
							borderRadius='lg'
							overflow='hidden'
							maxW='sm'
							boxShadow='md'
							paddingX={'2rem'}
							paddingY={'1rem'}
							onClick={() => handleClick(resident._id)}
						>
							<Box>
								<Heading mb={'0.5rem'}>
									{resident.firstname} {resident.lastname}
								</Heading>
								<Box>
									<Text>Teléfono: {resident.phoneNumber}</Text>
								</Box>
							</Box>
							<Box>
								<Text fontSize={'rem'} color={'brand.500'}>
									Grupo {resident.group.identificator}
								</Text>
							</Box>
						</Box>
					</>
				))}
			</Container>
		</Container>
	);
};

export default Residents;
