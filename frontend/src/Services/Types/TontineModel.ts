class TontineModel{
    id: string;
    name: string;
    phone: string;
    role: string;
    

    constructor(id: string, name: string, phone: string, role: string) {
        this.id = id;
        this.name = name;
        this.phone=phone;
        this.role=role;
       
    }

    static constructData(data: { id: string;name: string;phone:string;role: string;}[]): TontineModel[] {
        return data.map(item => new TontineModel(
            item.id,
            item.name,
            item.phone,
            item.role
            
        ));
    }
}

export { TontineModel };