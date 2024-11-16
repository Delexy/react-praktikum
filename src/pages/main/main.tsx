import { BurgerConstructor } from "@components/burger-constructor";
import { BurgerIngredients } from "@components/burger-ingredients";

export const MainPage = () => {
  return (
    <>
      <BurgerIngredients />
      <BurgerConstructor />
    </>
  );
};
