class DocumentModel {
    id: string;
    name: string;
    date: string;
    size: string;
    type: string;
    description?: string;
    downloadLink: string;
    associationId:string;

    constructor(id: string, name: string, date: string, size: string, type: string, downloadLink: string,associationId:string,description?: string) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.size = size;
        this.type = type;
        this.downloadLink = downloadLink;
        this.description = description;
        this.associationId=associationId;
    }

    static constructData(data: { id: string;nom: string;nomComplet:string;date: number;taille: string;description?: string;lien: string;associationId: string;}[]): DocumentModel[] {
        return data.map(item => new DocumentModel(
            item.id,
            item.nomComplet,
            new Date(item.date).toISOString(), // Formatage de la date
            item.taille,
            item.nomComplet.split('.')[1] || '', // Déduction du type à partir de l'extension du nom du fichier
            item.lien,
            item.associationId,
            item.description,
            
        ));
    }
}

export { DocumentModel };
