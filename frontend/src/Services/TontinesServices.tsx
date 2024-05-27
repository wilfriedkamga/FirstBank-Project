import axios from "axios";
import Variable from "../Variable";

const routes=Variable.routeApiTontine +"/api/tontinemanagement/createTontine"
const route_get_all_tontine=Variable.routeApiTontine +"/api/tontinemanagement/tontines"
const route_get_all_caisse=Variable.routeApiTontine +"/api/tontinemanagement/caisses"
const route_create_caisse=Variable.routeApiTontine+"/api/tontinemanagement/createCaisse"

type TTontineModel={
  nom:string,
  description:string,
  type:string,
  frequence:string,
  jourReunion:string,
  nbCaisse:number,
  nbMembre:number,
  create_par:string,
}


type TCaisseModel = {
   nom: string;
   total: string;
   type: string;
   montant: string;
   bg: string;
   tontine_id:string;
   creerPar:string;
 };


class TontineService{
    
    CreateTontine(tontineModel:TTontineModel){
       

        return axios.post(routes,tontineModel) ;

     }
     CreateCaisse(caisseModel:TCaisseModel){
       
       console.log(JSON.stringify(caisseModel))
      return axios.post(route_create_caisse,caisseModel) ;

   }

     GetTontines(phone:string){
      
      return axios.get(route_get_all_tontine+"?phone="+phone) ;
      
   }

   GetCaissess(idTontine:string){
      
      return axios.get(route_get_all_caisse+"?idTontine="+idTontine) ;
      
   }

   GetTontinesByPhone(telephone:string){
      
      return axios.get(route_get_all_tontine) ;
      
   }

}

export default new TontineService;