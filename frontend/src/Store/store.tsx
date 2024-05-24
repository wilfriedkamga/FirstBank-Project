import { create } from "zustand";

type TTontineModel = {
  id: string;
  nom: string;
  description: string;
  type: string;
  frequence: string;
  jourReunion: string;
};

type TTontineStore = {
  viewAddTontine: Boolean;
  tontine: TTontineModel | null; // Utilisez null comme valeur initiale
  create: (tontine: TTontineModel) => void; // Prend un objet TTontineModel en paramètre
};

const tontineStore = create<TTontineStore>((set) => ({
  viewAddTontine: false,
  tontine: null, // Utilisez null comme valeur initiale
  create: (tontine) => {
    set({ tontine }); // Stocke la tontine dans le store
  },
}));

export default tontineStore;
