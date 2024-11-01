import {InputHTMLAttributes} from 'react';

export interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement>{
    value: string,
    label?: string
}