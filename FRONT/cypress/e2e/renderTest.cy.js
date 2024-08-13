/* eslint-disable cypress/no-unnecessary-waiting */
import getCompleteDate from "../../src/Services/completeDate";

const username = "test";
const email = "test@test.es";
const password = "test";
const sex = "Female";
const weight = 65;
const height = 160;
const activity = "I make exercise 6 or more days of the week";
const updatedEmail = "updatedTest@test.com";
let token;
const front_URL = "http://localhost:5173/";

Cypress.Commands.add("clearDBAndLocalStorage", () => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
  cy.request("POST", "http://localhost:5005/cleardb_test")
    .its("status")
    .should("eq", 200);
});

Cypress.Commands.add("login", (email, password) => {
  cy.contains("Log In").click();
  cy.get('[data-cy="login-email"]').type(email);
  cy.get('[data-cy="login-password"]').type(password);
  cy.get(".button").contains("Login").click();
  cy.contains("Welcome").should("be.visible");
});

before(() => {
  cy.clearDBAndLocalStorage();
});

describe("Trackalories App", function () {
  beforeEach(() => {
    cy.visit(front_URL);
  });

  it("front page can be opened", function () {
    cy.contains("TrackAlories");
    cy.contains("Register").click();
  });

  it("can register a user", function () {
    cy.contains("Register").click();
    cy.get('[data-cy="register-username"]').type(username);
    cy.get('[data-cy="register-email"]').type(email);
    cy.get('[data-cy="register-password"]').type(password);
    cy.get('[data-cy="register-birthdate"]').type("2000-09-18");
    cy.get('[data-cy="register-sex"]').select(sex);
    cy.get('[data-cy="register-weight"]').type(weight);
    cy.get('[data-cy="register-height"]').type(height);
    cy.get('[data-cy="register-activity"]').select(activity);
    cy.get('[data-cy="register-checkbox"]').click();
    cy.get('[data-cy="register-button"]').contains("Register").click();
    cy.contains("OK").should("be.visible");
  });

  it("Cannot login a user with wrong credentials", () => {
    cy.contains("Log In").click();
    cy.get('[data-cy="login-email"]').type("wrong@email.com");
    cy.get('[data-cy="login-password"]').type("wrong");
    cy.get("button").contains("Login").click();
    cy.contains("Not Found").should("be.visible");
  });

  it("can login", function () {
    cy.login(email, password);
  });

  it("Can save the token locally", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5005/api/login",
      body: { email, password },
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    }).then((res) => {
      token = res.body.token;
      cy.window().then((win) => {
        win.localStorage.setItem("loggedUser", token);
      });
    });
  });

  it("can search food", function () {
    cy.window().then((win) => {
      win.localStorage.setItem("loggedUser", token);
    });
    cy.visit(front_URL);
    cy.get(".fa-solid.fa-search").click();
    cy.get('[data-cy="search-bar"]').type("duck{enter}");
    cy.contains("140 grams of duck").should("be.visible");

    cy.get(".button-add").click();
    cy.get('[data-cy="search-bar"]').type("beer{enter}");
    cy.contains("356 grams of beer").should("be.visible");

    cy.get(".button-add").click();
    cy.contains("624.88 Kcal");
    cy.contains("Save in the diary").click();
    cy.on("window:confirm", () => true);
  });

  it("can see the searched food", function () {
    const date = getCompleteDate();
    cy.window().then((win) => {
      win.localStorage.setItem("loggedUser", token);
    });
    cy.visit(front_URL);
    cy.get("a.icon-text i.fa-solid.fa-book-open").click();
    cy.get(".dropdown-trigger").contains(date).click();
  });

  it("can interact with the weight component", function () {
    cy.window().then((win) => {
      win.localStorage.setItem("loggedUser", token);
    });

    cy.get("i.fa-solid.fa-weight-scale").click();
    cy.contains("The chart only works with 2 or more data points").should(
      "be.visible"
    );
    cy.intercept("POST", "/api/weight").as("postPeso");
    cy.get("input.input.is-responsive").type(70);
    cy.contains("Save").click();

    cy.wait("@postPeso").then((interception) => {
      console.log("Response Status Code:", interception.response.statusCode);

      expect(interception.response.statusCode).to.eq(400);
      expect(interception.response.body.error).to.eq(
        "Only one weight post per day"
      );
    });
  });

  it("can update the email profile", function () {
    cy.window().then((win) => {
      win.localStorage.setItem("loggedUser", token);
    });
    cy.visit(front_URL);
    cy.contains(username).click();
    cy.get('[data-cy="update-email"]').type(updatedEmail);
    cy.get('[data-cy="update-activity"]').select(
      "I make exercise 2 days of the week"
    );
    cy.get('[data-cy="update-button"]').contains("Update Profile Info").click();
    cy.contains("OK").should("be.visible");
  });

  it("can eliminate the profile", function () {
    cy.visit(front_URL);
    cy.login(updatedEmail, password);
    cy.contains(username).click();
    cy.get('[data-cy="delete-profile"]').click({ multiple: true });
    cy.on("window:confirm", (text) => {
      expect(text).to.contains(
        "You're going to eliminate all the information of your profile. This action is irreversible. Want to continue?"
      );
    });
  });
});
