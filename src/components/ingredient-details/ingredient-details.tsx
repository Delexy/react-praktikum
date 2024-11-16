import { FC, memo } from "react";

import { Image } from "@components/image";

import classes from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { IngredientParams } from "@projectTypes/router";
import { useGetIngredientsQuery } from "@services/normaApi";

interface Props {}

export const IngredientDetails: FC<Props> = memo(() => {
  const { ingredientId } = useParams<IngredientParams>();
  const { ingredients, isError, isLoading } = useGetIngredientsQuery(
    undefined,
    {
      selectFromResult: (initialState) => ({
        ...initialState,
        ingredients: initialState.data?.data ?? [],
        isError:
          initialState.isError ||
          (!initialState.data?.success && initialState.isSuccess),
      }),
    }
  );

  const detailIngredient = ingredients.find(
    (item) => item._id === ingredientId
  );

  if (isError) {
    return <p>Ошибочка, попробуйте позже</p>;
  }

  return (
    <div className={`pt-10 pl-10 pr-10 pb-15 ${classes.layout}`}>
      <h3 className="text text_type_main-medium">Детали ингредиента</h3>
      {isLoading ? (
        <p>Загрузка</p>
      ) : (
        <>
          <div className={`mb-4 ${classes.image}`}>
            <Image
              src={detailIngredient?.image_large}
              alt={detailIngredient?.name}
            />
          </div>
          <h4 className={"mb-8 text text_type_main-medium"}>
            {detailIngredient?.name}
          </h4>
          <ul className={`text_color_inactive ${classes.list}`}>
            <li>
              <span className={"text text_type_main-default"}>
                Калории,ккал
              </span>
              <span className="text text_type_digits-default">
                {detailIngredient?.calories}
              </span>
            </li>
            <li>
              <span className={"text text_type_main-default"}>Белки,г</span>
              <span className="text text_type_digits-default">
                {detailIngredient?.proteins}
              </span>
            </li>
            <li>
              <span className={"text text_type_main-default"}>Жиры,г</span>
              <span className="text text_type_digits-default">
                {detailIngredient?.fat}
              </span>
            </li>
            <li>
              <span className={"text text_type_main-default"}>Углеводы,г</span>
              <span className="text text_type_digits-default">
                {detailIngredient?.carbohydrates}
              </span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
});
