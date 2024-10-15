import { FC, memo, useState } from "react";

import { IngredientInterface } from "@projectTypes/IngredientTypes";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import classes from "./ingredient.module.css";

export const Ingredient: FC<IngredientInterface> = memo(
  ({ image, name, price }) => {
    const [count] = useState(0);

    return (
      <li className={classes.element}>
        {count > 0 && <Counter count={count} />}
        <div className="pl-4 pr-4 mb-1">
          <img src={image} />
        </div>
        <p className={`text_type_digits-default mb-1 mt-1 ${classes.price}`}>
          {price} <CurrencyIcon type="primary" />
        </p>
        <p
          className="text_type_main-default mt-1 mb-1"
          style={{ textAlign: "center" }}
        >
          {name}
        </p>
      </li>
    );
  }
);
