import { ROUTES } from "@utils/constants";
import { Link, useLocation, useMatch } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DetailedOrder } from "@projectTypes/apiResponses";

import classes from "./order-feed-element.module.css";
import { IngredientImageList } from "./components";
import { OrderStatuses } from "@projectTypes/orderTypes";
import { useOrderIngredients } from "@hooks/useOrderIngredients";

export const OrderFeedElement = ({ order }: { order: DetailedOrder }) => {
  const location = useLocation();
  const isProfilePage = useMatch(ROUTES.Orders);
  const { orderIngredients, orderSum } = useOrderIngredients({
    ingredientsIds: order.ingredients,
  });

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
        <p
          className={`text text_type_main-default ${
            order?.status === "done"
              ? "text_color_success"
              : "text_color_primary"
          }`}
        >
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
