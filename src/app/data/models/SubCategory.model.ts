import { CategoryModel } from './Category.model';

export interface SubCategoryModel {
    id?: number;
    name: string;
    status: number;
    category: CategoryModel;
}
