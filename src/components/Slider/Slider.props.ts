import {ReactNode} from 'react';

export interface SliderProps {
    slides: ReactNode[];
    paginationOptions?: {
        clickable?: boolean;
    }
    activeSlide?: number;
    setActiveIndexImage: (index: number) => void;
}