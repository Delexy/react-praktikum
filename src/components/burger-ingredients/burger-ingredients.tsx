import { FC, memo, useCallback, useMemo, useRef, useState } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { Category } from "./components";

import classes from "./burger-ingredients.module.css";
import { IngredientType } from "@projectTypes/IngredientTypes";
import { IngredientDetails } from "@components/ingredient-details";
import { Modal } from "@components/modal";
import { useGetIngredientsQuery } from "@services/normaApi";
import { useAppDispatch } from "@hooks/typedHooks";
import {
  clearIngredient,
  selectIngredient,
} from "@services/currentIngredientSlice";
import { useSelector } from "react-redux";

interface Props {}

enum Tabs {
  BUNS = "buns",
  SAUCES = "sauces",
  FILLINGS = "fillings",
}

export const BurgerIngredients: FC<Props> = memo(() => {
  const dispatch = useAppDispatch();
  const detailIngredient = useSelector(selectIngredient);
  const { ingredients, isError, isLoading, isSuccess } = useGetIngredientsQuery(
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

  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.BUNS);

  const bunIngredients = useMemo(
    () => ingredients.filter((item) => item.type === IngredientType.BUN),
    [ingredients]
  );
  const mainIngredients = useMemo(
    () => ingredients.filter((item) => item.type === IngredientType.MAIN),
    [ingredients]
  );
  const sauceIngredients = useMemo(
    () => ingredients.filter((item) => item.type === IngredientType.SAUCE),
    [ingredients]
  );

  const handleCloseModal = useCallback(() => {
    dispatch(clearIngredient());
  }, [dispatch]);

  const bunRef = useRef<HTMLDivElement>(null);
  const fillingRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleChangeTab = useCallback((value: string) => {
    switch (value) {
      case Tabs.BUNS: {
        bunRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
        break;
      }
      case Tabs.SAUCES: {
        sauceRef.current?.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
        break;
      }
      case Tabs.FILLINGS: {
        fillingRef.current?.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
        break;
      }
    }
  }, []);

  const handleScroll = () => {
    const lineY = scrollRef.current?.getBoundingClientRect().y;
    const bunOffset = Math.abs(
      bunRef.current!.getBoundingClientRect().y - (lineY as number)
    );
    const sauceOffset = Math.abs(
      sauceRef.current!.getBoundingClientRect().y - (lineY as number)
    );
    const fillingOffset = Math.abs(
      fillingRef.current!.getBoundingClientRect().y - (lineY as number)
    );

    if (bunOffset < sauceOffset && bunOffset < fillingOffset)
      setCurrentTab(Tabs.BUNS);
    if (sauceOffset < bunOffset && sauceOffset < fillingOffset)
      setCurrentTab(Tabs.SAUCES);
    if (fillingOffset < bunOffset && fillingOffset < sauceOffset)
      setCurrentTab(Tabs.FILLINGS);
  };

  if (isLoading || !isSuccess) {
    return (
      <section className={`pt-10 ${classes.layout}`}>
        <p className="text_type_main-large pt-1">Загружаемся</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={`pt-10 ${classes.layout}`}>
        <p className="text text_type_main-large">
          Произошла ошибочка, попробуйте позже
        </p>
      </section>
    );
  }

  return (
    <>
      <section className={`pt-10 ${classes.layout}`}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>

        <div className={`pt-5 ${classes.flex}`}>
          <Tab
            value={Tabs.BUNS}
            active={currentTab === Tabs.BUNS}
            onClick={handleChangeTab}
          >
            Булки
          </Tab>
          <Tab
            value={Tabs.SAUCES}
            active={currentTab === Tabs.SAUCES}
            onClick={handleChangeTab}
          >
            Соусы
          </Tab>
          <Tab
            value={Tabs.FILLINGS}
            active={currentTab === Tabs.FILLINGS}
            onClick={handleChangeTab}
          >
            Начинки
          </Tab>
        </div>
        <div
          className={`mt-10 mb-10 ${classes.categories}`}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <Category title="Булки" ingredients={bunIngredients} ref={bunRef} />

          <Category
            title="Соусы"
            ingredients={sauceIngredients}
            ref={sauceRef}
          />

          <Category
            title="Начинки"
            ingredients={mainIngredients}
            ref={fillingRef}
          />
        </div>
      </section>

      {Boolean(detailIngredient) && (
        <Modal closePopup={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
});
