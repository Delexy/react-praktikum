import { useForm } from "@hooks/useForm";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import classes from "./forgot-password.module.css";
import { useResetPasswordMutation } from "@services/normaApi";
import { ROUTES } from "@utils/constants";

export const ForgotPage = () => {
  const { formValues, changeForm } = useForm({
    email: "",
  });
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const isRequestSent = Boolean(localStorage.getItem("reset-password"));

  const onFormSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const payload = await resetPassword(formValues).unwrap();
        if (payload.success) {
          navigate(ROUTES.ResetPassword);
        } else {
          console.error(payload);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [resetPassword, formValues, navigate]
  );

  if (isRequestSent) {
    return <Navigate to={ROUTES.ResetPassword} />;
  }

  return (
    <div className={classes.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form className={classes.form} onSubmit={onFormSubmit}>
        <EmailInput
          placeholder="Укажите Email"
          name="email"
          value={formValues.email}
          onChange={changeForm}
          autoFocus
          required
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className={"text text_type_main-default text_color_inactive mt-20"}>
        Вспомнили пароль?{" "}
        <Link to={ROUTES.Login} className={classes.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};
