import { useParams } from 'react-router-dom';
import { TPresentation } from 'types/types';
import api from '../../../api/axios';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Page, Document, pdfjs } from 'react-pdf';
// import pdfFileFromPublic from '../../../../public/docs/device_pdf-3.pdf';
import styles from './PresentationPdf.module.css';

export const PresentationPdf = () => {
	pdfjs.GlobalWorkerOptions.workerSrc = new URL(
		'pdfjs-dist/build/pdf.worker.min.js',
		import.meta.url
	).toString();

	const { id: presentationId } = useParams();
	const [presentation, setPresentation] = useState<TPresentation | null>(
		null
	);
	const [error, setError] = useState<string | null>(null);
	const [numPages, setNumPages] = useState<number | null>(null);

	const getPresentations = async (): Promise<TPresentation | undefined> => {
		try {
			const { data } = await api.get(`/presentation/${presentationId}`);
			setPresentation(data);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
				throw new Error(e.response?.data.message);
			}
			return;
		}
	};

	useEffect(() => {
		getPresentations();
	}, [presentationId]);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
	}

	if (!presentation) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>{presentation.title}</h2>
			<Document
				file={presentation.path}
				onLoadSuccess={onDocumentLoadSuccess}
				className={styles.document}
			>
				{Array.from(new Array(numPages), (_, index) => (
					<Page
						key={`page_${index + 1}`}
						pageNumber={index + 1}
						renderTextLayer={false}
						renderAnnotationLayer={false}
						className={styles.page}
					/>
				))}
			</Document>
		</div>
	);
};
