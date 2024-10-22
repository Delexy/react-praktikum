import { FC, memo } from "react";

import doneImg from "@images/done.png";
import classes from "./order-details.module.css";
import { useCreateOrderMutation } from "@services/normaApi/normaApi";

interface Props {}

export const OrderDetails: FC<Props> = memo(() => {
  const [, { data: orderDetails, isLoading, isError }] = useCreateOrderMutation(
    {
      fixedCacheKey: "create-order",
    }
  );

  if (isLoading) {
    return (
      <div className={classes.layout + " pt-30  pb-30 pr-25 pl-25"}>
        <p className="text text_type_main-medium mb-15">Отправляем ваш заказ</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={classes.centeredText + " pt-30  pb-30 pr-25 pl-25"}>
        <p className={"text text_type_main-medium mb-15"}>
          При отправке заказа, произошла ошибка. Попробуйте позже
        </p>
      </div>
    );
  }

  return (
    <div className={classes.layout + " pt-30  pb-30 pr-25 pl-25"}>
      <h3 className={classes.orderNumber + " text text_type_digits-large mb-8"}>
        {orderDetails?.order.number}
      </h3>
      <p className="text text_type_main-medium mb-15">Идентификатор заказа</p>
      <img src={doneImg} alt="Ready icon" className={`${classes.icon} mb-15`} />
      <p className={"text text_type_main-default mb-2 " + classes.centeredText}>
        Ваш заказ начали готовить
      </p>
      <p
        className={
          "text text_type_main-default text_color_inactive " +
          classes.centeredText
        }
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
});
