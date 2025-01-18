import { FC, memo, useCallback, useRef } from "react";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import classes from "./element.module.css";
import { useDispatch } from "react-redux";
import { IngredientDragType } from "@projectTypes/IngredientTypes";
import {
  changeOrder,
  ConstructorItem,
  removeIngredient,
} from "@services/constructorItemsSlice";
import { useDrag, useDrop } from "react-dnd";

interface Props {
  ingredient: ConstructorItem;
  index: number;
}

interface DraggedIngredient {
  index: number;
}

interface CollectedProps {
  isDragging: boolean;
}

export const Element: FC<Props> = memo(({ ingredient, index }) => {
  const { name, price, image_mobile } = ingredient;
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, dragRef] = useDrag<
    DraggedIngredient,
    unknown,
    CollectedProps
  >({
    type: IngredientDragType.ORDER_INGREDIENT,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<DraggedIngredient>({
    accept: IngredientDragType.ORDER_INGREDIENT,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const { index: draggedIndex } = item;

      if (draggedIndex === index) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (draggedIndex < index && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (draggedIndex > index && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(changeOrder({ currentIndex: draggedIndex, nextIndex: index }));
      item.index = index;
    },
  });

  const handleDelete = useCallback(() => {
    dispatch(removeIngredient(index));
  }, [dispatch, index]);

  dragRef(dropRef(ref));

  return (
    <li
      data-cy="element"
      className={classes.element}
      draggable
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={`${classes.icon} ${classes.dragable}`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        handleClose={handleDelete}
        text={name}
        price={price}
        thumbnail={image_mobile}
      />
    </li>
  );
});
