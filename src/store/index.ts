import { AuthStore } from "./auth";

class RootStore {

  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore();
  }
};

export const rootStore = new RootStore();