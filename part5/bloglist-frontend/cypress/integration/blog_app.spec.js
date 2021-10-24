describe('Blog app', function() {
  const baseApiUrl = 'http://localhost:3005'
  beforeEach(function() {
    cy.request('POST', `${baseApiUrl}/api/testing/reset`).then(() => {

      const newUser = { username: 'tom', password:'123', name:'brad' }
      cy.request('POST', `${baseApiUrl}/api/users`, newUser)
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('#username-input')
    cy.get('#password-input')
    cy.get('button').contains('Login')
  })

  describe('Login', function () {
    it('Succeeds with proper credentials', function () {
      cy.get('#username-input').type('tom')
      cy.get('#password-input').type('123')
      cy.get('button').click()
      cy.get('#logout-button')
    })
    it('Fails with wrong credentials', function () {
      cy.get('#username-input').type('tom')
      cy.get('#password-input').type('wrongPassword')
      cy.get('button').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)').and('contain','wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      const user = { username: 'tom', password: '123' }
      cy.request('POST', `${baseApiUrl}/api/login`, user).then(response => {
        localStorage.setItem('user', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#author').type('Author person')
      cy.get('#title').type('Cool test blog')
      cy.get('#url').type('google.com')
      cy.get('#create-blog-button').click()
      cy.get('.blog-container').contains('Cool test blog')
    })
    it.only('A blog can be liked', function () {
      const blog = { author: 'Jimeth', title: 'All I want is for this to be liked' }
      const token = JSON.parse(window.localStorage.getItem('user')).token
      cy.request({
        method: 'POST',
        url: `${baseApiUrl}/api/blogs`,
        headers: { Authorization: `bearer ${token}` },
        body: blog })
      cy.visit('http://localhost:3000')
      cy.contains('Jimeth').get('.show-blog-button').click()
      cy.get('.like-button').click()
      cy.get('.likes').contains('1')
      cy.get('.like-button').click()
      cy.get('.likes').contains('2')
    })
  })
})