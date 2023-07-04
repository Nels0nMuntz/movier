import { rootStore } from "store";


export const APP_URLS = {
  authWelcome: "/auth-welcome",
  authLogin: "/auth-login",
  browse: {
    path: "/browse",
    loader: async () => {
      rootStore.browseStore.initialize();
      return null;
    }
  },
};