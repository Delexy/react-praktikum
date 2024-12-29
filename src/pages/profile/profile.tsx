import { useCallback } from "react";

import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@utils/constants";
import { useLogoutMutation } from "@services/authApi";
import { RefreshToken } from "@utils/token";

import classes from "./profile.module.css";

export const ProfilePage = () => {
  const [logout] = useLogoutMutation();
  const isProfile = useLocation().pathname === ROUTES.Profile;

  const handleLogout = useCallback(async () => {
    try {
      await logout({ token: RefreshToken.get() });
    } catch (err) {
      console.error(err);
    }
  }, [logout]);

  return (
    <div className={`${classes.wrapper} mt-30`}>
      <nav className={classes.navigation}>
        <div className={classes.links + " mb-20"}>
          <NavLink
            className={({ isActive }) =>
              `${classes.link} text text_type_main-medium ${
                isActive && isProfile
                  ? "text_color_primary"
                  : "text_color_inactive"
              }`
            }
            to={ROUTES.Profile}
          >
            Профиль
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${classes.link} text text_type_main-medium ${
                isActive && !isProfile
                  ? "text_color_primary"
                  : "text_color_inactive"
              }`
            }
            to={ROUTES.Orders}
          >
            История заказов
          </NavLink>
          <NavLink
            className={`${classes.link} text text_type_main-medium text_color_inactive`}
            onClick={handleLogout}
            to={ROUTES.Login}
          >
            Выход
          </NavLink>
        </div>

        {isProfile && (
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        )}
      </nav>
      <Outlet />
    </div>
  );
};
