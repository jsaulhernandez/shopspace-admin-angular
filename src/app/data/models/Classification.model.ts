import { SubcategoryModel } from './Subcategory.model';

export interface ClassificationModel {
    id?: number;
    name: string;
    status: number;
    categories: SubcategoryModel;
}
