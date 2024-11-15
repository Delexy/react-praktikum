import { memo } from "react";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "@utils/constants";

import classes from "./app-header.module.css";

export const AppHeader = memo(() => {
  return (
    <header className={`pt-4 pb-4 ${classes.header}`}>
      <nav className={`${classes.container}`}>
        <div className={classes.flex}>
          <NavLink
            to={ROUTES.Main}
            className={({ isActive }) =>
              `text text_type_main-default mt-4 mb-4 pr-5 pl-5 ${
                classes.link
              } ${isActive && classes.activeLink}`
            }
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                Конструктор
              </>
            )}
          </NavLink>
          <NavLink
            to={ROUTES.Orders}
            className={({ isActive }) =>
              `text text_type_main-default mt-4 mb-4 pr-5 pl-5 ${
                classes.link
              } ${isActive && classes.activeLink}`
            }
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? "primary" : "secondary"} />
                Лента заказов
              </>
            )}
          </NavLink>
          <div className={`${classes.logo} ml-25`}>
            <Link to={ROUTES.Main}>
              <Logo />
            </Link>
          </div>
        </div>
        <NavLink
          to={ROUTES.Profile}
          className={({ isActive }) =>
            `text text_type_main-default mt-4 mb-4 pr-5 pl-5 ${classes.link} ${
              isActive && classes.activeLink
            }`
          }
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              Личный кабинет
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
});
