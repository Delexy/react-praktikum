import { OrderFeedElement } from "@components/order-feed-element";
import { useGetWSOrdersQuery } from "@services/normaApi";
import { WS_API_ORDERS_PATH } from "@utils/constants";
import { Token } from "@utils/token";

import classes from "./order.module.css";
import { useMemo } from "react";

export const Orders = () => {
  const { data } = useGetWSOrdersQuery(
    `${WS_API_ORDERS_PATH}?token=${Token.get().replace("Bearer ", "")}`
  );

  const orders = useMemo(
    () => (data?.orders ? [...data.orders].reverse() : []),
    [data?.orders]
  );

  if (data && data.success === undefined) {
    return <p>Загрузка</p>;
  }

  return (
    <div className={classes.wrapper}>
      {orders.map((order) => {
        return <OrderFeedElement order={order} key={order._id} />;
      })}
    </div>
  );
};
