import {HTMLAttributes, ReactNode} from 'react';

export interface TabProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode;
    clickHandler?: () => void;
    type: 'category' | 'label' | 'ghost' | 'opozdunTab' | 'presentationEven' | 'presentationOdd';
    isActive?: boolean;
}

export type ActiveTab = {
    activeTabId: number,
    activeCategory: number
};