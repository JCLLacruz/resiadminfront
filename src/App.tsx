import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Footer from './components/Footer/Footer';
import Residents from './views/Residents/Residents';
import Activities from './views/Activities/Activities';
import ResidentCard from './components/ResidentCard/ResidentCard';
import ActivityCard from './components/ActivityCard/ActivityCard';
import ResidentForm from './components/RedidentForm/ResidentForm';
import Header from './components/Header/Header';
import Sessions from './views/Sessions/Sessions';

function App() {
	const location: any = useLocation();

	return (
		<>
			{location.pathname != '/' && <Header />}
			<Routes>
				<Route path='/' element={<Login />} />;
				<Route path='/register' element={<Register />} />;
				<Route path='/residents' element={<Residents />} />;
				<Route path='/activities' element={<Activities />} />;
				<Route path='/sessions' element={<Sessions />} />;
				<Route path='/residentcard/:_id' element={<ResidentCard />} />;
				<Route path='/activitycard/:_id' element={<ActivityCard />} />;
				<Route path='/residentform/:_id' element={<ResidentForm />} />;
			</Routes>
			{location.pathname != '/' && <Footer />}
		</>
	);
}

export default App;
