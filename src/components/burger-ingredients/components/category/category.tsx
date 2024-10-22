import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
} from "react";
import { Ingredient } from "../ingredient";
import { IngredientInterface } from "@projectTypes/IngredientTypes";

import classes from "./category.module.css";

interface Props {
  title: string;
  ingredients?: IngredientInterface[];
  ref: RefObject<HTMLDivElement>;
}

export const Category: ForwardRefExoticComponent<
  Omit<Props, "ref"> & RefAttributes<HTMLDivElement>
> = forwardRef(({ title, ingredients }, ref) => {
  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  return (
    <div ref={ref}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={`pl-4 pt-6 ${classes.grid}`}>
        {ingredients.map((ingredient) => (
          <Ingredient ingredient={ingredient} key={ingredient._id} />
        ))}
      </ul>
    </div>
  );
});
