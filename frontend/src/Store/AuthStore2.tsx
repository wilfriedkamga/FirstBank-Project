import { create } from "zustand";

type TAuthStore={
    isAuthenticated:Boolean;
    login:()=>void;
    logout:()=>void;
}

 const useAuthStore2=create<TAuthStore>((set)=>({
    isAuthenticated:false,
    login:()=>{set({isAuthenticated:true})},
    logout:()=>{set({isAuthenticated:false})}

}))

export default useAuthStore2;