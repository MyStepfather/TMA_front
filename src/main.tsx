import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout.tsx';
import Home from './pages/Home/Home.tsx';
import Requisites from './pages/Requisites/Requisites.tsx';
import Presentations from './pages/Presentations/Presentations.tsx';
import Calendar from './pages/Calendar/Calendar.tsx';
import Opozdun from './pages/Opozdun/Opozdun.tsx';
import Devices from './pages/Devices/Devices.tsx';
import Device from './pages/Device/Device.tsx';
import MyCard from './pages/MyCard/MyCard.tsx';
import { UserContextProvider } from './context/user.context.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { PresentationPdf } from 'pages/Presentations/PresentationPdf/PresentationPdf.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/requisites',
				element: <Requisites />
			},
			{
				path: '/presentations',
				element: <Presentations />
			},
			{
				path: '/calendar',
				element: <Calendar />
			},
			{
				path: '/opozdun',
				element: <Opozdun />
			},
			{
				path: '/devices',
				element: <Devices />
			},
			{
				path: '/device/:id',
				element: <Device />
			},
			{
				path: '/profile',
				element: <MyCard />
			},
			{
				path: '/presentations/:id',
				element: <PresentationPdf />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UserContextProvider>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</UserContextProvider>
	</React.StrictMode>
);
