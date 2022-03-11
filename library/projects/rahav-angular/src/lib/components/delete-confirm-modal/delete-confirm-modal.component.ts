import {Component, Inject, Injectable} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-confirm-modal',
    templateUrl: './delete-confirm-modal.component.html',
    styleUrls: ['./delete-confirm-modal.component.scss']
})
export class DeleteConfirmModalComponent {
    constructor(
        @Inject(NgbActiveModal) public modal: NgbActiveModal,
        public config: DeleteConfirmModalConfig
    ) { }
}

@Injectable({providedIn: 'root'})
export class DeleteConfirmModalConfig {
    title = 'Confirm Deletion';
    message = 'Want to permanently remove this item?';
    btnNoTitle = 'No';
    btnYesTitle = 'Yes, I want to delete!';
}