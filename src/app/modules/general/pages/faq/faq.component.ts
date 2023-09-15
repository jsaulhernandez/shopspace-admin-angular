import { Component, OnInit, inject } from '@angular/core';

import { FaqModel } from 'src/app/data/models/Faq.model';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { CustomPagination } from 'src/app/data/api/CustomResponse';

import { CustomHeader } from 'src/app/core/utils/components.util';

import {
    ModalActionsType,
    ShowComponent,
    UserActions,
} from 'src/app/data/constants/constants';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
    api$ = inject(AdminApiService);

    isLoading = this.loader$.loading$;
    faqs: FaqModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    //modal
    open: boolean = false;
    typeModal: ModalActionsType = 'confirm';
    textModal: string = '';
    userAction: UserActions = 'save';
    showingComponent: ShowComponent = 'Table';
    pivote?: FaqModel;

    customHeader: CustomHeader<FaqModel>[] = [
        {
            title: 'Question',
            dataIndex: 'question',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            element: 'switch',
            onClickElement: (data, value) => this.onUpdateStatus(data, value),
        },
        {
            title: 'Actions',
            element: 'actions',
            onClickElement: (data, _) => this.onAddFaq(data, false, 'update'),
            onSecondClickElement: (data, _) => this.onDelete(data),
        },
    ];

    constructor(
        private loader$: LoaderService,
        private notification$: NotificationService
    ) {}

    ngOnInit(): void {
        this.getFaqs();
    }

    async getFaqs(search = '', page = '0', size = '10') {
        this.loader$.show();
        this.api$
            .request<FaqModel[]>({
                method: 'GET',
                path: 'faq/paged',
                params: {
                    search,
                    page,
                    size,
                },
            })
            .subscribe({
                next: (c) => {
                    this.faqs = c.data || [];
                    this.pagination = c.page;
                },
                error: (e) => {
                    this.loader$.hide();
                    this.faqs = [];
                },
                complete: () => this.loader$.hide(),
            });
    }

    onChangeValueInput(value: string) {
        this.search = value;
        this.getFaqs(value);
    }

    onChangePagination(page: number) {
        this.currentPage = page;
        this.getFaqs(this.search, page.toString());
    }

    onUpdateStatus(data: FaqModel, value: boolean) {
        this.loader$.show();

        data = {
            ...data,
            status: value ? 1 : 0,
        };

        this.api$
            .request({
                method: 'PUT',
                path: `faq/${data.id}`,
                data,
            })
            .subscribe({
                next: (c) => {
                    this.getFaqs(this.search, this.currentPage.toString());
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
                        'Faq status update'
                    );
                    this.loader$.hide();
                },
            });
    }

    onAddFaq(
        record?: FaqModel,
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
            } the faq?`;
            this.typeModal = 'confirm';
            this.open = true;
        }
    }

    onDelete(data: FaqModel) {
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
            const path = `faq${
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

                        this.getFaqs();
                        this.showingComponent = 'Table';
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when ${
                            this.userAction === 'save' ? 'saving' : 'updating'
                        } the faq`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }

        if (this.userAction === 'delete') {
            this.api$
                .request({
                    method: 'DELETE',
                    path: `faq/${this.pivote?.id}`,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = 'Data has been removed successfully';
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getFaqs();
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = 'Error occurred when removing the faq';
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }
    }
}
