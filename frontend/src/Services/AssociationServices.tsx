import axios from "axios";
import Variable from "../Variable";

const routes_create_association =
  Variable.routeApiAssociation +
  "/api/associationmanagement/create_association";
const routes_delete_association =
  Variable.routeApiAssociation +
  "/api/associationmanagement/delete_association_by_id";
const routes_opening_association =
  Variable.routeApiAssociation +
  "/api/associationmanagement/initialize_association";
const routes_create_tontine =
  Variable.routeApiAssociation + "/api/associationmanagement/createTontine";
const routes_get_association_details =
  Variable.routeApiAssociation + "/api/associationmanagement/association_by_id";
const route_get_all_association =
  Variable.routeApiAssociation +
  "/api/associationmanagement/associations_by_phone";
const route_get_tontines_by_association =
  Variable.routeApiAssociation +
  "/api/associationmanagement/get_tontines_by_association";
const route_get_members_by_association =
  Variable.routeApiAssociation +
  "/api/associationmanagement/association/{id}/members";
const route_get_reunions_by_association =
  Variable.routeApiAssociation +
  "/api/associationmanagement/association/{id}/reunions";
const route_get_roles_by_association =
  Variable.routeApiAssociation + "/api/associationmanagement/roles";
const route_get_events_by_association =
  Variable.routeApiAssociation +
  "/api/associationmanagement/association/{id}/events";
const route_get_documents_by_associationId =
  Variable.routeApiAssociation +
  "/api/associationmanagement/documentsByAssociation";

const route_add_member =
  Variable.routeApiAssociation + "/api/associationmanagement/add-member";

  const route_get_current_member =
  Variable.routeApiAssociation + "/api/associationmanagement/member_by_phone_and_association";

  const route_add_member_in_creation =
  Variable.routeApiAssociation + "/api/associationmanagement/invite_member";
  const route_cancel_invitation_in_association_creation =
  Variable.routeApiAssociation + "/api/associationmanagement/cancel_invitation";
const route_create_role =
  Variable.routeApiAssociation + "/api/associationmanagement/create-role";
const route_update_association =
  Variable.routeApiAssociation + "/api/associationmanagement/update";
const route_delete_member =
  Variable.routeApiAssociation +
  "/api/associationmanagement/delete-member/{memberId}";
const route_verify_name_association_before_creation =
  Variable.routeApiAssociation +
  "/api/associationmanagement/verify_name_before_creation";
const route_change_member_role =
  Variable.routeApiAssociation +
  "/api/associationmanagement/change-member-role";
const route_delete_document =
  Variable.routeApiAssociation + "/api/associationmanagement/delete_document";
const route_get_member_details =
  Variable.routeApiAssociation + "/api/associationmanagement/member-details";
const route_upload_file_for_association =
  Variable.routeApiAssociation + "/api/associationmanagement/uploadFile";
const route_get_default_role =
  Variable.routeApiAssociation + "/api/associationmanagement/getDefaultRoles";
const route_get_default_frequency =
  Variable.routeApiAssociation +
  "/api/associationmanagement/default-frequencies";

const route_answer_invitation =
  Variable.routeApiAssociation +
  "/api/associationmanagement/answer_invitation";

class AssociationServices {

  AddMember(data: any) {
    return axios.post(route_add_member, data);
  }

  AddMemberInCreation(data: any) {
    return axios.post(route_add_member_in_creation, data);
  }

  AnswerInvitation(temp:any) {
    console.log(temp)
    return axios.post(route_answer_invitation ,temp);
  }
  
  CancelInvitation(data: any) {
    return axios.post(route_cancel_invitation_in_association_creation, data);
  }
  // Changer le rôle d'un membre de l'association
  ChangeMemberRole(data: any) {
    return axios.put(route_change_member_role, data);
  }

  // Créer une association
  CreateAssociation(data: any) {
    console.log(data);
    return axios.post(routes_create_association, data);
  }
  // Créer un nouveau rôle dans une association
  CreateRole(data: any) {
    return axios.post(route_create_role, data);
  }

  // Créer une tontine
  Createtontine(data: any) {
    console.log(data);
    return axios.post(routes_create_tontine, data);
  }

  // Modifier les informations d'une association
  delete_association(data: string) {
    return axios.delete(routes_delete_association + "?associationId=" + data);
  }

  // Retirer un membre de l'association
  DeleteMember(memberId: string) {
    return axios.delete(route_delete_member.replace("{memberId}", memberId));
  }

  DeleteDocument(documentId: string, associationId: string) {
    return axios.delete(
      route_delete_document +
        "?documentId=" +
        documentId +
        "&associationId=" +
        associationId
    );
  }
  
  // Récupérer les évènements d'une association
  GetCurrentMember(phone:string, associationId:string) {
    return axios.get(route_get_current_member+"?associationId="+associationId+"&phone="+phone);
  }
  // Récupérer les évènements d'une association
  GetEventsByAssociationId(id: string) {
    return axios.get(route_get_events_by_association.replace("{id}", id));
  }
   // Récupérer les détails d'un membre
   GetMemberDetails(phone: string) {
    return axios.get(route_get_member_details + "?phone=" + phone);
  }

   // Récupérer les membres d'une association
   GetMembersByAssociationId(id: string) {
    return axios.get(route_get_members_by_association.replace("{id}", id));
  }
   
  
  // Récupérer les réunions d'une association
  GetReunionsByAssociationId(id: string) {
    return axios.get(route_get_reunions_by_association.replace("{id}", id));
  }
  // Récupérer les tontines d'une association
  GetTontinesByAssociationId(id: string) {
    return axios.get(
      route_get_tontines_by_association + "?associationId=" + id
    );
  }

  GetAssociationDetails(id: string) {
    console.log(routes_get_association_details + "?associationId=" + id);
    return axios.get(routes_get_association_details + "?associationId=" + id);
  }

  // Créer une tontine
  getDefaultRole() {
    return axios.get(route_get_default_role);
  }
  // Créer une tontine
  getDefaultFrequency() {
    return axios.get(route_get_default_frequency);
  }

   // Récupérer les associations
   GetMyAssociations(phone: string) {
    return axios.get(route_get_all_association + "?phone=" + phone);
  }

  GetRoleByAssociation(associationId: string) {
    return axios.get(
      route_get_roles_by_association + "?associationId=" + associationId
    );
  }
  GetDocumentsByAssociationId(associationId: string) {
    return axios.get(
      route_get_documents_by_associationId + "?associationId=" + associationId
    );
  }
  
// Modifier les informations d'une association
initialize_association(data: string) {
  return axios.post(routes_opening_association + "?associationId=" + data);
}

  VerifryAssociationNameBeforeCreation(assoName: string, phone: string) {
    console.log(
      route_verify_name_association_before_creation +
        "?associationName=" +
        assoName +
        "&phoneCreator=" +
        phone
    );
    return axios.post(
      route_verify_name_association_before_creation +
        "?associationName=" +
        assoName +
        "&phoneCreator=" +
        phone
    );
  }
  // Créer un nouveau rôle dans une association
  Upload_file_for_association(data: any) {
    return axios.post(route_upload_file_for_association, data);
  }

  // Modifier les informations d'une association
  UpdateAssociation(data: any) {
    return axios.put(route_update_association, data);
  }
}

export default new AssociationServices();
