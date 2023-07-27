const SESSION_ID_KEY = "session_id";
const IS_GUEST_KEY = "is_guest";

class LocalStorageHelper {
  get sessionId() {
    return localStorage.getItem(SESSION_ID_KEY) || "";
  }
  set sessionId(value: string) {
    localStorage.setItem(SESSION_ID_KEY, value);
  }
  get isGuest() {
    return localStorage.getItem(IS_GUEST_KEY) || "";
  }
  set isGuest(value: string) {
    localStorage.setItem(IS_GUEST_KEY, value);
  }
}

export const localStorageHelper = new LocalStorageHelper();