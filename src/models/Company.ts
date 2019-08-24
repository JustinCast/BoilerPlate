export class Company {
    id: number | undefined;
    name: string | undefined;
    address: string | undefined;
    tel: string | undefined;

    constructor(public data?: any){
        if(data){
            this.id = data.id;
            this.name = data.name;
            this.address = data.address;
            this.tel = data.tel;
        }

        /*
            public name?: string
        */
        
    }
    
}