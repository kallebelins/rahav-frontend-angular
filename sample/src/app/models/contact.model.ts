import { EntityBaseModel } from "rahav-angular";
import { CustomerModel } from "./customer.model";

export class ContactModel extends EntityBaseModel {

    constructor(
        id: number,
        public customerId: number,
        public created: Date,
        public type: number,
        public description: string,
        public active: boolean,
        
        public customer?: CustomerModel
    ) {
        super(id);
    }
}