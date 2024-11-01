// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { useEffect, useState } from 'react';

// @ts-expect-error
const tg = window.Telegram.WebApp;

export function useTelegram() {
	const [photoUrl, setPhotoUrl] = useState<string | null>(null);

	const onClose = () => {
		tg.close();
	};

	const query_id = tg.initDataUnsafe?.query_id;
	const tgUser = tg.initDataUnsafe?.user;
	const username = tg.initDataUnsafe?.user?.username;
	const userId = tg.initDataUnsafe?.user?.id;
	const firstName = tg.initDataUnsafe?.user?.first_name;
	const lastName = tg.initDataUnsafe?.user?.last_name;
	const sendData = tg.sendData;

	useEffect(() => {
		if (tgUser) {
			const photoUrl: string = `https://t.me/i/userpic/320/${tgUser.username}.jpg`;
			const img = new Image();
      img.src = photoUrl;
      img.onload = () => {
        if (img.width <= 1) {
          setPhotoUrl(null);
        } else {
          setPhotoUrl(photoUrl);
        }
      };
      img.onerror = () => {
        setPhotoUrl(null);
      };
		}
	}, [tgUser]);

	return {
		tg,
		userData: tg.initDataUnsafe?.user,
		onClose,
		tgUser,
		photoUrl,
		username,
		userId,
		firstName,
		lastName,
		sendData,
		query_id
	};
}
