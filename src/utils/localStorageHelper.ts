const REQUEST_TOKEN_KEY = "request_token";
const SESSION_ID_KEY = "session_id";
const IS_GUEST_KEY = "is_guest";

class LocalStorageHelper {
  get requestToken() {
    return localStorage.getItem(REQUEST_TOKEN_KEY) || "";
  }
  set requestToken(value: string) {
    localStorage.setItem(REQUEST_TOKEN_KEY, value);
  }
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
  clear() {
    localStorage.removeItem(REQUEST_TOKEN_KEY);
    localStorage.removeItem(SESSION_ID_KEY);
    localStorage.removeItem(IS_GUEST_KEY);
  }
}

export const localStorageHelper = new LocalStorageHelper();