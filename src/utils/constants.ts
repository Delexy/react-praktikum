export const BURGER_API_URL = `https://norma.nomoreparties.space/api`;
export const WS_API_URL = `https://norma.nomoreparties.space`;

export enum ROUTES {
  Main = "/",
  ForgotPassword = "/forgot-password",
  Login = "/login",
  Profile = "/profile",
  Register = "/register",
  ResetPassword = "/reset-password",
  Ingredient = "/ingredient",
  Orders = `${ROUTES.Profile}/orders`,
  Feed = `/feed`,
}

export const makeRoutePath = {
  Ingredient: (id: string) => `${ROUTES.Ingredient}/${id}`,
  Order: (id: string) => `${ROUTES.Orders}/${id}`,
  FeedOrder: (id: string) => `${ROUTES.Feed}/${id}`,
};
