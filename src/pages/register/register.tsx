import { FormEvent, useCallback } from "react";
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@utils/constants";
import { useForm } from "@hooks/useForm";
import { useRegisterMutation } from "@services/authApi";

import classes from "./register.module.css";

interface Form {
  name: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const { changeForm, formValues } = useForm<Form>({
    name: "",
    email: "",
    password: "",
  });

  const onFormSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const payload = await register(formValues).unwrap();
        console.log(payload);
        if (payload.success) {
          navigate(ROUTES.Login);
        } else {
          console.error(payload);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [formValues, navigate, register]
  );

  return (
    <div className={classes.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      <form className={classes.form} onSubmit={onFormSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Имя"
          value={formValues.name}
          onChange={changeForm}
        />
        <EmailInput
          name="email"
          placeholder="test@test.ru"
          value={formValues.email}
          onChange={changeForm}
        />
        <PasswordInput
          name="password"
          value={formValues.password}
          onChange={changeForm}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={"mt-20"}>
        <p className={"text text_type_main-default text_color_inactive"}>
          Уже зарегистрированы?{" "}
          <Link to={ROUTES.Login} className={classes.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
