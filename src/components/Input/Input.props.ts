import {DetailedHTMLProps, InputHTMLAttributes} from 'react';

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    type: 'text' | 'date';
    isValid: boolean;
}