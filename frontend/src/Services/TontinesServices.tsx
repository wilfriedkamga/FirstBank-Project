import axios from "axios";
import Variable from "../Variableprod1";

const routes =
  Variable.routeApiTontine + "/api/tontinemanagement/createTontine";
const route_get_all_tontine =
  Variable.routeApiTontine + "/api/tontinemanagement/tontines";
const route_get_all_caisse =
  Variable.routeApiTontine + "/api/tontinemanagement/caisses";
const route_create_caisse =
  Variable.routeApiTontine + "/api/tontinemanagement/createCaisse";
const route_get_all_membre_tontine =
  Variable.routeApiTontine + "/api/tontinemanagement/membres_tontine";
const route_get_all_membre_caisse =
  Variable.routeApiTontine + "/api/tontinemanagement/membres_caisse";
const route_add_membre_caisse =
  Variable.routeApiTontine + "/api/tontinemanagement/ajout_membre_caisse";

type TTontineModel = {
  id: string;
  nom: string;
  description: string;
  type: string;
  frequence: string;
  jourReunion: string;
  nbCaisse: number;
  nbMembre: number;
  create_par: string;
  id_admin1: string;
  id_admin2: string;
  id_admin3: string;
};

type TMembreCaisseModel = {
  id: string;
  nomUtilisateur: string;
  role: string;
  id_caisse: string;
  idutiliateur: string;
  creer_par: string;
  date_creation: string;
};

type TCaisseModel = {
  nom: string;
  total: string;
  type: string;
  montant: string;
  bg: string;
  tontine_id: string;
  creerPar: string;
};

class TontineService {
  // Créer une tontine
  CreateTontine(tontineModel: TTontineModel) {
    console.log(JSON.stringify(tontineModel));

    return axios.post(routes, tontineModel);
  }

  // Créer une caisse
  CreateCaisse(caisseModel: TCaisseModel) {
    console.log(JSON.stringify(caisseModel));
    return axios.post(route_create_caisse, caisseModel);
  }

  // Ajouter un membre dans une caisse
  addMembreCaisse(membreCaisseModel: TMembreCaisseModel) {
    console.log(membreCaisseModel);
    return axios.post(route_add_membre_caisse, membreCaisseModel);
  }

  // Recupérer toutes les tontines d'un utilisateur
  GetTontines(phone: string) {
    return axios.get(route_get_all_tontine + "?phone=" + phone);
  }

  GetMyAssociations(phone: string) {
    return axios.get(route_get_all_tontine + "?phone=" + phone);
  }

  // Recupérer toutes les caisses d'une tontine donnée
  GetCaissess(idTontine: string) {
    return axios.get(route_get_all_caisse + "?idTontine=" + idTontine);
  }

  // Recuperer tous les membres d'une tontine
  GetMembresTontine(idTontine: string) {
    return axios.get(route_get_all_membre_tontine + "?idTontine=" + idTontine);
  }

  // Recuperer tous les membres d'une caisse
  GetMembresCaisse(idCaisse: string) {
    return axios.get(route_get_all_membre_caisse + "?idCaisse=" + idCaisse);
  }

  // Recupérer toutes les tontines d'un utilisateur
  GetTontinesByPhone(telephone: string) {
    return axios.get(route_get_all_tontine);
  }
}

export default new TontineService();
