import { useOrder } from "@hooks/useOrder";
import { OrderParams } from "@projectTypes/router";
import { useParams } from "react-router";

import classes from "./feed-order-details.module.css";
import { OrderStatuses } from "@projectTypes/orderTypes";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useOrderIngredients } from "@hooks/useOrderIngredients";
import { Ingredient } from "./components";

export const FeedOrderDetails = () => {
  const { orderId = "" } = useParams<OrderParams>();

  const { orderData: order, isLoading } = useOrder({ id: orderId });
  const { orderIngredients, orderSum, orderIngredientsAmount } =
    useOrderIngredients({
      ingredientsIds: order?.ingredients ?? [],
    });

  if (isLoading) {
    return <p className={`${classes.wrapper} pt-10`}>Загрузка</p>;
  }

  if (!order) {
    return <p className={`${classes.wrapper} pt-10`}>Заказ не найден</p>;
  }

  return (
    <div className={`${classes.wrapper} p-10`}>
      <div className={classes.header}>
        <p
          className={`text text_type_digits-default mb-10 ${classes.number}`}
        >{`#${order?.number}`}</p>
        <p className="text text_type_main-medium mb-2">{`${order?.name}`}</p>

        <p
          className={`text text_type_main-default ${
            order?.status === "done"
              ? "text_color_success"
              : "text_color_primary"
          }`}
        >
          {OrderStatuses[order?.status ?? "empty"]}
        </p>
      </div>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`${classes.list} pr-4`}>
        {orderIngredients.map((ingredient) => (
          <Ingredient
            {...ingredient}
            amount={orderIngredientsAmount[ingredient._id]}
          />
        ))}
      </ul>
      <div className={`${classes.footer} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order?.createdAt ?? "")} />
        </p>
        <div className={classes.price}>
          <CurrencyIcon type="primary" />
          <p className="text text_type_digits-default">{orderSum}</p>
        </div>
      </div>
    </div>
  );
};
