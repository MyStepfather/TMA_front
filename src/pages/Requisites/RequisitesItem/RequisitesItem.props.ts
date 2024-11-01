import {RequisiteLineProps} from './RequisiteLine/RequisiteLine.props.ts';

export interface RequisitesItemProps {
    id: number,
    company_id: number,
    title: string,
    date: string,
    entities: RequisiteLineProps[],
    path: string
}