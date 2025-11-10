describe('Blog app ', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mosse Bosse',
      username: 'Mosse',
      password: 'security1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  it('login form can be opened', function () {
    cy.contains('login')
      .click()
  })

  it('user can login', function () {
    cy.contains('login')
      .click()
    cy.get('#username')
      .type('Mosse')
    cy.get('#password')
      .type('security1234')
    cy.get('#loginbutton')
      .click()
    cy.contains('Mosse Bosse logged in')
  })

  describe('when logged in', function () {

    beforeEach(function () {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('Mosse')
      cy.get('#password')
        .type('security1234')
      cy.get('#loginbutton')
        .click()
    })

    it('user can log out', function () {
      cy.contains('logout')
        .click()
      cy.contains('log in to application')
    })

    it('user can view other users', function () {
      cy.contains('users')
        .click()
      cy.contains('blogs created')
    })

    it('user can create blog', function () {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('Testititle')
      cy.get('#url')
        .type('http://testiurl.com')
      cy.get('#author')
        .type('Testiauthor')
      cy.get('#createblogbutton')
        .click()
      cy.contains('Testititle')
    })

    describe('when blog exists', function () {

      beforeEach(function () {
        cy.contains('new blog')
          .click()
        cy.get('#title')
          .type('Testititle')
        cy.get('#url')
          .type('http://testiurl.com')
        cy.get('#author')
          .type('Testiauthor')
        cy.get('#createblogbutton')
          .click()
      })

      it('user can like blog', function () {
        cy.contains('Testititle Testiauthor')
          .click()
        cy.contains('0 likes')
        cy.get('#likeblogbutton')
          .click()
        cy.contains('1 likes')
      })

      it('user can comment blog', function () {
        cy.contains('Testititle Testiauthor')
          .click()
        cy.get('#commentfield')
          .type('testikommentti')
        cy.get('#addcommentbutton')
          .click()
        cy.contains('testikommentti')
      })

      it('user can remove blog', function () {
        // after blog has been created
        // user must revisit home page to get latest ingo... bug somewhere
        cy.visit('http://localhost:3000')
        cy.contains('Testititle Testiauthor')
          .click()
        cy.get('#removeblogbutton')
          .click()
        cy.contains('removed blog Testititle')
      })

    })

  })

})


