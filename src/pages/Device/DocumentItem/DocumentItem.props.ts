export interface DocumentItemProps {
    file_path: string;
    title: string;
    tag: string;
    readyHandler?: () => void;
}