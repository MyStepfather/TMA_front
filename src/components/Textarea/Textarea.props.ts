import {TextareaHTMLAttributes} from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    value: string;
    label?: string;
}