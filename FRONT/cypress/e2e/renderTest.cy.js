/// <reference types="cypress" />
/* eslint-disable cypress/no-unnecessary-waiting */
import getCompleteDate from "../../src/Services/completeDate"
const username = "test"
const email = "test@test.es"
const password = "test"
const sex = "Female"
const weight = 65
const height = 160
const activity = "I make exercise 6 or more days of the week"
const updatedEmail = "updatedTest@test.com"

let token

before(() => {
  describe("Clean DB and LocalTokens", function () {
    window.localStorage.clear()
    cy.request({
      method: "POST",
      url: "http://localhost:5005/cleardb_test",
    }).then((res) => {
      expect(res.status).equal(200)
      expect(res.body.message).contains("Cleaned")
    })
  })
})

describe("Trackalories App", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3000")
    cy.contains("TrackAlories")
    cy.contains("Register").click()
  })
})

describe("Register and Login", function () {
  it("can register a user", function () {
    cy.visit("http://localhost:3000")
    cy.contains("Register").click()
    cy.get('[data-cy="register-username"]').type(`${username}`)
    cy.get('[data-cy="register-email"]').type(`${email}`)
    cy.get('[data-cy="register-password"]').type(`${password}`)
    cy.get('[data-cy="register-birthdate"]').type("2000-09-18")
    cy.get('[data-cy="register-sex"]').select(`${sex}`)
    cy.get('[data-cy="register-weight"]').type(weight)
    cy.get('[data-cy="register-height"]').type(height)
    cy.get('[data-cy="register-activity"]').select(`${activity}`)
    cy.get('[data-cy="register-checkbox"]').click()
    cy.get('[data-cy="register-button"]').contains("Register").click()
    cy.contains("OK").should("be.visible")
  })
})

describe("Login", () => {
  it("Cannot login a user with wrong credentials", () => {
    cy.visit("http://localhost:3000")
    cy.contains("Log In").click()
    cy.get('[data-cy="login-email"]').type("wrong@email.com")
    cy.get('[data-cy="login-password"]').type("wrong")
    cy.get("button").contains("Login").click()
    cy.contains("No data in the DB").should("be.visible")
  })

  it("can login", function () {
    cy.visit("http://localhost:3000")
    cy.contains("Log In").click()
    cy.contains("Login")
    cy.get('[data-cy="login-email"]').type(`${email}`)
    cy.get('[data-cy="login-password"]').type(`${password}`)
    cy.get(".button").contains("Login").click()

    cy.contains("Welcome").should("be.visible")
  })
  it("Can save the token locally", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5005/api/login",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json ",
        Accept: "*/*",
      },
    }).then((res) => {
      console.log(res.body)
      token = res.body.token
      window.localStorage.setItem("loggedUser", token)
    })
  })
})

describe("Search", function () {
  it("can search food", function () {
    window.localStorage.setItem("loggedUser", token)
    cy.visit("http://localhost:3000")
    cy.get(".fa-solid.fa-search").click()
    cy.get('[data-cy="search-bar"]').type("duck")
    cy.get(".button").contains("Search").click().wait(500)
    cy.get(".button-add").click()
    cy.get('[data-cy="search-bar"]').type("beer")
    cy.get(".button").contains("Search").click().wait(900)
    cy.get(".button-add").click()
    cy.contains("624.88 Kcal")
    cy.contains("Save in the diary").click()
    cy.on("window:confirm", () => true)
  })
})

describe("Diary", function () {
  const date = getCompleteDate()
  it("can see the searched food", function () {
    window.localStorage.setItem("loggedUser", token)
    cy.visit("http://localhost:3000")

    cy.get("a.icon-text i.fa-solid.fa-book-open").click()
    cy.get("a.icon-text i.fa-solid.fa-book-open").click()
    cy.get("a.icon-text i.fa-solid.fa-book-open").click()
    cy.get("a.icon-text i.fa-solid.fa-book-open").click()
    cy.get("a.icon-text i.fa-solid.fa-book-open").click()
    cy.get(".dropdown-trigger").contains(date).click()
  })
})

describe("Update Profile", function () {
  it("can update the email profile", function () {
    window.localStorage.setItem("loggedUser", token)
    cy.visit("http://localhost:3000")
    cy.contains(username).click()
    cy.get('[data-cy="update-email"]').type(updatedEmail)
    cy.get('[data-cy="update-activity"]').select(
      "I make exercise 2 days of the week"
    )
    cy.get('[data-cy="update-button"]').contains("Update Profile Info").click()
    cy.contains("OK").should("be.visible")
  })
})

describe("Eliminate Profile", function () {
  it("can eliminate the profile", function () {
    cy.visit("http://localhost:3000")
    cy.contains("Log In").click()
    cy.get('[data-cy="login-email"]').type(`${updatedEmail}`)
    cy.get('[data-cy="login-password"]').type(`${password}`)
    cy.get(".button").contains("Login").click().wait(500)
    cy.contains(username).click()
    cy.get('[data-cy="delete-profile"]').click({ multiple: true })
    cy.on("window:confirm", (text) => {
      expect(text).to.contains(
        "You're going to eliminate all the information of your profile. This action is irrevocable. Want to continue?"
      )
    })
  })
})
