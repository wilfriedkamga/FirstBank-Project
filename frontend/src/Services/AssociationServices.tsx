
import axios from "axios";
import Variable from "../Variable";

const routes =
  Variable.routeApiTontine + "/api/tontinemanagement/createTontine";
const route_get_all_association =
  Variable.routeApiAssociation +
  "/api/associationmanagement/associations-by-phone";
const route_add_membre_caisse =
  Variable.routeApiTontine + "/api/tontinemanagement/ajout_membre_caisse";

class AssociationServices {
  // Créer une tontine
  CreateTontine(tontineModel: any) {
    console.log(JSON.stringify(tontineModel));

    return axios.post(routes, tontineModel);
  }

  // Recuperer les associations
  GetMyAssociations(phone: string) {
    return axios.get(route_get_all_association + "?phone=" + phone);
  }
}

export default new AssociationServices();
