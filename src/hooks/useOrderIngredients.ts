import { useGetIngredientsQuery } from "@services/normaApi";
import { useMemo } from "react";

export const useOrderIngredients = ({
  ingredientsIds,
}: {
  ingredientsIds: string[];
}) => {
  const { ingredients } = useGetIngredientsQuery(undefined, {
    selectFromResult: (initialState) => ({
      ...initialState,
      ingredients: initialState.data?.data ?? [],
      isError:
        initialState.isError ||
        (!initialState.data?.success && initialState.isSuccess),
    }),
  });
  const orderIngredientsAmount = useMemo(
    () =>
      ingredientsIds.reduce((map, ingredient) => {
        if (map[ingredient]) {
          map[ingredient] += 1;
        } else {
          map[ingredient] = 1;
        }

        return map;
      }, {} as Record<string, number>),
    [ingredientsIds]
  );
  const orderIngredients = useMemo(
    () =>
      ingredients.filter((ingredient) =>
        ingredientsIds.includes(ingredient._id)
      ),
    [ingredients, ingredientsIds]
  );
  const orderSum = useMemo(() => {
    return orderIngredients.reduce(
      (sum, ingredient) =>
        (sum += ingredient.price * orderIngredientsAmount[ingredient._id]),
      0
    );
  }, [orderIngredients, orderIngredientsAmount]);

  return { orderIngredients, orderSum, orderIngredientsAmount };
};
