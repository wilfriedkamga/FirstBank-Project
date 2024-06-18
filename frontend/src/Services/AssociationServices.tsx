
import axios from "axios";
import Variable from "../Variable";

const routes =
  Variable.routeApiTontine + "/api/tontinemanagement/createTontine";
  const routes_create_association=Variable.routeApiAssociation+"/api/associationmanagement/create"
const route_get_all_association =
  Variable.routeApiAssociation +
  "/api/associationmanagement/associations-by-phone";
const route_add_membre_caisse =
  Variable.routeApiTontine + "/api/tontinemanagement/ajout_membre_caisse";

class AssociationServices {
  // Créer une tontine
  CreateAssociation(data: any) {
    return axios.post(routes_create_association, data);
  }

  // Recuperer les associations
  GetMyAssociations(phone: string) {
    return axios.get(route_get_all_association + "?phone=" + phone);
  }
}

export default new AssociationServices();
