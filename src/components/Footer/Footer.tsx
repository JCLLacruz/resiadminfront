import { Box, Button, Container, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { plusBoxIcon } from '../../assets/icons/icons';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../../interfaces/authInterfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { resetResident } from '../../features/residents/residentSlice';

const Footer: FC = () => {
	const navigate: any = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [user, setUser] = useState<UserInterface | undefined>(undefined);

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('user') || '{}'));
	}, []);

	const goTo = (to: string) => {
		switch (to) {
			case 'register':
				navigate('/userform');
				break;
			case 'residents':
				dispatch(resetResident());
				setTimeout(() => {
					navigate('/residents');
				}, 1000);
				break;
			case 'activities':
				navigate('/activities');
				break;
			case 'residentform':
				dispatch(resetResident());
				navigate('/residents');
				setTimeout(() => {
					navigate('/residentform');
				}, 5);
				break;
			case 'sessionform':
				navigate('/sessionform/');
				break;
			case 'activityform':
				navigate('/activityform/');
				break;

			default:
				break;
		}
	};
	return (
		<Container
			display={'flex'}
			maxW='container.xxl'
			paddingTop={'0.5rem'}
			height={'5rem'}
			bg='brand.50'
			position={'fixed'}
			bottom={'0'}
			boxShadow='0 -10px 6px rgba(0, 0, 0, 0.1)'
			alignItems={'start'}
			justifyContent={'space-between'}
			zIndex={1000}
		>
			<Menu>
				<MenuButton  as={Button} bg='transparent' _hover={'transparent'} alignItems={'start'} paddingTop={'3px'}>
					{plusBoxIcon}
				</MenuButton>
				<MenuList marginBottom={'1rem'} marginLeft={'1rem'}>
					{user?.role === 'superadmin' && (
						<>
							<MenuItem height={'4rem'} onClick={() => goTo('register')}>
								Registrar nuevo empleado
							</MenuItem>
							<MenuItem height={'4rem'} onClick={() => goTo('activityform')}>
								Nueva actividad
							</MenuItem>
						</>
					)}
					<MenuItem height={'4rem'} onClick={() => goTo('residentform')}>
						Nuevo residente
					</MenuItem>
					<MenuItem height={'4rem'} onClick={() => goTo('sessionform')}>
						Nueva sesión
					</MenuItem>
				</MenuList>
			</Menu>
			<Box paddingX={'0.75rem'} width={'100%'} display={'flex'} justifyContent={'end'} gap={'1rem'}>
				<Button onClick={() => goTo('residents')}>Residentes</Button>
				<Button onClick={() => goTo('activities')}>Actividades</Button>
			</Box>
		</Container>
	);
};

export default Footer;
