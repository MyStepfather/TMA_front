import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface RecordProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    icon: string;
    title: string;
}