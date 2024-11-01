import {AccordionItemProps} from 'components/Accordion/AccordionItem/AccordionItem.props.ts';

export interface AccordionProps {
    head: string;
    body: AccordionItemProps[];
}