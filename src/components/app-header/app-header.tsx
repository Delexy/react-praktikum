import { FC } from "react";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "./components";

import classes from "./app-header.module.css";

export const AppHeader: FC = () => {
  return (
    <header className={`pt-4 pb-4 ${classes.header}`}>
      <nav className={`${classes.container}`}>
        <div className={classes.flex}>
          <Button
            Icon={<BurgerIcon type="primary" />}
            text="Конструктор"
            className="mr-2"
          />
          <Button Icon={<ListIcon type="primary" />} text="Лента заказов" />
          <div className={`${classes.logo} ml-25`}>
            <a href="/">
              <Logo />
            </a>
          </div>
        </div>
        <Button Icon={<ProfileIcon type="primary" />} text="Личный кабинет" />
      </nav>
    </header>
  );
};
