import { useGetOrderQuery, useGetWSOrdersQuery } from "@services/normaApi";
import { WS_API_ORDERS_ALL_PATH } from "@utils/constants";

export const useOrder = ({ id }: { id: string }) => {
  const { data: wsOrders } = useGetWSOrdersQuery(WS_API_ORDERS_ALL_PATH);
  const wsOrder = wsOrders?.orders.find((order) => order._id === id);

  const { data, isLoading } = useGetOrderQuery(id);

  const orderData = wsOrder ?? data?.orders[0];

  return {
    orderData,
    isLoading,
  };
};
