import { FC, memo, useCallback, useMemo, useState } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { Category } from "./components";

import classes from "./burger-ingredients.module.css";
import {
  IngredientInterface,
  IngredientType,
} from "@projectTypes/IngredientTypes";

interface Props {
  ingredients?: IngredientInterface[];
  isLoading: boolean;
  hasError: boolean;
}

enum Tabs {
  BUNS = "buns",
  SAUCES = "sauces",
  FILLINGS = "fillings",
}

export const BurgerIngredients: FC<Props> = memo(
  ({ ingredients = [], hasError, isLoading }) => {
    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.BUNS);

    const bunIngredients = useMemo(
      () => ingredients.filter((item) => item.type === IngredientType.BUN),
      [ingredients]
    );
    const mainIngredients = useMemo(
      () => ingredients.filter((item) => item.type === IngredientType.MAIN),
      [ingredients]
    );
    const sauceIngredients = useMemo(
      () => ingredients.filter((item) => item.type === IngredientType.SAUCE),
      [ingredients]
    );

    const handleChangeTab = useCallback(
      (value: string) => {
        setCurrentTab(value as Tabs);
      },
      [setCurrentTab]
    );

    if (hasError) {
      return (
        <p className="text text_type_main-large">
          Произошла ошибочка, попробуйте позже
        </p>
      );
    }

    if (isLoading) {
      return <p className="text_type_main-large pt-1">Загружаемся</p>;
    }

    return (
      <section className={`pt-10 ${classes.layout}`}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>

        <div style={{ display: "flex" }} className="pt-5">
          <Tab
            value={Tabs.BUNS}
            active={currentTab === Tabs.BUNS}
            onClick={handleChangeTab}
          >
            Булки
          </Tab>
          <Tab
            value={Tabs.SAUCES}
            active={currentTab === Tabs.SAUCES}
            onClick={handleChangeTab}
          >
            Соусы
          </Tab>
          <Tab
            value={Tabs.FILLINGS}
            active={currentTab === Tabs.FILLINGS}
            onClick={handleChangeTab}
          >
            Начинки
          </Tab>
        </div>
        <div className={`mt-10 mb-10 ${classes.categories}`}>
          {currentTab === Tabs.BUNS && (
            <Category title="Булки" ingredients={bunIngredients} />
          )}
          {currentTab === Tabs.FILLINGS && (
            <Category title="Соусы" ingredients={mainIngredients} />
          )}
          {currentTab === Tabs.SAUCES && (
            <Category title="Начинки" ingredients={sauceIngredients} />
          )}
        </div>
      </section>
    );
  }
);
