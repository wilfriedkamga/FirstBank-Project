class TontineModel {
    id: string;
    tontineName: string;
    type: string | null = null;
    association_id: string | null = null;
    creationDate:string|null=null;
    startDate?:Date|null=null;
    endDate?:Date|null=null;
    purpose?:string;
    creatorPhone: string | null = null;
    nbMembres: number | null=0;
    nbNotifications: number | null=0;
    amount: string // Ajout pour les caisses d'épargne ou sociale

    constructor(id: string, tontineName: string, date_creation: string,type:string,montant:string,purpose:string) {
        this.id = id;
        this.tontineName = tontineName;
        this.creationDate = date_creation.toString();
        this.type=type;
        this.amount=montant;
        this.purpose=purpose;
        
    }
}

export { TontineModel };

export type NotificationType = 'message' | 'link' | 'confirmation';

export interface NotificationModel {
    avatarUrl: string;
    message: string;
    timestamp: string;
    secondaryAction?: string; // Like "Invitation accepted", etc.
    unread?: boolean; // Indicates if the notification is unread
    requiredConfirmation?: boolean; //
  }

  export  type membre_AssoModel = {
    id: string;
    name: string;
    phone: string;
    creationDate: string;
    role: string;
    stateConfirmation: boolean;
    statusConfirmation: boolean;
    color?: string; // Ajouter une propriété de couleur
  };