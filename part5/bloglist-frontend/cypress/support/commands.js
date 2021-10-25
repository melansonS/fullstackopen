
const baseApiUrl = 'http://localhost:3005'

// -- This is a parent command --
Cypress.Commands.add('login', ( { username, password }) => {
  cy.request('POST', `${baseApiUrl}/api/login`, { username, password }).then(response => {
    localStorage.setItem('user', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url:`${baseApiUrl}/api/blogs`,
    method: 'POST',
    body: blog,
    headers: { Authorization: `bearer ${JSON.parse(window.localStorage.getItem('user')).token}` }
  })
  cy.visit('http://localhost:3000')
})