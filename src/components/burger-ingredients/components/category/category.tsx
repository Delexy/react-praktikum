import { FC, memo } from "react";
import { Ingredient } from "../ingredient";
import { IngredientInterface } from "@projectTypes/IngredientTypes";

interface Props {
  title: string;
  ingredients?: IngredientInterface[];
}

export const Category: FC<Props> = memo(({ title, ingredients }) => {
  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul
        className="pl-4 pt-6"
        style={{
          display: "grid",
          gap: "32px 24px",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {ingredients.map((ingredient) => (
          <Ingredient {...ingredient} key={ingredient._id} />
        ))}
      </ul>
    </div>
  );
});
