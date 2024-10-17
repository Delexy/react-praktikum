import { memo, useCallback, useState } from "react";
import { Element } from "./components";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Modal } from "@components/modal";
import { OrderDetails } from "@components/order-details";
import { IngredientInterface } from "@projectTypes/IngredientTypes";

import classes from "./burger-constructor.module.css";

const orderElements: Pick<
  IngredientInterface,
  "_id" | "image_mobile" | "name" | "price"
>[] = [
  {
    _id: "1",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    name: "Биокотлета из марсианской Магнолии",
    price: 424,
  },
  {
    _id: "2",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    name: "Филе Люминесцентного тетраодонтимформа",
    price: 988,
  },
  {
    _id: "3",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    name: "Биокотлета из марсианской Магнолии",
    price: 424,
  },
];

export const BurgerConstructor = memo(() => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModalHandler = useCallback(() => {
    setModalIsOpen(true);
  }, [setModalIsOpen]);

  const closeModalHandler = useCallback(() => {
    setModalIsOpen(false);
  }, [setModalIsOpen]);

  return (
    <>
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
          {orderElements.map((element) => (
            <Element
              key={element._id}
              text={element.name}
              price={element.price}
              thumbnail={element.image_mobile}
            />
          ))}
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
          <Button htmlType="submit" onClick={openModalHandler}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {modalIsOpen && (
        <Modal closePopup={closeModalHandler}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
});
