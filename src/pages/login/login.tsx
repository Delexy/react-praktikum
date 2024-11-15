import { FormEvent, useCallback } from "react";
import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@utils/constants";

import classes from "./login.module.css";
import { useForm } from "@hooks/useForm";
import { useLoginMutation } from "@services/authApi";

interface Form {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const { changeForm, formValues } = useForm<Form>({
    email: "",
    password: "",
  });

  const onFormSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const payload = await login(formValues).unwrap();
        if (payload.success) {
          navigate(ROUTES.Main);
        } else {
          console.error(payload);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [formValues, login, navigate]
  );

  return (
    <div className={classes.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form className={classes.form} onSubmit={onFormSubmit}>
        <EmailInput
          name="email"
          value={formValues.email}
          onChange={changeForm}
          required
          autoFocus
        />
        <PasswordInput
          name="password"
          value={formValues.password}
          onChange={changeForm}
          required
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={`mt-20 ${classes.links}`}>
        <p className={"text text_type_main-default text_color_inactive"}>
          Вы — новый пользователь?{" "}
          <Link to={ROUTES.Register} className={classes.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={"text text_type_main-default text_color_inactive"}>
          Забыли пароль?{" "}
          <Link to={ROUTES.ForgotPassword} className={classes.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};
