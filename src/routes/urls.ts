import { rootStore } from "store";


export const APP_URLS = {
  authWelcome: "/auth-welcome",
  authLogin: "/auth-login",
  browse: {
    path: "/browse",
    loader: async () => {
      // rootStore.moviesStore.initialize();
      return null;
    }
  },
};