export class Company{
    public id?: number;
    public name:string | undefined;
    public addres:string | undefined;
    public telephone:string| undefined;
    constructor(data?: any){
       if(data){
            this.id = data.id;
            this.name = data.name;
            this.addres = data.addres;
            this.telephone = data.telephone;
        }
    }
}