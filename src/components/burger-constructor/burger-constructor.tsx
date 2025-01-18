import { memo, useCallback, useMemo, useState } from "react";
import { Element } from "./components";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Modal } from "@components/modal";
import { OrderDetails } from "@components/order-details";

import classes from "./burger-constructor.module.css";
import {
  addIngredient,
  clearIngredients,
  selectBun,
  selectConstructorItems,
  selectTotalPrice,
} from "@services/constructorItemsSlice";
import { useCreateOrderMutation } from "@services/normaApi/normaApi";
import { useDrop } from "react-dnd";
import {
  IngredientDragType,
  IngredientInterface,
} from "@projectTypes/IngredientTypes";
import { useGetUserQuery } from "@services/authApi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@utils/constants";
import { useAppDispatch, useAppSelector } from "@hooks/typedHooks";

const bunImagePlaceholder =
  "https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png";

export const BurgerConstructor = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading: userIsLoading, data: userData } = useGetUserQuery();

  const [createOrder] = useCreateOrderMutation({
    fixedCacheKey: "create-order",
  });

  const isAuthed = Boolean(userData?.user);

  const [{ isOver, canDrop }, constructorDropRef] = useDrop({
    accept: IngredientDragType.INGREDIENT,
    drop: (ingredient: IngredientInterface) => {
      dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const constructorItems = useAppSelector(selectConstructorItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const bunItem = useAppSelector(selectBun);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCreateOrder = useCallback(() => {
    if (!isAuthed) {
      return navigate(ROUTES.Login);
    }

    setModalIsOpen(true);

    const ingredientsIds = constructorItems.map((ingredient) => ingredient._id);
    const bunId = bunItem?._id;

    if (bunId) {
      ingredientsIds.unshift(bunId);
      ingredientsIds.push(bunId);
    }

    createOrder({
      ingredients: ingredientsIds,
    }).then(() => dispatch(clearIngredients()));
  }, [constructorItems, bunItem?._id, createOrder, dispatch]);

  const closeModalHandler = useCallback(() => {
    setModalIsOpen(false);
  }, [setModalIsOpen]);

  const bunElementProps = useMemo(
    () => ({
      extraClass: classes.bunItem,
      isLocked: true,
      text: bunItem?.name ?? "Добавьте булку",
      price: bunItem?.price ?? 0,
      thumbnail: bunItem?.image_mobile ?? bunImagePlaceholder,
    }),
    [bunItem]
  );

  return (
    <>
      <section
        className={`pt-25 pb-10 ${classes.layout} ${classes.dropSection} ${
          canDrop && classes.canDrop
        } ${isOver && classes.dropOver}`}
        data-cy="drop-area"
        ref={constructorDropRef}
      >
        <ConstructorElement {...bunElementProps} type="top" />
        <ul className={`mt-2 mb-2 ${classes.list}`}>
          {constructorItems.map((element, idx) => (
            <Element key={element.uniqId} ingredient={element} index={idx} />
          ))}
        </ul>
        <ConstructorElement {...bunElementProps} type="bottom" />
        <div className={`mt-10 ${classes.footer}`}>
          <p className={`mt-1 mb-1 text_type_digits-default ${classes.price}`}>
            {totalPrice} <CurrencyIcon type="primary" />
          </p>
          <Button
            data-cy="button-send-order"
            htmlType="submit"
            onClick={handleCreateOrder}
            disabled={
              !bunItem || constructorItems.length === 0 || userIsLoading
            }
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {modalIsOpen && (
        <Modal closePopup={closeModalHandler}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
});
