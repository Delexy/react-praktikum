import { useEffect, useState } from "react";

import { AppHeader } from "@components/app-header";
import { BurgerIngredients } from "@components/burger-ingredients";
import { BurgerConstructor } from "@components/burger-constructor";

import { IngredientInterface } from "@projectTypes/IngredientTypes";
import { GetIngredientsResponse } from "@projectTypes/apiResponses";
import { API_URL } from "@utils/constants";

import classes from "./app.module.css";

export function App() {
  const [ingredients, setIngredients] = useState<IngredientInterface[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка ${response.status}`);
      })
      .then((response: GetIngredientsResponse) => {
        if (!response.success) {
          return setHasError(true);
        }

        setIngredients([...response.data]);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={classes.layout}>
      <AppHeader />
      <main className={classes.main}>
        <BurgerIngredients
          ingredients={ingredients}
          isLoading={isLoading}
          hasError={hasError}
        />
        <BurgerConstructor />
      </main>
    </div>
  );
}
