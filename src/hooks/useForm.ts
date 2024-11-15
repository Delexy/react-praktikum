import { ChangeEvent, useState } from "react";

const isEqual = (
  initialValue: Record<string, unknown>,
  currentValue: Record<string, unknown>
) => {
  return Object.keys(currentValue).every(
    (key) => initialValue?.[key] === currentValue[key]
  );
};

export const useForm = <T extends Partial<Record<keyof T, string>>>(
  initialValue: T
) => {
  const [formValues, setFormValues] = useState<T>(initialValue ?? {});
  const [isTouched, setIsTouched] = useState(false);

  const resetTouched = () => {
    setIsTouched(false);
  };

  const resetForm = () => {
    resetTouched();
    setFormValues(initialValue);
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextValue = { ...formValues, [name]: value };
    setFormValues(nextValue);

    setIsTouched(!isEqual(initialValue, nextValue));
  };

  return {
    formValues,
    resetForm,
    changeForm,
    isTouched,
    resetTouched,
  };
};
