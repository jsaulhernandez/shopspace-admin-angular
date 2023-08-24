import { TypeElementTable } from 'src/app/data/constants/constants';

export interface CustomHeader {
    title: string;
    //only plain string
    dataIndex?: string;
    render?: (data: any) => string;
    //only buttons, switches, radios y checkboxes
    element?: TypeElementTable;
    onClickElement?: (data: any, value?: any, index?: number) => void; //evento para los elementos
    onSecondClickElement?: (data: any, value?: any, index?: number) => void; //evento para los elementos
    //only selects. Example for internal object ["id", "name"]
    dataArray?: string[];
}