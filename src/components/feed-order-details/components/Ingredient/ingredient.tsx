import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientInterface } from "@projectTypes/IngredientTypes";

import classes from "./ingredient.module.css";

export const Ingredient = ({
  image_mobile,
  amount,
  name,
  price,
  _id,
}: IngredientInterface & { amount: number }) => (
  <li className={classes.wrapper} key={_id}>
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <img className={classes.image} src={image_mobile} alt={name} />
      </div>
      <p className={`text text_type_main-default`}>{name}</p>
    </div>
    <div className={classes.price}>
      <p className="text text_type_digits-default">{`${amount} x ${price}`}</p>
      <CurrencyIcon type="primary" />
    </div>
  </li>
);
