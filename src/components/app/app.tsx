import { AppHeader } from "@components/app-header";
import { BurgerIngredients } from "@components/burger-ingredients";
import { BurgerConstructor } from "@components/burger-constructor";

import classes from "./app.module.css";

export function App() {
  return (
    <div className={classes.layout}>
      <AppHeader />
      <main className={classes.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}
