import { Box, Button, Container, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FC } from 'react';
import { plusBoxIcon } from '../../assets/icons/icons';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../../interfaces/authInterfaces';

const Footer: FC = () => {
	const navigate: any = useNavigate();
	const user: UserInterface = JSON.parse(localStorage.getItem('user') || '');	

	const goTo = (to: string) => {
		switch (to) {
			case 'register':
				navigate('/register');
				break;
			case 'residents':
				navigate('/residents');
				break;
			case 'activities':
				navigate('/activities');
				break;
			case 'residentform':
				navigate('/residentform');
				break;
			case 'sessionform':
				navigate('/sessionform/');
				break;

			default:
				break;
		}
	};
	return (
		<Container
			display={'flex'}
            padding={'0'}
			maxW='container.xxl'
			height={'3.5rem'}
			bg='brand.50'
			position={'fixed'}
			bottom={'0'}
			boxShadow='0 -10px 6px rgba(0, 0, 0, 0.1)'
			alignItems={'center'}
			justifyContent={'space-between'}
			zIndex={1000}
		>
			<Menu>
				<MenuButton padding={'2rem'} margin={'0'} as={Button} bg='transparent' _hover={'transparent'}>
					{plusBoxIcon}
				</MenuButton>
				<MenuList marginBottom={'1rem'} marginLeft={'1rem'}>
					{user.role === 'superadmin' &&(
						<MenuItem height={'4rem'} onClick={() => goTo('register')}>
						Registrar nuevo empleado
					</MenuItem>
					)}
					<MenuItem height={'4rem'} onClick={() => goTo('residentform')}>Nuevo residente</MenuItem>
					<MenuItem height={'4rem'} onClick={() => goTo('sessionform')}>Nueva sesión</MenuItem>
					<MenuItem height={'4rem'}>Nueva actividad</MenuItem>
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
