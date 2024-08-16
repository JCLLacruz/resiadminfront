import { Box, Button, Container, Heading, Image, Input, Spinner, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../features/auth/authSlice';
import { AppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../../interfaces/authInterfaces';
import { jobPositionOptions } from '../../utils/formOptions';
import { getImageSrc } from '../../utils/functions';
import noProfileImage from '../../assets/images/no-profile-image.png';

const Users: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { users, isLoading } = useSelector((state: any) => state.auth || {});
	const [filteredUsers, setFilteredUsers] = useState(users);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	useEffect(() => {
		setFilteredUsers(
			users.filter(
				(user: UserInterface) =>
					user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [users, searchTerm]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const roleFilter = (jobPosition: string) => {
		setFilteredUsers(users.filter((user: any) => user.jobPosition === jobPosition));
	};

	const handleClick = (_id: string) => {
		navigate(`/usercard/${_id}`);
	};
	if (isLoading || !users) {
		return (
			<Container maxW='container.xl' width={'100vw'} height={'60vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
				<Spinner size='xl' />
			</Container>
		);
	}

	return (
		<Container maxW='container.xl' marginBottom={'7rem'}>
			<Heading size={'3xl'} mb={'2rem'} onClick={() => navigate('/users')} cursor={'pointer'}>
				Empleados
			</Heading>
			<Input placeholder='Buscar empleado' mb={'1rem'} value={searchTerm} onChange={handleChange} />
			<Box display={'flex'} mb={'1rem'} gap={'1rem'} flexWrap={'wrap'}>
				<Button onClick={() => setFilteredUsers(users)}>Todos</Button>
				{jobPositionOptions.map((jobPosition, i) => (
					<Button key={i + jobPosition} onClick={() => roleFilter(jobPosition)}>
						{jobPosition}
					</Button>
				))}
			</Box>
			<Box key={'userContainerFilter'} maxW='container.xl' display={'flex'} gap={'1rem'} width={'100%'} justifyContent={'center'} flexWrap={'wrap'}>
				{filteredUsers.map((user: UserInterface) => (
					<Box
						key={`user_${user._id}`}
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
						onClick={() => handleClick(user._id)}
					>
						<Heading marginBottom={'1rem'}>
							{user.firstname} {user.lastname}
						</Heading>
						<Box display={'flex'}>
							<Box width={'8rem'} height={'8rem'} padding={0} margin={0} marginRight={'1rem'}>
								{user.images.length > 0 ? (
									<Image
										width={'100%'}
										height={'100%'}
										objectFit={'cover'}
										src={getImageSrc((user.images[0] as any)?.data?.data, (user.images[0] as any)?.contentType)}
										cursor={'pointer'}
									/>
								) : (
									<Image width={'100%'} height={'100%'} objectFit={'cover'} src={noProfileImage} cursor={'pointer'} />
								)}
							</Box>
							<Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
								<Text fontSize={'rem'} color={'brand.500'} mb={'0.5rem'}>
									Cargo: {user.jobPosition}
								</Text>
								<Text>Teléfono: {user.telephonnumber}</Text>
								<Text>Email: {user.email}</Text>
							</Box>
						</Box>
					</Box>
				))}
			</Box>
		</Container>
	);
};

export default Users;
