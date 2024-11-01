export const downloadFn = (file_path: string): void => {
	fetch(file_path)
		.then(res => res.blob())
		.then(blob => {
			const fileURL = window.URL.createObjectURL(blob);
			const alink = document.createElement('a');
			alink.href = fileURL;
			alink.download = 'SamplePDF.pdf';
			alink.click();
		});
};