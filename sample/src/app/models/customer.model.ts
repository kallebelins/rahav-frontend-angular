import { EntityBaseModel } from "rahav-angular";
import { ContactModel } from "./contact.model";

export class CustomerModel extends EntityBaseModel {
    
    constructor(
        id: number,
        public created: Date,
        public name: string,
        public active: boolean,
        
        public contacts?: ContactModel[]
    ) {
        super(id);
     }
}