export class Vehicle {
    id: number | undefined;
    model: number | undefined;
    description: string | undefined;
    id_company: number | undefined;
    added_by: number | undefined;

    constructor(public data?: any){
        if(data){
            this.id = data.id;
            this.model = data.model;
            this.description = data.description;
            this.id_company = data.id_company;
            this.added_by = data.added_by;
        }
        /*
            public name?: string
       */
        
    }
    
}