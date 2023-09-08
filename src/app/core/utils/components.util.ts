import { TypeElementTable } from 'src/app/data/constants/constants';

export interface CustomHeader<T = unknown> {
    title: string;
    //only plain string
    dataIndex?: string;
    render?: (data: T) => string;
    //only buttons, switches, radios y checkboxes
    element?: TypeElementTable;
    onClickElement?: (data: T, value?: any, index?: number) => void; //evento para los elementos
    onSecondClickElement?: (data: T, value?: any, index?: number) => void; //evento para los elementos
    //only selects. Example for internal object ["id", "name"]
    dataArray?: string[];
    //for icon to button
    icon?: string;
}
