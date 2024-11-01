export interface DeviceItemProps {
    id: number;
    title: string;
    thumb: string;
    gallery?: string[] | string;
    info?: InfoItem[];
    documents?: Document[];
}

type InfoItem = {
    title: string,
    description: string
}

type Category = {
    id: number,
    title: string,
}

type Document = {
    id: number,
    category_id: number,
    title: string,
    path: string,
    tag: string,
    category: Category,
}