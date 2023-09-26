import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProductModel } from 'src/app/data/models/Product.model';
import { BrandModel } from 'src/app/data/models/Brand.model';
import { ProductDetailModel } from 'src/app/data/models/ProductDetail.model';
import { ViewProductModel } from 'src/app/data/models/ViewProduct.model';
import { TypeClassificationModel } from 'src/app/data/models/TypeClassification.model';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { FormUtils } from 'src/app/core/utils/form.util';
import { CustomHeader } from 'src/app/core/utils/components.util';
import { NumberUtils } from 'src/app/core/utils/number.utils';
import { OnlyNumbersRegEx } from 'src/app/core/utils/RegEx.utils';
import { FileUtils } from 'src/app/core/utils/file.utils';

import { UserActions } from 'src/app/data/constants/constants';

type optionsTemplate = 'detail' | 'view';
type optionsModal = 'open' | 'close';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
    @Input() data?: ProductModel;
    @Output() onCancel = new EventEmitter();
    @Output() submitted = new EventEmitter<ProductModel>();

    //templates to modal
    @ViewChild('templateDetail') detailTemplate!: TemplateRef<any>;
    @ViewChild('templateView') viewTemplate!: TemplateRef<any>;

    validateForm!: UntypedFormGroup;
    detailForm!: UntypedFormGroup;
    viewForm!: UntypedFormGroup;
    productDetails: ProductDetailModel[] = [];
    viewsProduct: ViewProductModel[] = [];
    auxDetail!: ProductDetailModel | undefined;
    auxView!: ViewProductModel | undefined;
    position!: number | undefined;

    isLoading = this.loader$.loading$;
    action: UserActions = 'save';
    brands: BrandModel[] = [];
    typesClassifications: TypeClassificationModel[] = [];
    subscriber!: Subscription;
    subscriberTwo!: Subscription;

    //regex
    onlyNumbers: RegExp = OnlyNumbersRegEx;

    //custom header for table
    customHeader: CustomHeader<ViewProductModel>[] = [
        {
            title: 'Image',
            dataIndex: 'image',
            element: 'image',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            element: 'circle-color',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
        },
        {
            title: 'Actions',
            element: 'actions',
            onClickElement: (data, _, index) =>
                this.onUpdateView(data, index ?? 0),
            onSecondClickElement: (data, _) => this.onRemoveView(data),
        },
    ];

    constructor(
        private fb: UntypedFormBuilder,
        private api$: AdminApiService,
        private loader$: LoaderService,
        private notification$: NotificationService,
        private modal$: ModalService
    ) {}

    ngOnInit(): void {
        //set array data;
        this.productDetails = this.data?.productDetails ?? [];
        this.viewsProduct = this.data?.viewProducts ?? [];

        //forms
        this.validateForm = this.fb.group({
            id: [this.data?.id ?? null],
            title: [this.data?.title ?? null, [Validators.required]],
            name: [this.data?.name ?? null, [Validators.required]],
            description: [
                this.data?.description ?? null,
                [Validators.required],
            ],
            price: [this.data?.price ?? null, [Validators.required]],
            model: [this.data?.model ?? null, [Validators.required]],
            modelNumber: [
                this.data?.modelNumber ?? null,
                [Validators.required],
            ],
            releaseDate: [
                this.data?.releaseDate ?? null,
                [Validators.required],
            ],
            status: [this.data?.status ?? 1, [Validators.required]],
            brand: this.fb.group({
                id: [this.data?.brand.id ?? null, [Validators.required]],
            }),
            typeClassification: this.fb.group({
                id: [
                    this.data?.typeClassification.id ?? null,
                    [Validators.required],
                ],
            }),
        });

        this.detailForm = this.fb.group({
            id: [null],
            identifier: [null, [Validators.required]],
            value: [null, [Validators.required]],
            productId: [null],
        });

        this.viewForm = this.fb.group({
            id: [null],
            image: [null, [Validators.required]],
            color: [null, [Validators.required]],
            stock: [null, [Validators.required]],
            productId: [null],
        });

        //call data
        this.getBrands();
        this.getTypesClassifications();
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
        this.subscriberTwo.unsubscribe();
    }

    getBrands() {
        this.loader$.show();
        this.subscriber = this.api$
            .request<BrandModel[]>({
                method: 'GET',
                path: 'brand/active',
            })
            .subscribe({
                next: (c) => {
                    this.brands = c.data || [];
                },
                error: (e) => {
                    this.loader$.hide();
                    this.brands = [];
                    this.notification$.onNotification(
                        'error',
                        'Error occurred when getting brands data'
                    );
                },
                complete: () => this.loader$.hide(),
            });
    }

    getTypesClassifications() {
        this.loader$.show();
        this.subscriberTwo = this.api$
            .request<TypeClassificationModel[]>({
                method: 'GET',
                path: 'type-classification/active',
            })
            .subscribe({
                next: (c) => {
                    this.typesClassifications = c.data || [];
                },
                error: (e) => {
                    this.loader$.hide();
                    this.typesClassifications = [];
                    this.notification$.onNotification(
                        'error',
                        'Error occurred when getting types classifications data'
                    );
                },
                complete: () => this.loader$.hide(),
            });
    }

    onCustomModal(
        option: optionsTemplate = 'detail',
        action: optionsModal = 'open',
        method: UserActions = 'save'
    ) {
        if (action === 'open') {
            this.action = method;

            if (option === 'detail') {
                if (method === 'update')
                    this.detailForm.patchValue(this.auxDetail ?? {});
                else {
                    this.resetDefaultValues();
                }

                this.modal$.open(this.detailTemplate, {
                    title: (method === 'save' ? 'Add' : 'Edit') + ' detail',
                });
            } else {
                if (method === 'update')
                    this.viewForm.patchValue(this.auxView ?? {});
                else {
                    this.resetDefaultValues('view');
                    this.viewForm.patchValue({ status: 1 });
                }

                this.modal$.open(
                    this.viewTemplate,
                    {
                        title: (method === 'save' ? 'Add' : 'Edit') + ' view',
                    },
                    { nzWidth: 720 }
                );
            }
        } else {
            this.resetDefaultValues(option);
            this.modal$.close();
        }
    }

    //Method for product detail
    submitDetailForm(): void {
        if (!this.detailForm.valid) {
            FormUtils.invalidate(this.detailForm);
            return;
        }

        const dataForm = this.detailForm.getRawValue();
        let exists: boolean = false;

        if (this.auxDetail && this.action === 'update') {
            if (this.auxDetail.identifier !== dataForm.identifier)
                exists = this.existsData('detail', dataForm);
        } else exists = this.existsData('detail', dataForm);

        if (exists) {
            this.notification$.onNotification(
                'error',
                'Register already exist'
            );
            return;
        }

        if (this.action === 'save') this.productDetails.push(dataForm);
        else this.updateData('detail', dataForm);

        this.onCustomModal('detail', 'close');
    }

    onUpdateDetail(data: ProductDetailModel, index: number) {
        this.auxDetail = data;
        this.position = index;
        this.onCustomModal('detail', 'open', (this.action = 'update'));
    }

    onRemoveDetail(index: number) {
        this.productDetails.splice(index, 1);
    }

    //methods for view product
    submitViewForm(): void {
        if (!this.viewForm.valid) {
            FormUtils.invalidate(this.viewForm);
            return;
        }

        const dataForm: ViewProductModel = this.viewForm.getRawValue();
        let exists: boolean = false;

        if (this.auxView && this.action === 'update') {
            if (this.auxView.color !== dataForm.color)
                exists = this.existsData('view', dataForm);
        } else exists = this.existsData('view', dataForm);

        if (exists) {
            this.notification$.onNotification(
                'error',
                'Register already exist'
            );
            return;
        }

        if (this.action === 'save') {
            this.viewsProduct.push(dataForm);
            this.viewsProduct = [...this.viewsProduct];
        } else this.updateData('view', dataForm);

        this.onCustomModal('view', 'close');
    }

    onUpdateView(data: ViewProductModel, index: number) {
        this.auxView = data;
        this.position = index;
        this.onCustomModal('view', 'open', (this.action = 'update'));
    }

    onRemoveView(data: ViewProductModel) {
        this.viewsProduct = this.viewsProduct.filter(
            (v) => v.color !== data.color
        );
    }

    //another methods
    existsData(
        option: optionsTemplate = 'detail',
        data: ProductDetailModel | ViewProductModel
    ): boolean {
        if (option === 'detail') {
            const detail = data as ProductDetailModel;
            const result = this.productDetails.find(
                (d) => d.identifier === detail.identifier
            );

            return !!result;
        } else {
            const view = data as ViewProductModel;
            const result = this.viewsProduct.find(
                (d) => d.color === view.color
            );

            return !!result;
        }
    }

    updateData(
        option: optionsTemplate = 'detail',
        data: ProductDetailModel | ViewProductModel
    ) {
        if (option === 'detail') {
            this.productDetails = this.productDetails.map((p, index) => {
                if (this.position === index) return data as ProductDetailModel;
                return p;
            });
        } else {
            this.viewsProduct = this.viewsProduct.map((v, index) => {
                if (this.position === index) return data as ViewProductModel;
                return v;
            });
        }
    }

    resetDefaultValues(option: optionsTemplate = 'detail') {
        this.action === 'save';
        this.position = undefined;

        if (option === 'detail') {
            this.auxDetail = undefined;
            this.detailForm.reset();
        } else {
            this.auxView = undefined;
            this.viewForm.reset();
        }
    }

    //send data for saving or updating
    submitForm(): void {
        if (this.validateForm.valid) {
            if (this.productDetails.length === 0) {
                this.notification$.onNotification(
                    'error',
                    'Please, add product details'
                );
                return;
            }

            if (this.viewsProduct.length === 0) {
                this.notification$.onNotification(
                    'error',
                    'Please, add views product'
                );
                return;
            }

            //validation to images
            this.viewsProduct = this.viewsProduct.map((p) => {
                if (!FileUtils.isBase64(p.image)) p.image = 'default';
                return p;
            });

            const main: ProductModel = {
                ...this.validateForm.getRawValue(),
                price: NumberUtils.getOnlyNumbers(
                    `${this.validateForm.get('price')?.value}`
                ),
                viewProducts: this.viewsProduct,
                productDetails: this.productDetails,
            };

            this.submitted.emit(main);
            this.validateForm.reset();
        } else {
            FormUtils.invalidate(this.validateForm);
        }
    }
}
