export default class Company {
    id: number;
    name: string;
    address: string;
    telephone: string;

    constructor(Data: any){
        this.id = Data.id;
        this.name = Data.name;
        this.address = Data.address;
        this.telephone = Data.telephone;
    }
}
