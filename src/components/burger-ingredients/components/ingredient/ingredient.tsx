import { FC, memo, useState } from "react";

import { IngredientInterface } from "@projectTypes/IngredientTypes";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Image } from "@components/image";

import classes from "./ingredient.module.css";

interface Props {
  ingredient: IngredientInterface;
  onClick?: (id: string) => void;
}

export const Ingredient: FC<Props> = memo(({ onClick, ingredient }) => {
  const [count] = useState(0);
  const { _id, name, image, price } = ingredient;

  return (
    <li className={classes.element} onClick={() => onClick?.(_id)}>
      {count > 0 && <Counter count={count} />}
      <div className={`pl-4 pr-4 mb-1 ${classes.image}`}>
        <Image src={image} alt={name} />
      </div>
      <p className={`text_type_digits-default mb-1 mt-1 ${classes.price}`}>
        {price} <CurrencyIcon type="primary" />
      </p>
      <p className={`text_type_main-default mt-1 mb-1 ${classes.name}`}>
        {name}
      </p>
    </li>
  );
});
