export class Company {

    public id?: number;
    public name: string;
    public address: string;
    public tel: string

 
    constructor(data?: any) {
        //if (data != null) {
            this.id = data.id;
            this.name = data.name;
            this.address = data.address;
            this.tel = data.tel;
        //}
    }
}   