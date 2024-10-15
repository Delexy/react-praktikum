import { AppHeader } from "@components/app-header";
import { BurgerIngredients } from "@components/burger-ingredients";
import { BurgerConstructor } from "@components/burger-constructor";

import classes from "./app.module.css";
import { useEffect, useState } from "react";
import { IngredientInterface } from "@projectTypes/IngredientTypes";
import { GetIngredientsResponse } from "@projectTypes/apiResponses";
import { API_URL } from "@utils/constants";

export function App() {
  const [ingredients, setIngredients] = useState<IngredientInterface[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(API_URL)
      .then((response) => response.json())
      .then((response: GetIngredientsResponse) => {
        if (!response.success) {
          setIsLoading(false);
          return setHasError(true);
        }

        setIsLoading(false);
        setIngredients([...response.data]);
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
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
