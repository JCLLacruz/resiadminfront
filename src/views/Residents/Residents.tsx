import { Box, Container, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllResidents } from '../../features/residents/residentSlice';
import { AppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

    const handleClick = (_id: string) => {
        navigate(`/residentcard/${_id}`);
    }

	return (
		<Container maxW='container.sm' padding={'2rem'}>
			<Heading size={'3xl'} mb={'2rem'}>
				Residentes
			</Heading>
			<Input placeholder='Buscar residente' mb={'2rem'} value={searchTerm} onChange={handleChange} />
			<Box display={'flex'} flexDirection={'column'} gap={'1rem'}>
				{filteredResidents.map((resident: any) => (
					<Box key={resident._id} borderWidth='1px' borderRadius='lg' overflow='hidden' maxW='sm' boxShadow='md' paddingX={'2rem'} paddingY={'1rem'} onClick={()=>handleClick(resident._id)}>
						<Heading mb={'0.5rem'}>
							{resident.firstname} {resident.lastname}
						</Heading>
						<Stack direction={{ base: 'column', md: 'row' }} spacing='24px'>
							<Box>
								<Text mb={'1rem'} paddingLeft={'1rem'}>
									Teléfono: {resident.phoneNumber}
								</Text>
							</Box>
						</Stack>
					</Box>
				))}
			</Box>
		</Container>
	);
};

export default Residents;
