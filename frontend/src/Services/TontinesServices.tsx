import axios from "axios";
import Variable from "../Variable";

const routes=Variable.routeApiTontine +"/api/tontinemanagement/createTontine"
const route_get_all_tontine=Variable.routeApiTontine +"/api/tontinemanagement/tontines"
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


class TontineService{
    
    CreateTontine(tontineModel:TTontineModel){
       

        return axios.post(routes,tontineModel) ;

     }

     GetTontines(phone:string){
      
      return axios.get(route_get_all_tontine+"?phone="+phone) ;
      
   }

   GetTontinesByPhone(telephone:string){
      
      return axios.get(route_get_all_tontine) ;
      
   }

}

export default new TontineService;