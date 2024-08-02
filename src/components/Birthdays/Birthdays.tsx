import { FC, useEffect, useState } from 'react';
import { ResidentInterface } from '../../interfaces/residentInterfaces';
import { formatDate } from '../../utils/functions';
import {
	Box,
	Container,
	Heading,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Text,
} from '@chakra-ui/react';
import { getAllResidents } from '../../features/residents/residentSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

interface BirthdaysProps {
	residents: ResidentInterface[];
}
interface BirthDayInterface {
	firstname: string;
	lastname: string;
	date: string;
}

const Birthdays: FC<BirthdaysProps> = ({ residents }) => {
	const dispatch = useDispatch<AppDispatch>()
	const [birthdays, setBirthdays] = useState<BirthDayInterface[]>([]);
	const [month, setMonth] = useState<number>(+formatDate(new Date().toISOString()).slice(3, 5));
	const [filteredBirthdays, setFilteredBirthdays] = useState<BirthDayInterface[]>([]);

	const getAllBirthdays = (residents: ResidentInterface[]): BirthDayInterface[] => {
		let allBirthdays: BirthDayInterface[] = [];
		residents.forEach((resident: ResidentInterface) => {
			allBirthdays.push({ firstname: resident.firstname, lastname: resident.lastname, date: formatDate(resident.birthday) });
		});

		return allBirthdays;
	};
      
      const filterBirthDaysToNextThreeMonths = (currentMonth: number, birthdaysToFilter: BirthDayInterface[]): BirthDayInterface[] => {
        const filteredBirthdaysByMonth: BirthDayInterface[] = birthdaysToFilter.filter((birthday) => {
          const birthMonth = parseInt(birthday.date.slice(3, 5), 10);
      
          const isWithinNextThreeMonths = 
            (birthMonth >= currentMonth && birthMonth < currentMonth + 3) ||
            (currentMonth + 3 > 12 && (birthMonth < (currentMonth + 3) % 12));
      
          return isWithinNextThreeMonths;
        });
      
        filteredBirthdaysByMonth.sort((a, b) => {
          const monthA = parseInt(a.date.slice(3, 5), 10);
          const monthB = parseInt(b.date.slice(3, 5), 10);
      
          const adjustedMonthA = (monthA < currentMonth) ? monthA + 12 : monthA;
          const adjustedMonthB = (monthB < currentMonth) ? monthB + 12 : monthB;
      
          return adjustedMonthA - adjustedMonthB;
        });
      
        return filteredBirthdaysByMonth;
      };
      

    const handleChangeMonth = (value: string) => setMonth(+value);


	useEffect(() => {
		dispatch(getAllResidents());
	}, []);
	useEffect(() => {
		setBirthdays(getAllBirthdays(residents));
	}, [residents]);

	useEffect(() => {
		setFilteredBirthdays(filterBirthDaysToNextThreeMonths(month, birthdays));
	}, [birthdays, month]);

	return (
		<Container
			maxW='container.xl'
			marginBottom={'7rem'}
			overflowY={'auto'}
			border={'solid'}
			borderColor={'brand.500'}
			borderRadius={'10px'}
			padding={'1rem'}
            backgroundColor={'brand.50'}
		>
			<Box display={'flex'} gap={'1rem'}>
				<Heading size={'2xl'} mb={'1rem'} cursor={'pointer'}>
					Proximos cumpleaños
				</Heading>
				<Box display={'flex'} >
                    <Text marginRight={'0.25rem'}>Mes:</Text>
                    <Box>
					<NumberInput size='md' maxW={20} defaultValue={month} min={1} max={12} onChange={handleChangeMonth}>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
                    </Box>
				</Box>
			</Box>
			<Box display={'flex'} flexDirection={'column'}>
				{filteredBirthdays.map((birthday) => (
                    <Box>
                        <Text><strong>{birthday.firstname} {birthday.lastname}</strong> {birthday.date}</Text>
                        <Text>Cumple {new Date().getFullYear() - (+birthday.date.slice(6,10))} años.</Text>
                    </Box>
				))}
			</Box>
		</Container>
	);
};

export default Birthdays;
