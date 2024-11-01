import {createContext, ReactNode, useEffect, useState} from 'react';
import {IUser} from 'interfaces/IUser.ts';
import axios, {AxiosError} from 'axios';
import {useTelegram} from '../hooks/useTelegram';

interface UserContextType {
    user: IUser | undefined;
    setUser: (userObj: IUser) => void;
	error?: string;
	setError?: (error: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: {children: ReactNode}) => {

	const { userData } = useTelegram();

	// const userData = {username: 'dimitrusmeleskausas'};

	const [username, setUsername] = useState<string | undefined>(undefined);


	useEffect(() => {
		if (userData) {
			setUsername(userData.username);
		}
	}, [userData]);

	const [user, setUser] = useState<IUser | undefined>(undefined);

	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		if (username) {
			authUser(username);
		}
	}, [username]);

	const authUser = async (username: string) => {
		try {
			const {data} = await axios.post('https://gefest-team.ru:8888/api/auth', {username});
			setUser(data);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
		}
	};
	console.log('context render');
	return (
		<UserContext.Provider value={{ user, error, setUser }}>
			{children}
		</UserContext.Provider>
	);
};