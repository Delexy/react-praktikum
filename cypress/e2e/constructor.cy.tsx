import type {} from "cypress";

describe("Конструктор", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients",
    });
    cy.intercept("https://norma.nomoreparties.space/api/auth/user", {
      fixture: "user",
    });
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "success-order",
    });
  });

  it("Перетаскивание ингредиента в конструктор и оформление заказа", () => {
    const dataTransfer = new DataTransfer();
    cy.get('[data-cy="ingredient"]')
      .first()
      .trigger("dragstart", { dataTransfer });

    cy.get("[data-cy='drop-area']").trigger("drop", { dataTransfer });

    dataTransfer.clearData();

    cy.get('[data-cy="ingredient"]').eq(2).as("ingredient");

    cy.get("@ingredient").trigger("dragstart", { dataTransfer });

    cy.get("[data-cy='drop-area']").trigger("drop", { dataTransfer });

    dataTransfer.clearData();

    cy.get("@ingredient").trigger("dragstart", { dataTransfer });

    cy.get("[data-cy='drop-area']").trigger("drop", { dataTransfer });

    cy.get("[data-cy='element']").first().contains("Соус");
    cy.get("[data-cy='element']").eq(1).contains("Соус");

    cy.get(".constructor-element").first().contains("Краторная булка");
    cy.get(".constructor-element").last().contains("Краторная булка");

    cy.get('[data-cy="button-send-order"]').click();

    cy.get("#modals-container").as("modals");

    cy.get("@modals").contains("111111");
    cy.get("@modals").contains("Ваш заказ начали готовить");
  });
});
