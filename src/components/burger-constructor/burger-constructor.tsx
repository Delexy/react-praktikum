import { memo } from "react";
import { Element } from "./components";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import classes from "./burger-constructor.module.css";

export const BurgerConstructor = memo(() => {
  return (
    <section className={`pt-25 pb-10 ${classes.layout}`}>
      <Element
        isDragable={false}
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail="https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png"
      />
      <ul className={`mt-2 mb-2 ${classes.list}`}>
        <Element
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail="https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png"
        />
        <Element
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail="https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png"
        />
        <Element
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail="https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png"
        />
        <Element
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail="https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png"
        />
        <Element
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail="https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png"
        />
        <Element
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail="https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png"
        />
        <Element
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail="https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png"
        />
      </ul>

      <Element
        isDragable={false}
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail="https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png"
      />
      <div className={`mt-10 ${classes.footer}`}>
        <p className={`mt-1 mb-1 text_type_digits-default ${classes.price}`}>
          610 <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="submit">Оформить заказ</Button>
      </div>
    </section>
  );
});
