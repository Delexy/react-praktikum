const tokenKey = "token";
const refreshTokenKey = "refresh-token";

export const Token = {
  set(value: string) {
    localStorage.setItem(tokenKey, value);
  },
  get() {
    return localStorage.getItem(tokenKey) ?? "";
  },
  clear() {
    localStorage.removeItem(tokenKey);
  },
};

export const RefreshToken = {
  set(value: string) {
    localStorage.setItem(refreshTokenKey, value);
  },
  get() {
    return localStorage.getItem(refreshTokenKey) ?? "";
  },
  clear() {
    localStorage.removeItem(refreshTokenKey);
  },
};
