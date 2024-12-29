import { useGetWSOrdersQuery } from "@services/normaApi";
import { OrderFeedElement } from "@components/order-feed-element";
import { useMemo } from "react";

import classes from "./feed.module.css";
import { WS_API_ORDERS_ALL_PATH } from "@utils/constants";

interface OrderStatuses {
  doneList: number[];
  preparingList: number[];
}

export const FeedPage = () => {
  const { data } = useGetWSOrdersQuery(WS_API_ORDERS_ALL_PATH);

  const { doneList = [], preparingList = [] } = useMemo(
    () =>
      data?.orders
        ? data?.orders.reduce<OrderStatuses>(
            (count, element) => {
              switch (element.status) {
                case "done":
                  count.doneList.push(element.number);
                  break;
                case "pending":
                  count.preparingList.push(element.number);
                  break;
              }
              return count;
            },
            { doneList: [], preparingList: [] }
          )
        : { doneList: [], preparingList: [] },
    [data?.orders]
  );

  if (!data || (data && data.success === undefined)) {
    return <p>Загрузка</p>;
  }

  if (!data.success) {
    return <p>Ошибка, попробуйте позже</p>;
  }

  return (
    <>
      <div className={classes.content}>
        <h2 className={"text text_type_main-large mb-5"}>Лента заказов</h2>
        <div className={classes.container}>
          <div className={classes.list}>
            {data.orders.map((order) => {
              return <OrderFeedElement key={order._id} order={order} />;
            })}
          </div>
          <div className={classes.feedTotal}>
            <div className={`mb-15 ${classes.feedLists}`}>
              <div className={classes.feedList}>
                <h4 className="text text_type_main-medium mb-6">Готовы:</h4>
                <ul className={classes.feedListElements}>
                  {doneList.slice(0, 5).map((item, index) => {
                    return (
                      <li
                        className={
                          "text text_type_digits-default text_color_success"
                        }
                        key={index}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={classes.feedList}>
                <h4 className="text text_type_main-medium mb-6">В работе:</h4>
                <ul className={classes.feedListElements}>
                  {preparingList.slice(0, 5).map((item, index) => {
                    return (
                      <li
                        className={"text text_type_digits-default"}
                        key={index}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text text_type_main-medium">
                Выполнено за всё время:
              </h3>
              <span className={`text text_type_digits-large ${classes.digits}`}>
                {data.total}
              </span>
            </div>
            <div>
              <h3 className="text text_type_main-medium">
                Выполнено за сегодня:
              </h3>
              <span className={`text text_type_digits-large ${classes.digits}`}>
                {data.totalToday}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
