import { AppHeader } from "@components/app-header";

import classes from "./app.module.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MainPage } from "@pages/main";
import { ROUTES } from "@utils/constants";
import { useCallback } from "react";
import { LocationWithState } from "@projectTypes/router";
import { IngredientDetails } from "@components/ingredient-details";
import { Modal } from "@components/modal";
import { UnknownPage } from "@pages/unknown";
import { LoginPage } from "@pages/login";
import { RegisterPage } from "@pages/register";
import { ProfilePage } from "@pages/profile";
import { ResetPage } from "@pages/reset-password";
import { ForgotPage } from "@pages/forgot-password";
import { OnlyAuth, OnlyUnAuth } from "@components/protected-route";
import { FeedPage } from "@pages/feed";

export function App() {
  const location: LocationWithState = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.backgroundLocation;

  const handleModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className={classes.layout}>
      <AppHeader />
      <main className={classes.main}>
        <Routes location={backgroundLocation || location}>
          <Route path={ROUTES.Main} element={<MainPage />} />
          <Route
            path={ROUTES.Profile}
            element={<OnlyAuth component={<ProfilePage />} />}
          />
          <Route
            path={ROUTES.Register}
            element={<OnlyUnAuth component={<RegisterPage />} />}
          />
          <Route
            path={ROUTES.Login}
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path={ROUTES.ResetPassword}
            element={<OnlyUnAuth component={<ResetPage />} />}
          />
          <Route
            path={ROUTES.ForgotPassword}
            element={<OnlyUnAuth component={<ForgotPage />} />}
          />
          <Route path={ROUTES.Feed} element={<FeedPage />} />
          <Route
            path={`${ROUTES.Ingredient}/:ingredientId`}
            element={<IngredientDetails />}
          />
          <Route path="*" element={<UnknownPage />} />
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route
              path={`${ROUTES.Ingredient}/:ingredientId`}
              element={
                <Modal closePopup={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path={`${ROUTES.Feed}/:orderId`}
              element={
                <Modal closePopup={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path={`${ROUTES.Orders}/:orderId`}
              element={
                <Modal closePopup={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}
