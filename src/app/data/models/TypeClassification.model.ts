import { ClassificationModel } from './Classification.model';

export interface TypeClassificationModel {
    id?: number;
    name: string;
    status: number;
    classificationCategories: ClassificationModel;
}
