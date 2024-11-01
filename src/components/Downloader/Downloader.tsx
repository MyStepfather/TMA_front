import { MouseEventHandler } from 'react';
import styles from './Downloader.module.css';
import cn from 'classnames';

interface DownloaderProps {
	className?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

function Downloader({className, onClick}: DownloaderProps) {
	return (
		<div className={cn(styles['downloader'], className)} onClick={onClick}>
			<img src="/icons/download.svg" alt="Скачать"/>
		</div>
	);
}

export default Downloader;