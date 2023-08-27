import { BrandModel } from './Brand.model';
import { ProductDetailModel } from './ProductDetail.model';
import { TypeClassificationModel } from './TypeClassification.model';
import { ViewProductModel } from './ViewProduct.mode';

export interface ProductModel {
    id?: number;
    title: string;
    name: string;
    description: string;
    price: number;
    model: string;
    modelNumber: string;
    releaseDate: Date;
    viewProducts: ViewProductModel[];
    productDetails: ProductDetailModel[];
    typeClassification: TypeClassificationModel;
    brand: BrandModel;
}
