import { ROUTES } from "@utils/constants";
import { Link, useLocation, useMatch } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DetailedOrder } from "@projectTypes/apiResponses";

import classes from "./order-feed-element.module.css";
import { IngredientImageList } from "./components";
import { useGetIngredientsQuery } from "@services/normaApi";
import { useMemo } from "react";

enum OrderStatuses {
  "created" = "Создан",
  "pending" = "Готовится",
  "done" = "Готов",
}

export const OrderFeedElement = ({ order }: { order: DetailedOrder }) => {
  const location = useLocation();
  const isProfilePage = useMatch(ROUTES.Orders);
  const { ingredients } = useGetIngredientsQuery(undefined, {
    selectFromResult: (initialState) => ({
      ...initialState,
      ingredients: initialState.data?.data ?? [],
      isError:
        initialState.isError ||
        (!initialState.data?.success && initialState.isSuccess),
    }),
  });
  const orderIngredients = useMemo(
    () =>
      ingredients.filter((ingredient) =>
        order.ingredients.includes(ingredient._id)
      ),
    [ingredients, order.ingredients]
  );
  const orderSum = useMemo(() => {
    return orderIngredients.reduce(
      (sum, ingredient) => (sum += ingredient.price),
      0
    );
  }, [orderIngredients]);

  return (
    <Link
      className={classes.link}
      to={
        isProfilePage
          ? `${ROUTES.Orders}/${order._id}`
          : `${ROUTES.Feed}/${order._id}`
      }
      state={{ backgroundLocation: location }}
    >
      <div className={`${classes.flex} mb-6`}>
        <p className={"text text_type_digits-default"}>#{order.number}</p>
        <p className={"text text_color_inactive text_type_main-default "}>
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <h3 className={"text text_type_main-medium"}>{order.name}</h3>
      {Boolean(isProfilePage) && (
        <p className="text text_type_main-default status">
          {OrderStatuses[order.status]}
        </p>
      )}
      <div className={`${classes.flex} mt-6`}>
        <IngredientImageList ingredients={orderIngredients} />
        <span className={`text text_type_digits-default ${classes.price}`}>
          {orderSum}
          {<CurrencyIcon type="primary" />}
        </span>
      </div>
    </Link>
  );
};
