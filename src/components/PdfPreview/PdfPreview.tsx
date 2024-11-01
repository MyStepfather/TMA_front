import {Document, Thumbnail, pdfjs} from 'react-pdf';
import styles from './PdfPreview.module.css';
import cn from 'classnames';
import {PdfPreviewProps} from 'components/PdfPreview/PdfPreview.props.ts';

function PdfPreview({file_path, className, loadHandler, children}: PdfPreviewProps) {

	pdfjs.GlobalWorkerOptions.workerSrc = new URL(
		'pdfjs-dist/build/pdf.worker.min.js',
		import.meta.url
	).toString();

	return (
		<div className={cn(styles['documentWrapper'], className)}>
			<Document
				file={file_path}
				loading={''}
				className={styles['document']}
				onLoadSuccess={loadHandler}
			>
				<Thumbnail
					className={styles['thumbnail']}
					height={240}
					pageNumber={1}
				/>
			</Document>
			{children}
		</div>
	);
}

export default PdfPreview;