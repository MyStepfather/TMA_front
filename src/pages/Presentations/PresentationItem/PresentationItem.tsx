import styles from './PresentationItem.module.css';
import Tab from '../../../components/Tab/Tab.tsx';
import Downloader from '../../../components/Downloader/Downloader.tsx';
import { PresentationItemProps } from './PresentationItem.props.ts';
import PdfPreview from '../../../components/PdfPreview/PdfPreview.tsx';
// import pdfFileFromPublic from '../../../../public/docs/device_pdf-3.pdf';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toast } from 'components/Toast/Toast.tsx';

function PresentationItem({
	presentation,
	allCategories
}: PresentationItemProps) {
	const [message, setMessage] = useState<string | null>(null);
	const [type, setType] = useState<'success' | 'error' | null>(null);
	const navigate = useNavigate();
	const labels = presentation.category_id.map(categoryId => {
		const category = allCategories?.find(c => c.id === categoryId);
		return category?.title || '';
	});

	const copyPathPdf = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		navigator.clipboard
			.writeText(presentation.path)
			.then(() => {
				setMessage('Ссылка скопирована в буфер обмена');
				setType('success');
			})
			.catch(err => {
				setMessage('Ошибка копирования ссылки');
				setType('error');
				console.error(err);
			});
	};

	useEffect(() => {
		const timerId = setTimeout(() => {
			setMessage(null);
			setType(null);
		}, 2000);
		return () => clearTimeout(timerId);
	}, [message, type]);

	const handlePresentationClick = () => {
		navigate(`/presentations/${presentation.id}`);
	};

	return (
		<>
			<div
				className={styles['wrapper']}
				onClick={handlePresentationClick}
			>
				<div className={styles['backplate']}>
					<PdfPreview file_path={presentation.path}></PdfPreview>
				</div>
				<div className={styles['info']}>
					<div className={styles['left']}>
						<div className={styles['title']}>
							{presentation.title}
						</div>
						<div className={styles['labels']}>
							{labels.map((label, i) => (
								<Tab
									key={label}
									clickHandler={() => {}}
									type={
										(i + 1) % 2 === 0
											? 'presentationEven'
											: 'presentationOdd'
									}
								>
									{label}
								</Tab>
							))}
						</div>
					</div>
					<Downloader onClick={copyPathPdf} />
				</div>
			</div>
			<Toast message={message} type={type} />
		</>
	);
}

export default PresentationItem;
