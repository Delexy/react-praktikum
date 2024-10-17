import { FC, memo } from "react";
import { Ingredient } from "../ingredient";
import { IngredientInterface } from "@projectTypes/IngredientTypes";

import classes from "./category.module.css";

interface Props {
  title: string;
  ingredients?: IngredientInterface[];
  onClick?: (id: string) => void;
}

export const Category: FC<Props> = memo(({ title, ingredients, onClick }) => {
  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={`pl-4 pt-6 ${classes.grid}`}>
        {ingredients.map((ingredient) => (
          <Ingredient
            ingredient={ingredient}
            key={ingredient._id}
            onClick={onClick}
          />
        ))}
      </ul>
    </div>
  );
});
