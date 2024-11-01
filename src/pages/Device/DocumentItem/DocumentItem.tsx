import styles from './DocumentItem.module.css';
import PdfPreview from 'components/PdfPreview/PdfPreview.tsx';
import { DocumentItemProps } from 'pages/Device/DocumentItem/DocumentItem.props.ts';
import Tab from 'components/Tab/Tab.tsx';
import { useState } from 'react';
import { downloadFn } from '../../../functions/downloadFile.ts';

function DocumentItem({ file_path, title, tag }: DocumentItemProps) {
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const download = (): void => {
		if (!isLoading) downloadFn(file_path);
	};

	return (
		<>
			{file_path.slice(-3) === 'pdf' && (
				<PdfPreview
					loadHandler={() => setIsLoading(false)}
					file_path={file_path}
					className={styles['']}
				>
					{!isLoading && (
						<div className={styles['cover']}>
							<div className={styles['left']}>
								<div className={styles['title']}>{title}</div>
								<Tab className={styles['type']} type={'ghost'}>
									{tag}
								</Tab>
							</div>
							<img
								onClick={download}
								className={styles['downloadIcon']}
								src="/icons/download_orange.svg"
								alt="скачать"
							/>
						</div>
					)}
				</PdfPreview>
			)}
		</>
	);
}

export default DocumentItem;
