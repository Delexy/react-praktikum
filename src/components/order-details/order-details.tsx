import { FC, memo } from "react";

import doneImg from "@images/done.png";
import classes from "./order-details.module.css";

interface Props {}

export const OrderDetails: FC<Props> = memo(() => {
  return (
    <div className={classes.layout + " pt-30  pb-30 pr-25 pl-25"}>
      <h3 className={classes.orderNumber + " text text_type_digits-large mb-8"}>
        034536
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
