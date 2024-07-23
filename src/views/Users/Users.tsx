import { Box, Button, Container, Heading, Input, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../features/auth/authSlice';
import { AppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../../interfaces/authInterfaces';
import { roleOptions } from '../../utils/formOptions';

const Users: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { users } = useSelector((state: any) => state.auth || {});
	const [filteredUsers, setFilteredUsers] = useState(users);
	const [searchTerm, setSearchTerm] = useState('');
	console.log('users', users);

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

    const roleFilter = (role: string) => {
		setFilteredUsers(users.filter((user: any) => user.role === role));
	};

	const handleClick = (_id: string) => {
		navigate(`/usercard/${_id}`);
	};

	return (
		<Container maxW='container.xl'>
			<Heading size={'3xl'} mb={'2rem'}>
				Empleados
			</Heading>
			<Input placeholder='Buscar usuario' mb={'1rem'} value={searchTerm} onChange={handleChange} />
            <Box display={'flex'} mb={'1rem'} gap={'1rem'}>
				<Button onClick={() => setFilteredUsers(users)}>Todos</Button>
				{roleOptions.map((role, i) => (
					<Button key={i + role} onClick={() => roleFilter(role)}>{role}</Button>
				))}
			</Box>
			<Container
				key={'userContainerFilter'}
				maxW='container.xl'
				display={'flex'}
				gap={'1rem'}
				width={'100%'}
				justifyContent={'center'}
				flexWrap={'wrap'}
			>
				{filteredUsers.map((user: UserInterface) => (
					<Box
						key={`user_${user._id}`}
						display={'flex'}
						flexDirection={'column'}
						width={'400px'}
						justifyContent={'space-between'}
						alignItems={'start'}
						borderWidth='1px'
						borderRadius='lg'
						overflow='hidden'
						maxW='sm'
						boxShadow='md'
						paddingX={'2rem'}
						paddingY={'1rem'}
						onClick={() => handleClick(user._id)}
					>
						<Box>
							<Heading>
								{user.firstname} {user.lastname}
							</Heading>
							<Text fontSize={'rem'} color={'brand.500'} mb={'0.5rem'}>
								Rol: {user.role}
							</Text>
							<Text>Teléfono: {user.telephonnumber}</Text>
							<Text>Email: {user.email}</Text>
						</Box>
					</Box>
				))}
			</Container>
		</Container>
	);
};

export default Users;
