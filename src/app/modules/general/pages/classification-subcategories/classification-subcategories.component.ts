import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    OnInit,
    inject,
} from '@angular/core';

import { ClassificationModel } from 'src/app/data/models/Classification.model';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { CustomPagination } from 'src/app/data/api/CustomResponse';

import { CustomHeader } from 'src/app/core/utils/components.util';
import {
    ModalActionsType,
    ShowComponent,
    UserActions,
} from 'src/app/data/constants/constants';

@Component({
    selector: 'app-classification-subcategories',
    templateUrl: './classification-subcategories.component.html',
    styleUrls: ['./classification-subcategories.component.scss'],
})
export class ClassificationSubcategoriesComponent
    implements OnInit, AfterContentChecked
{
    _classificationService = inject(AdminApiService);

    isLoading = this.loader$.loading$;
    subCategories: ClassificationModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    //modal
    open: boolean = false;
    typeModal: ModalActionsType = 'confirm';
    textModal: string = '';
    userAction: UserActions = 'save';
    showingComponent: ShowComponent = 'Table';
    pivote?: ClassificationModel;

    customHeader: CustomHeader<ClassificationModel>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            element: 'switch',
            onClickElement: (data, value) => this.onUpdateStatus(data, value),
        },
        {
            title: 'Subcategory',
            render: (data) => data.categories.name ?? 'n/a',
        },
        {
            title: 'Actions',
            element: 'actions',
            onClickElement: (data, _) =>
                this.onAddClassification(data, false, 'update'),
            onSecondClickElement: (data, _) => this.onDelete(data),
        },
    ];

    constructor(
        private loader$: LoaderService,
        private notification$: NotificationService,
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getClassification();
    }

    ngAfterContentChecked(): void {
        this.cdRef.detectChanges();
    }

    async getClassification(search = '', page = '0', size = '10') {
        this.loader$.show();
        this._classificationService
            .request<ClassificationModel[]>({
                method: 'GET',
                path: 'classification-categories/paged',
                params: {
                    search,
                    page,
                    size,
                },
            })
            .subscribe({
                next: (c) => {
                    this.subCategories = c.data || [];
                    this.pagination = c.page;
                },
                error: (e) => {
                    this.loader$.hide();
                    this.subCategories = [];
                },
                complete: () => this.loader$.hide(),
            });
    }

    onChangeValueInput(value: string) {
        this.search = value;
        this.getClassification(value);
    }

    onChangePagination(page: number) {
        this.currentPage = page;
        this.getClassification(this.search, page.toString());
    }

    onUpdateStatus(data: ClassificationModel, value: boolean) {
        this.loader$.show();

        data = {
            ...data,
            status: value ? 1 : 0,
        };

        this._classificationService
            .request({
                method: 'PUT',
                path: `classification-categories/${data.id}`,
                data,
            })
            .subscribe({
                next: (c) => {
                    this.getClassification(
                        this.search,
                        this.currentPage.toString()
                    );
                },
                error: (e) => {
                    this.notification$.onNotification(
                        'error',
                        'Error occurred when updating status'
                    );
                    this.loader$.hide();
                },
                complete: () => {
                    this.notification$.onNotification(
                        'success',
                        'Classification status update'
                    );
                    this.loader$.hide();
                },
            });
    }

    onAddClassification(
        record?: ClassificationModel,
        isSaved = false,
        userAction: UserActions = 'save'
    ) {
        if (!isSaved) {
            this.pivote = record;
            this.showingComponent = 'Form';
            this.userAction = userAction;
        } else {
            if (record) this.pivote = { ...record };

            this.textModal = `¿Do you want to ${
                this.userAction === 'save' ? 'save' : 'update'
            } the classification ${record?.name}?`;
            this.typeModal = 'confirm';
            this.open = true;
        }
    }

    onDelete(data: ClassificationModel) {
        this.pivote = data;
        this.textModal = '¿Are you sure to delete the data?';
        this.typeModal = 'confirm';
        this.userAction = 'delete';
        this.open = true;
    }

    onClose(action: 'modal' | 'form') {
        if (action === 'modal') {
            this.open = false;
        } else {
            this.pivote = undefined;
            this.showingComponent = 'Table';
        }
    }

    onConfirm() {
        this.loader$.show();

        if (this.userAction === 'save' || this.userAction === 'update') {
            const path = `classification-categories${
                this.userAction === 'update' ? '/' + this.pivote?.id : ''
            }`;

            this._classificationService
                .request({
                    method: this.userAction === 'save' ? 'POST' : 'PUT',
                    path: path,
                    data: this.pivote,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = `Data has been ${
                            this.userAction === 'save' ? 'saved' : 'updated'
                        } successfully`;
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getClassification();
                        this.showingComponent = 'Table';
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when ${
                            this.userAction === 'save' ? 'saving' : 'updating'
                        } the classification ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }

        if (this.userAction === 'delete') {
            this._classificationService
                .request({
                    method: 'DELETE',
                    path: `classification-categories/${this.pivote?.id}`,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = 'Data has been removed successfully';
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getClassification();
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when removing the classification ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }
    }
}
