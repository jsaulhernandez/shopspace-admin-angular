import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
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

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { FormUtils } from 'src/app/core/utils/form.util';
import { CustomHeader } from 'src/app/core/utils/components.util';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
    @Input() data?: ProductModel;
    @Output() onCancel = new EventEmitter();
    @Output() submitted = new EventEmitter<ProductModel>();

    validateForm!: UntypedFormGroup;
    productDetails: ProductDetailModel[] = [];
    viewsProduct: ViewProductModel[] = [];

    isLoading = this.loader$.loading$;
    brands: BrandModel[] = [];
    subscriber!: Subscription;

    customHeader: CustomHeader<ViewProductModel>[] = [
        {
            title: 'Image',
            dataIndex: 'image',
        },
        {
            title: 'Color',
            dataIndex: 'color',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            element: 'switch',
            onClickElement: (data, value) => {},
        },
    ];

    constructor(
        private fb: UntypedFormBuilder,
        private api$: AdminApiService,
        private loader$: LoaderService,
        private notification$: NotificationService
    ) {}

    ngOnInit(): void {
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
            brand: this.fb.group({
                id: [this.data?.brand.id ?? null, [Validators.required]],
            }),
        });

        this.getBrands();
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
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

    submitForm(): void {
        if (this.validateForm.valid) {
            console.log('form data => ', this.validateForm.getRawValue());
            // this.submitted.emit(this.validateForm.getRawValue());
            // this.validateForm.reset();
        } else {
            FormUtils.invalidate(this.validateForm);
        }
    }
}
