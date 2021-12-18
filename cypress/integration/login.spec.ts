describe("Login/Logout", () => {
    it("Login", () => {
        cy.login("erika.emmanuel@gmail.com", "1234567890");
        cy.url().should("include", "library");

        cy.logout();
        cy.url().should("include", "login");
    });
});
