import {IUser} from 'interfaces/IUser.ts';

export interface CardProps extends IUser {
    id?: number;
    avatar?: string;
    position: string;
    phone: string;
    email: string;
    whatsapp_phone: string;
    company: string;
    company_link: string;
    qrcode?: string;
    index?: number;
    isRotated?: boolean;
    isUpdating?: boolean;
}