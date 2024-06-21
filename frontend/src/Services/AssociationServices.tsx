

import axios from "axios";
import Variable from "../Variable";

// Définir les routes pour chaque endpoint
const routes_create_association = Variable.routeApiAssociation + "/api/associationmanagement/create";
const route_get_all_association = Variable.routeApiAssociation + "/api/associationmanagement/associations-by-phone";
const route_get_tontines_by_association = Variable.routeApiAssociation + "/api/associationmanagement/association/{id}/tontines";
const route_get_members_by_association = Variable.routeApiAssociation + "/api/associationmanagement/association/{id}/members";
const route_get_reunions_by_association = Variable.routeApiAssociation + "/api/associationmanagement/association/{id}/reunions";
const route_get_events_by_association = Variable.routeApiAssociation + "/api/associationmanagement/association/{id}/events";
const route_add_member = Variable.routeApiAssociation + "/api/associationmanagement/add-member";
const route_create_role = Variable.routeApiAssociation + "/api/associationmanagement/create-role";
const route_update_association = Variable.routeApiAssociation + "/api/associationmanagement/update";
const route_delete_member = Variable.routeApiAssociation + "/api/associationmanagement/delete-member/{memberId}";
const route_change_member_role = Variable.routeApiAssociation + "/api/associationmanagement/change-member-role";
const route_get_member_details = Variable.routeApiAssociation + "/api/associationmanagement/member-details";


class AssociationServices {
    // Créer une tontine
    CreateAssociation(data: any) {
        return axios.post(routes_create_association, data);
    }

    // Récupérer les associations
    GetMyAssociations(phone: string) {
        return axios.get(route_get_all_association + "?phone=" + phone);
    }

     // Récupérer les détails d'un membre
  GetMemberDetails(phone: string) {
    return axios.get(route_get_member_details + "?phone=" + phone);
  }

    // Récupérer les tontines d'une association
    GetTontinesByAssociationId(id: string) {
        return axios.get(route_get_tontines_by_association.replace("{id}", id));
    }

    // Récupérer les membres d'une association
    GetMembersByAssociationId(id: string) {
        return axios.get(route_get_members_by_association.replace("{id}", id));
    }

    // Récupérer les réunions d'une association
    GetReunionsByAssociationId(id: string) {
        return axios.get(route_get_reunions_by_association.replace("{id}", id));
    }

    // Récupérer les évènements d'une association
    GetEventsByAssociationId(id: string) {
        return axios.get(route_get_events_by_association.replace("{id}", id));
    }

    // Ajouter un membre dans une association
    AddMember(data: any) {
        return axios.post(route_add_member, data);
    }

    // Créer un nouveau rôle dans une association
    CreateRole(data: any) {
        return axios.post(route_create_role, data);
    }

    // Modifier les informations d'une association
    UpdateAssociation(data: any) {
        return axios.put(route_update_association, data);
    }

    // Retirer un membre de l'association
    DeleteMember(memberId: string) {
        return axios.delete(route_delete_member.replace("{memberId}", memberId));
    }

    // Changer le rôle d'un membre de l'association
    ChangeMemberRole(data: any) {
        return axios.put(route_change_member_role, data);
    }
}

export default new AssociationServices();