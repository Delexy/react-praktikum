import classes from "./ingredient-image-list.module.css";
import { IngredientInterface } from "@projectTypes/IngredientTypes";

const MAX_VISIBLE_ITEMS = 5;

export const IngredientImageList = ({
  ingredients,
}: {
  ingredients: IngredientInterface[];
}) => {
  const visibleItems = ingredients.slice(0, MAX_VISIBLE_ITEMS);
  const hiddenItemsAmount = ingredients.length - MAX_VISIBLE_ITEMS;

  return (
    <ul className={classes.list}>
      {hiddenItemsAmount > 0 && (
        <li
          className={`${classes.img} ${classes.hiddenItems}`}
          data-count={`+${hiddenItemsAmount}`}
        >
          <img
            src={ingredients[MAX_VISIBLE_ITEMS].image_mobile}
            key={ingredients[MAX_VISIBLE_ITEMS]._id + MAX_VISIBLE_ITEMS}
          />
        </li>
      )}
      {visibleItems.map((ingredient, i) => (
        <li className={classes.img} key={ingredient._id + i}>
          <img src={ingredient.image_mobile} />
        </li>
      ))}
    </ul>
  );
};
