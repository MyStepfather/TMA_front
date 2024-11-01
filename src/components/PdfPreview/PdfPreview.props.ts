import {ReactNode} from 'react';

export interface PdfPreviewProps {
    file_path: string,
    className?: string,
    children?: ReactNode
    loadHandler?: () => void;
}