import { FC, memo, useCallback } from "react";

import {
  IngredientDragType,
  IngredientInterface,
} from "@projectTypes/IngredientTypes";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Image } from "@components/image";

import classes from "./ingredient.module.css";
import { useDispatch } from "react-redux";
import { setIngredient } from "@services/currentIngredientSlice";
import { useDrag } from "react-dnd";
import { useAppSelector } from "@hooks/typedHooks";

interface Props {
  ingredient: IngredientInterface;
}

export const Ingredient: FC<Props> = memo(({ ingredient }) => {
  const [{ opacity }, dragRef] = useDrag({
    type: IngredientDragType.INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const dispatch = useDispatch();

  const count = useAppSelector(
    (state) =>
      [
        ...state.constructorItems.ingredients,
        state.constructorItems.bun,
      ].filter((item) => item?._id === ingredient._id && Boolean(item)).length
  );
  const { name, image, price } = ingredient;

  const handleClick = useCallback(() => {
    dispatch(setIngredient(ingredient));
  }, [dispatch, ingredient]);

  return (
    <li
      className={classes.element}
      onClick={handleClick}
      draggable
      style={{ opacity }}
      ref={dragRef}
    >
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
