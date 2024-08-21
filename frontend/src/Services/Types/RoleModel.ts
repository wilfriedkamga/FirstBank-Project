class RoleModel{
    id: string;
    label: string;
    labelV: string;
    isDeletable:boolean;
    nbMax: string;
    

    constructor(id: string, name: string, phone: string, role: string) {
        this.id = id;
        this.label = name;
        this.labelV=phone;
        this.nbMax=role;
        this.isDeletable=false;
       
    }

    static constructData(data: { id: string;label: string;labelV:string;nbMax: string;}[]): RoleModel[] {
        return data.map(item => new RoleModel(
            item.id,
            item.label,
            item.labelV,
            item.nbMax
            
        ));
    }
}

export { RoleModel };