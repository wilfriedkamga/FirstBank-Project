import create from 'zustand';

interface User {
  phone: string;
  fullName: string;
  birthDate: string;
  gender: string;
  password: string;
  email: string | null;
  idCard: string | null;
  photo: string | null;
  privilegelist: string[];
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: (token:string, user:User) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));

export default useAuthStore;