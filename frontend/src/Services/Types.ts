class TontineModel {
  id: string;
  tontineName: string;
  type: string | null = null;
  association_id: string | null = null;
  creationDate: string | null = null;
  startDate?: Date | null = null;
  endDate?: Date | null = null;
  purpose?: string;
  creatorPhone: string | null = null;
  nbMembres: number | null = 0;
  nbNotifications: number | null = 0;
  amount: string; // Ajout pour les caisses d'épargne ou sociale

  constructor(
    id: string,
    tontineName: string,
    date_creation: string,
    type: string,
    montant: string,
    purpose: string
  ) {
    this.id = id;
    this.tontineName = tontineName;
    this.creationDate = date_creation.toString();
    this.type = type;
    this.amount = montant;
    this.purpose = purpose;
  }
}

export { TontineModel };

export type NotificationType = "message" | "link" | "confirmation";

export interface NotificationModel {
  avatarUrl: string;
  message: string;
  timestamp: string;
  secondaryAction?: string; // Like "Invitation accepted", etc.
  unread?: boolean; // Indicates if the notification is unread
  requiredConfirmation?: boolean; //
  stateConfirmation?: boolean;
  statusConfirmation?: boolean;
}

export type membreAssoModel = {
  id: string;
  memberName: string;
  memberPhone: string;
  creationDate?: string;
  role?: string;
  avatarUrl?: boolean;
  isCreator?: boolean;
  associationId?: string;
  state?: EtatMembre;
};

export type AssociationModel = {
  id: string;
  assoName: string;
  meetingFrequency: string;
  meetingDay: string;
  creationDate: string;
  nbMembre: string;
  nbTontine: string;
  nbMeetings: string;
  nbEvents: string;
  nbDocuments: string;
  isAlreadyOpen: string;
  isDeletable: string;
  visibility: string;
  state: string;
  PhoneCreator: string;
  meetMode: string;
};

export enum EtatMembre {
  INVITE = 'INVITE',
  VALIDE = 'VALIDE',
  ACCEPTE = 'ACCEPTE',
  REFUSE = 'REFUSE',
  REJETTE = 'REJETTE',
  ACTIF = 'ACTIF',
  SUPPRIME='SUPPRIME'
}

export enum ActionType {
  DELETE = 'DELETE',
  CANCEL = 'CANCEL',
  ADD = 'ADD',
  
}

export enum InvitationType {
  MEMBRE="MEMBRE",
  ADMINISTRATEUR="ADMINISTRATEUR",
  CREATE_ASSOCIATION="CREATE_ASSOCIATION",
  CREATE_ROLE_ASSOCIATION="CREATE_ROLE_ASSOCIATION"
}
