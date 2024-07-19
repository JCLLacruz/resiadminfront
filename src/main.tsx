import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '../custom.scss';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { BrowserRouter } from 'react-router-dom';

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
	  navigator.serviceWorker.register('/service-worker.js')
		.then(registration => {
		  console.log('Service Worker registrado con éxito:', registration);
		})
		.catch(error => {
		  console.log('Error al registrar el Service Worker:', error);
		});
	});
  }

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<BrowserRouter basename='/'>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</Provider>
);
