import { CategoryModel } from './Category.model';

export interface SubcategoryModel {
    id?: number;
    name: string;
    status: number;
    category: CategoryModel;
}
