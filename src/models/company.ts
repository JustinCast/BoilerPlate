export default class Company {
    id?: number;
    name: string;
    address: string;
    tel: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.address = data.address;
        this.tel = data.tel;
    }
}