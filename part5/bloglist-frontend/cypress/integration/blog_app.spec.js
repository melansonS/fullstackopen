describe('Blog app', function() {
  const baseApiUrl = 'http://localhost:3005'
  beforeEach(function() {
    cy.request('POST', `${baseApiUrl}/api/testing/reset`).then(() => {
      const newTom = { username: 'tom', password:'123', name:'brad' }
      const newJim = { username: 'jim', password:'123', name:'notBrad' }
      cy.request('POST', `${baseApiUrl}/api/users`, newTom)
      cy.request('POST', `${baseApiUrl}/api/users`, newJim)
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
      cy.login({ username: 'tom', password: '123' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#author').type('Author person')
      cy.get('#title').type('Cool test blog')
      cy.get('#url').type('google.com')
      cy.get('#create-blog-button').click()
      cy.get('.blog-container').contains('Cool test blog')
    })
    it('A blog can be liked', function () {
      const blog = { author: 'Jimeth', title: 'All I want is for this to be liked' }
      cy.createBlog(blog)
      cy.contains('Jimeth').get('.show-blog-button').click()
      cy.get('.like-button').click()
      cy.get('.likes').contains('1')
      cy.get('.like-button').click()
      cy.get('.likes').contains('2')
    })
    it('OP can delete their own blogs', function () {
      const blog = { author: 'JamesWard', title: 'Not long for this world' }
      cy.createBlog(blog)
      cy.contains('JamesWard').get('.show-blog-button').click()
      cy.get('.delete-button').click()
      cy.get('.alert-message').contains('removed')
      cy.get('.blog-container').should('not.exist')
    })
    it('cannot delete blogs that were created by another user', function () {
      const blog = { author: 'JamesWard', title: 'Not long for this world' }
      cy.createBlog(blog)
      cy.login({ username: 'jim', password: '123' })
      cy.get('.show-blog-button').click()
      cy.get('delete-button').should('not.exist')
    })
    it.only('orders blogs according to their likes', function() {
      const blogs = [
        { author: 'JamesWard', title: 'has some likes', likes: 2 },
        { author: 'JamesWard', title: 'no likes :(' },
        { author: 'JamesWard', title: 'Initially popular', likes: 3 }
      ]
      blogs.forEach(blog => cy.createBlog(blog))
      cy.get('.blog-container').eq(0).contains('Initially popular')
      cy.get('.blog-container').eq(1).contains('some likes')
      cy.get('.blog-container').eq(2).contains('no likes')

      cy.get('.blog-container').eq(1).within(() => {
        cy.get('.show-blog-button').click()
      })
      cy.get('.like-button').click().wait(200).click().wait(200)
      cy.get('.blog-container').eq(0).contains('some likes')
    })
  })
})