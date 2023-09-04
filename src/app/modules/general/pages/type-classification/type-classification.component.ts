import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    OnInit,
    inject,
} from '@angular/core';

import { TypeClassificationModel } from 'src/app/data/models/TypeClassification.model';

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
    selector: 'app-type-classification',
    templateUrl: './type-classification.component.html',
    styleUrls: ['./type-classification.component.scss'],
})
export class TypeClassificationComponent
    implements OnInit, AfterContentChecked
{
    api$ = inject(AdminApiService);

    isLoading = this.loader$.loading$;
    typesClassifications: TypeClassificationModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    //modal
    open: boolean = false;
    typeModal: ModalActionsType = 'confirm';
    textModal: string = '';
    userAction: UserActions = 'save';
    showingComponent: ShowComponent = 'Table';
    pivote?: TypeClassificationModel;

    customHeader: CustomHeader<TypeClassificationModel>[] = [
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
            title: 'Classification',
            render: (data) => data.classificationCategories.name ?? 'n/a',
        },
        {
            title: 'Actions',
            element: 'actions',
            onClickElement: (data, _) =>
                this.onAddTypeClassification(data, false, 'update'),
            onSecondClickElement: (data, _) => this.onDelete(data),
        },
    ];

    constructor(
        private loader$: LoaderService,
        private notification$: NotificationService,
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getTypesClassifications();
    }

    ngAfterContentChecked(): void {
        this.cdRef.detectChanges();
    }

    async getTypesClassifications(search = '', page = '0', size = '10') {
        this.loader$.show();
        this.api$
            .request<TypeClassificationModel[]>({
                method: 'GET',
                path: 'type-classification/paged',
                params: {
                    search,
                    page,
                    size,
                },
            })
            .subscribe({
                next: (c) => {
                    this.typesClassifications = c.data || [];
                    this.pagination = c.page;
                },
                error: (e) => {
                    this.loader$.hide();
                    this.typesClassifications = [];
                },
                complete: () => this.loader$.hide(),
            });
    }

    onChangeValueInput(value: string) {
        this.search = value;
        this.getTypesClassifications(value);
    }

    onChangePagination(page: number) {
        this.currentPage = page;
        this.getTypesClassifications(this.search, page.toString());
    }

    onUpdateStatus(data: TypeClassificationModel, value: boolean) {
        this.loader$.show();

        data = {
            ...data,
            status: value ? 1 : 0,
        };

        this.api$
            .request({
                method: 'PUT',
                path: `type-classification/${data.id}`,
                data,
            })
            .subscribe({
                next: (c) => {
                    this.getTypesClassifications(
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
                        'Type classification status update'
                    );
                    this.loader$.hide();
                },
            });
    }

    onAddTypeClassification(
        record?: TypeClassificationModel,
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
            } the type classification ${record?.name}?`;
            this.typeModal = 'confirm';
            this.open = true;
        }
    }

    onDelete(data: TypeClassificationModel) {
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
            const path = `type-classification${
                this.userAction === 'update' ? '/' + this.pivote?.id : ''
            }`;

            this.api$
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

                        this.getTypesClassifications();
                        this.showingComponent = 'Table';
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when ${
                            this.userAction === 'save' ? 'saving' : 'updating'
                        } the type classification ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }

        if (this.userAction === 'delete') {
            this.api$
                .request({
                    method: 'DELETE',
                    path: `type-classification/${this.pivote?.id}`,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = 'Data has been removed successfully';
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getTypesClassifications();
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when removing the type classification ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }
    }
}
