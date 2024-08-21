
 class AssociationModel{
    id?:string;
    name:string;
    frequenceReunion:string;
    jourReunion:string;
    creationDate:[number,number,number];
    nbMembre:number;
    nbTontine:number;
    nbReunion?:number;
    nbEvenement?:number;
    nbNotification?:number;
    estOperationel?:boolean

    constructor(id: string, name: string, frequenceReunion: string, jourReunion: string, creationDate: [number,number,number], nbMembre: number,nbTontine:number,nbReunion: number,nbEvenement:number, estOperationel:boolean) {
        this.id = id;
        this.name = name;
        this.frequenceReunion = frequenceReunion;
        this.jourReunion = jourReunion;
        this.creationDate = creationDate;
        this.nbMembre = nbMembre;
        this.nbTontine = nbTontine;
        this.nbReunion=nbReunion;
        this.nbEvenement=nbEvenement;
        this.estOperationel=estOperationel;
    }
    
}

export { AssociationModel };