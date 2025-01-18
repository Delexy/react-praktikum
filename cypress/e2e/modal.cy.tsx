import type {} from "cypress";

describe("Модальные окна", () => {
  it("Открытие/Закрытие модального окна с описанием игредиента и проверка что данные появились", () => {
    cy.visit("/");

    cy.get('[data-cy="ingredient"]').first().click();

    cy.get("#modals-container").as("modals");

    cy.get("@modals").contains("Краторная булка");
    cy.get("@modals").contains("Калории,ккал");
    cy.get("@modals").contains("420");

    cy.get('[data-cy="modal-close-btn"]').click();

    cy.get("@modals").should("not.contain.text", "Краторная булка");
  });

  it("Открытие/Закрытие модального окна (заркытие при клике на backdrop)", () => {
    cy.visit("/");

    cy.get('[data-cy="ingredient"]').first().click();

    cy.get("#modals-container").as("modals");

    cy.get("@modals").contains("Краторная булка");

    cy.get("#modals-container > [class*=overlay]").click({
      force: true,
    });

    cy.get("@modals").should("not.contain.text", "Краторная булка");
  });
});
