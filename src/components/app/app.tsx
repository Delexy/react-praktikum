import { AppHeader } from "../app-header";
import { BurgerIngredients } from "../burger-ingredients";

import classes from "./app.module.css";

export function App() {
  return (
    <div className={classes.layout}>
      <AppHeader />
      <main className={classes.main}>
        <BurgerIngredients />
      </main>
    </div>
  );
}
