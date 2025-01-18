import { describe, it, expect, vi } from "vitest";
import {
  constructorItemsSlice,
  addIngredient,
  removeIngredient,
  changeOrder,
  clearIngredients,
  selectConstructorItems,
  selectBun,
  selectTotalPrice,
} from "./constructorItemsSlice";

const reducer = constructorItemsSlice.reducer;

// Mock nanoid to return predictable IDs for testing
vi.mock("@reduxjs/toolkit", async () => {
  const actual = await vi.importActual("@reduxjs/toolkit");
  return {
    ...actual,
    nanoid: vi.fn(() => "test-unique-id"),
  };
});

describe("constructorItems slice", () => {
  const initialState = {
    bun: undefined,
    ingredients: [],
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle addIngredient for a non-bun", () => {
    const previousState = { ...initialState };
    const ingredient = {
      name: "Lettuce",
      type: "veggie",
      price: 1,
      uniqId: "test-unique-id",
    };
    const action = addIngredient({ name: "Lettuce", type: "veggie", price: 1 });

    expect(reducer(previousState, action)).toEqual({
      bun: undefined,
      ingredients: [ingredient],
    });
  });

  it("should handle addIngredient for a bun", () => {
    const previousState = { ...initialState };
    const ingredient = {
      name: "Bun",
      type: "bun",
      price: 2,
      uniqId: "test-unique-id",
    };
    const action = addIngredient({
      name: "Bun",
      type: "bun",
      price: 2,
    });

    expect(reducer(previousState, action)).toEqual({
      bun: ingredient,
      ingredients: [],
    });
  });

  it("should handle removeIngredient", () => {
    const previousState = {
      bun: undefined,
      ingredients: [
        { name: "Lettuce", type: "veggie", price: 1, uniqId: "id-1" },
        { name: "Tomato", type: "veggie", price: 1.5, uniqId: "id-2" },
      ],
    };

    const action = removeIngredient(0);
    expect(reducer(previousState, action)).toEqual({
      bun: undefined,
      ingredients: [
        { name: "Tomato", type: "veggie", price: 1.5, uniqId: "id-2" },
      ],
    });
  });

  it("should handle changeOrder", () => {
    const previousState = {
      bun: undefined,
      ingredients: [
        { name: "Lettuce", type: "veggie", price: 1, uniqId: "id-1" },
        { name: "Tomato", type: "veggie", price: 1.5, uniqId: "id-2" },
      ],
    };

    const action = changeOrder({ currentIndex: 0, nextIndex: 1 });
    expect(reducer(previousState, action)).toEqual({
      bun: undefined,
      ingredients: [
        { name: "Tomato", type: "veggie", price: 1.5, uniqId: "id-2" },
        { name: "Lettuce", type: "veggie", price: 1, uniqId: "id-1" },
      ],
    });
  });

  it("should handle clearIngredients", () => {
    const previousState = {
      bun: {
        name: "Bun",
        type: "bun",
        price: 2,
        uniqId: "id-bun",
      },
      ingredients: [
        { name: "Lettuce", type: "veggie", price: 1, uniqId: "id-1" },
      ],
    };

    expect(reducer(previousState, clearIngredients())).toEqual(initialState);
  });

  it("should select constructor items", () => {
    const mockState = {
      constructorItems: {
        ...initialState,
        ingredients: [
          { name: "Lettuce", type: "veggie", price: 1, uniqId: "id-1" },
        ],
      },
    };

    expect(selectConstructorItems(mockState)).toEqual(
      mockState.constructorItems.ingredients
    );
  });

  it("should select bun", () => {
    const mockState = {
      constructorItems: {
        ...initialState,
        bun: {
          name: "Bun",
          type: "bun",
          price: 2,
          uniqId: "id-bun",
        },
      },
    };

    expect(selectBun(mockState)).toEqual(mockState.constructorItems.bun);
  });

  it("should select total price", () => {
    const mockState = {
      constructorItems: {
        ...initialState,
        bun: {
          name: "Bun",
          type: "bun",
          price: 2,
          uniqId: "id-bun",
        },
        ingredients: [
          { name: "Lettuce", type: "veggie", price: 1, uniqId: "id-1" },
          { name: "Tomato", type: "veggie", price: 1.5, uniqId: "id-2" },
        ],
      },
    };

    // Buns' price is doubled: 2 * 2 = 4
    // Ingredients total: 1 + 1.5 = 2.5
    // Total price = 4 + 2.5 = 6.5
    expect(selectTotalPrice(mockState)).toEqual(6.5);
  });
});
