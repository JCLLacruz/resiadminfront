import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Footer from './components/Footer/Footer';

function App() {
	const token = localStorage.getItem('token') || null;
	const location: any = useLocation();
	console.log(location.pathname);

	return (
		<>
			<Routes>
				<Route path='/' element={<Login />} />;
				<Route path='/register' element={<Register />} />;
			</Routes>
			{token && (location.pathname != '/') && <Footer />}
		</>
	);
}

export default App;
