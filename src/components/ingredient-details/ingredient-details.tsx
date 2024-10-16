import { FC, memo } from "react";

import { Modal, ModalProps } from "@components/modal";
import { IngredientInterface } from "@projectTypes/IngredientTypes";
import { Image } from "@components/image";

import classes from "./ingredient-details.module.css";

interface Props extends ModalProps {
  ingredient?: IngredientInterface;
}

export const IngredientDetails: FC<Props> = memo(
  ({ closePopup, ingredient }) => {
    return (
      <Modal closePopup={closePopup}>
        <div className={`pt-10 pl-10 pr-10 pb-15 ${classes.layout}`}>
          <h3 className="text text_type_main-medium">Детали ингредиента</h3>
          <div className={`mb-4 ${classes.image}`}>
            <Image src={ingredient?.image_large} alt={ingredient?.name} />
          </div>
          <h4 className={"mb-8 text text_type_main-medium"}>
            {ingredient?.name}
          </h4>
          <ul className={`text_color_inactive ${classes.list}`}>
            <li>
              <span className={"text text_type_main-default"}>
                Калории,ккал
              </span>
              <span className="text text_type_digits-default">
                {ingredient?.calories}
              </span>
            </li>
            <li>
              <span className={"text text_type_main-default"}>Белки,г</span>
              <span className="text text_type_digits-default">
                {ingredient?.proteins}
              </span>
            </li>
            <li>
              <span className={"text text_type_main-default"}>Жиры,г</span>
              <span className="text text_type_digits-default">
                {ingredient?.fat}
              </span>
            </li>
            <li>
              <span className={"text text_type_main-default"}>Углеводы,г</span>
              <span className="text text_type_digits-default">
                {ingredient?.carbohydrates}
              </span>
            </li>
          </ul>
        </div>
      </Modal>
    );
  }
);
