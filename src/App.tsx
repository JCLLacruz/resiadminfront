import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './views/Login/Login';
import Footer from './components/Footer/Footer';
import Residents from './views/Residents/Residents';
import Activities from './views/Activities/Activities';
import ResidentCard from './components/ResidentCard/ResidentCard';
import ActivityCard from './components/ActivityCard/ActivityCard';
import ResidentForm from './components/RedidentForm/ResidentForm';
import Header from './components/Header/Header';
import Sessions from './views/Sessions/Sessions';
import SessionForm from './components/SessionForm/SessionForm';
import ActivityForm from './components/ActivityForm/ActivityForm';
import UserCard from './components/UserCard/UserCard';
import UserForm from './components/UserForm/UserForm';
import Users from './views/Users/Users';
import ResetPassword from './views/ResetPassword/ResetPassword';
import RecoverPassword from './views/RecoverPassword/RecoverPassword';
import AttendanceForm from './components/AttendanceForm/AttendanceForm';
import AdminPanel from './views/AdminPanel/AdminPanel';
import useWindowSize from './hooks/useWindowSize';
import Information from './views/Information/Information';
import MonthResumeForm from './components/MonthResumeForm/MonthResumeForm';
import { useEffect } from 'react';
import SaveLastLocation from './hooks/saveLastLocation';
import { UserInterface } from './interfaces/authInterfaces';

function App() {
	const navigate =useNavigate();
	const location: any = useLocation();
	const isMobile = useWindowSize();

	const currentUser: UserInterface = JSON.parse(localStorage.getItem('user') || '{}') || null;
	const isLoginRoute = location.pathname === '/';
	const isRecoverPasswordRoute = location.pathname === '/recoverpassword';
	const isResetPasswordRoute = location.pathname.startsWith('/users/resetPassword/');

	useEffect(() => {
		const lastVisitedUrl = localStorage.getItem('lastVisitedUrl');
		if (lastVisitedUrl && currentUser) {
		  navigate(lastVisitedUrl);
		}
	  }, [navigate]);

	return (
		<>
			{!isLoginRoute && !isRecoverPasswordRoute && !isResetPasswordRoute && <Header />}
			<SaveLastLocation />
			<Routes>
				<Route path='/' element={<Login />} />;
				<Route path='/residents' element={<Residents />} />;
				<Route path='/activities' element={<Activities />} />;
				<Route path='/users' element={<Users />} />;
				<Route path='/information' element={<Information />} />;
				<Route path='/adminpanel' element={<AdminPanel />} />;
				<Route path='/sessions/:_id' element={<Sessions />} />;
				<Route path='/residentcard/:_id' element={<ResidentCard />} />;
				<Route path='/activitycard/:_id' element={<ActivityCard />} />;
				<Route path='/usercard/:_id' element={<UserCard />} />;
				<Route path='/residentform' element={<ResidentForm />} />;
				<Route path='/sessionform' element={<SessionForm />} />;
				<Route path='/activityform' element={<ActivityForm />} />;
				<Route path='/userform' element={<UserForm />} />;
				<Route path='/attendanceform' element={<AttendanceForm />} />;
				<Route path='/monthresume' element={<MonthResumeForm />} />;
				<Route path='/recoverpassword' element={<RecoverPassword />} />;
				<Route path='/users/resetpassword/:recovertoken' element={<ResetPassword />} />;
			</Routes>
			{!isLoginRoute && !isRecoverPasswordRoute && !isResetPasswordRoute && isMobile && <Footer />}
		</>
	);
}

export default App;
