const Handler = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: Handler.addBook
  }, {
    method: 'GET',
    path: '/books',
    handler: Handler.getBook
  }, {
    method: 'GET',
    path: '/books/{id}',
    handler: Handler.getBookByID
  }, {
    method: 'PUT',
    path: '/books/{id}',
    handler: Handler.editBookByID
  }, {
    method: 'DELETE',
    path: '/books/{id}',
    handler: Handler.deleteBookByID
  }
]

module.exports = routes
