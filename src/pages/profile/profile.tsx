import { FormEvent, useCallback } from "react";

import { NavLink } from "react-router-dom";
import { ROUTES } from "@utils/constants";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "@hooks/useForm";
import {
  useGetUserQuery,
  useLogoutMutation,
  usePatchUserMutation,
} from "@services/authApi";
import { RefreshToken } from "@utils/token";

import classes from "./profile.module.css";

export const ProfilePage = () => {
  const { data: userData } = useGetUserQuery();
  const [updateUser] = usePatchUserMutation();
  const [logout] = useLogoutMutation();

  const {
    changeForm,
    formValues,
    isTouched: formIsTouched,
    resetForm,
    resetTouched,
  } = useForm({
    name: userData?.user.name ?? "",
    email: userData?.user.email ?? "",
    password: "",
  });

  const handleLogout = useCallback(async () => {
    try {
      await logout({ token: RefreshToken.get() });
    } catch (err) {
      console.error(err);
    }
  }, [logout]);

  const onFormSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await updateUser({
          email: formValues.email,
          name: formValues.name,
        });

        resetTouched();
      } catch (err) {
        console.error(err);
      }
    },
    [formValues.email, formValues.name, resetTouched, updateUser]
  );

  const handleCancel = useCallback(() => {
    resetForm();
  }, [resetForm]);

  return (
    <div className={`${classes.wrapper} mt-30`}>
      <nav className={classes.navigation}>
        <div className={classes.links + " mb-20"}>
          <NavLink
            className={({ isActive }) =>
              `${classes.link} text text_type_main-medium ${
                isActive ? "text_color_primary" : "text_color_inactive"
              }`
            }
            to={ROUTES.Profile}
          >
            Профиль
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${classes.link} text text_type_main-medium ${
                isActive ? "text_color_primary" : "text_color_inactive"
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
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <form className={classes.form} onSubmit={onFormSubmit} name="profile">
        <Input
          type="text"
          name="name"
          placeholder="Имя"
          icon={"EditIcon"}
          value={formValues.name}
          onChange={changeForm}
        />
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          icon={"EditIcon"}
          value={formValues.email}
          onChange={changeForm}
        />
        <PasswordInput
          name="password"
          value={formValues.password}
          onChange={changeForm}
        />
        {formIsTouched && (
          <div className={classes.buttons}>
            <Button
              type="secondary"
              size="medium"
              htmlType="button"
              onClick={handleCancel}
            >
              Отмена
            </Button>
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
