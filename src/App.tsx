import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
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

function App() {
	const location: any = useLocation();

	return (
		<>
			{location.pathname != '/' || location.pathname != '/recoverPassword' || location.pathname != '/users/resetPassword/:recovertoken' && <Header />}
			<Routes>
				<Route path='/' element={<Login />} />;
				<Route path='/residents' element={<Residents />} />;
				<Route path='/activities' element={<Activities />} />;
				<Route path='/users' element={<Users />} />;
				<Route path='/sessions/:_id' element={<Sessions />} />;
				<Route path='/residentcard/:_id' element={<ResidentCard />} />;
				<Route path='/activitycard/:_id' element={<ActivityCard />} />;
				<Route path='/usercard/:_id' element={<UserCard />} />;
				<Route path='/residentform' element={<ResidentForm />} />;
				<Route path='/sessionform' element={<SessionForm />} />;
				<Route path='/activityform' element={<ActivityForm />} />;
				<Route path='/userform' element={<UserForm />} />;
				<Route path='/recoverpassword' element={<RecoverPassword />} />;
				<Route path='/users/resetpassword/:recovertoken' element={<ResetPassword />} />;
			</Routes>
			{location.pathname != '/' || location.pathname != '/recoverPassword' || location.pathname != '/users/resetPassword/:recovertoken' && <Footer />}
		</>
	);
}

export default App;
