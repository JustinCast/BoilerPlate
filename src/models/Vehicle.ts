export class Vehicle {

    id: number;
    model: number;
    description: string;
    id_company: number;
    added_by: number;

 
    constructor(data?: any) {
        //if (data != null) {
            this.id = data.id;
            this.model = data.model;
            this.description = data.description;
            this.id_company = data.id_Company;
            this.added_by = data.added_by;
        //}
    }
}   