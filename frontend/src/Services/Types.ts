class TontineModel {
    id: string;
    nom: string;
    total: string | null = null;
    type: string | null = null;
    montant: string | null = "5000 FCFa";
    bg: string | null = null;
    association_id: string | null = null;
    date_creation:string|null=null;
    creerPar: string | null = null;
    nbMembres: number | null=12;
    typeCaisse: string | null = null;
    montantEpargne?: string | null = null; // Ajout pour les caisses d'épargne ou sociale
    montantCotisation?: string | null = null; // Ajout pour les caisses de dette

    constructor(id: string, nom: string, date_creation: string,type:string,montant:string,frequence:string) {
        this.id = id;
        this.nom = nom;
        this.date_creation = date_creation.toString();
        this.type=type;
        this.montant=montant;
        
    }

    // Méthode pour créer une liste de TontineModel à partir de données simples
   static fromSimpleList(data: { id: string; name: string; creationDate: Array<number>, type:string,montant:string,frequence:string }[]): TontineModel[] {
        return data.map(item => new TontineModel(item.id, item.name, item.creationDate.join('-'),item.type, item.montant,item.frequence));
    }
}

export { TontineModel };