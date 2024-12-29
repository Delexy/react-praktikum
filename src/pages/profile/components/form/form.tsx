import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./form.module.css";
import { FormEvent, useCallback } from "react";
import { useGetUserQuery, usePatchUserMutation } from "@services/authApi";
import { useForm } from "@hooks/useForm";

export const Form = () => {
  const { data: userData } = useGetUserQuery();
  const [updateUser] = usePatchUserMutation();

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
  );
};
