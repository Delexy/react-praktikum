import { FormEvent, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "@hooks/useForm";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ROUTES } from "@utils/constants";
import { useChangePasswordMutation } from "@services/normaApi";

import classes from "./reset-password.module.css";

export const ResetPage = () => {
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();
  const { changeForm, formValues } = useForm({
    password: "",
    token: "",
  });

  const onFormSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const payload = await changePassword(formValues).unwrap();
        if (payload.success) {
          navigate(ROUTES.Login);
        } else {
          console.error(payload);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [changePassword, formValues, navigate]
  );

  return (
    <div className={classes.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form className={classes.form} onSubmit={onFormSubmit}>
        <PasswordInput
          onChange={changeForm}
          value={formValues.password}
          name="password"
          placeholder="Введите новый пароль"
          required
        />
        <Input
          onChange={changeForm}
          value={formValues.token}
          name="token"
          type="text"
          placeholder="Введите код из письма"
          required
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className={"mt-20 "}>
        <p className={"text text_type_main-default text_color_inactive"}>
          Вспомнили пароль?{" "}
          <Link to={ROUTES.Login} className={classes.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
