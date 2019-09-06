export class Company{
    
    public id?:number;
    public name:string;
    public address: string;
    public phone: number;

    constructor(data?:any){
        if(data.id != null){
            this.id = data.id;
        }
        this.name = data.name;
        this.address = data.address;
        this.phone = data.phone;
    }
}