import { FC } from "react";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface Props {}

export const Ingredient: FC<Props> = () => {
  return (
    <li
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Counter count={5} />
      <div className="pl-4 pr-4 mb-1">
        <img src="https://code.s3.yandex.net/react/code/bun-02.png" />
      </div>
      <p className="text_type_main-medium mb-1 mt-1">
        20 <CurrencyIcon type="primary" />
      </p>
      <p className="text_type_main-default mt-1 mb-1">Краторная булка N-200i</p>
    </li>
  );
};
