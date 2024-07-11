import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Footer from './components/Footer/Footer';
import Residents from './views/Residents/Residents';
import Activities from './views/Activities/Activities';
import ActivityView from './views/ActivityView/ActivityView';
import ResidentCard from './components/ResidentCard/ResidentCard';

function App() {
	const token = localStorage.getItem('token') || null;
	const location: any = useLocation();

	return (
		<>
			<Routes>
				<Route path='/' element={<Login />} />;
				<Route path='/register' element={<Register />} />;
				<Route path='/residents' element={<Residents />} />;
				<Route path='/activities' element={<Activities />} />;
				<Route path='/activityview/:_id' element={<ActivityView />} />;
				<Route path='/residentcard/:_id' element={<ResidentCard />} />;
			</Routes>
			{token && (location.pathname != '/') && <Footer />}
		</>
	);
}

export default App;
