const { nanoid } = require('nanoid')
const arrayOfBook = require('./books')

// Post Book
exports.addBook = (req, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload

  const id = nanoid(18)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  } else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  } else {
    const bukuBaru = {
      id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    }

    arrayOfBook.push(bukuBaru)

    const isSuccess = arrayOfBook.filter((book) => book.id === id).length > 0

    if (!isSuccess) {
      const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan'
      })
      response.code(500)
      return response
    } else {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id
        }
      })
      response.code(201)
      return response
    }
  }
}

// GET Books
exports.getBook = (req, h) => {
  const { name, reading, finished } = req.query
  if (name) {
    // kalo ada query name
    const books = arrayOfBook.filter((iter) => {
      return iter.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    }).map((iter) => {
      return {
        id: iter.id,
        name: iter.name,
        publisher: iter.publisher
      }
    })
    const response = h.response({
      status: 'success',
      data: {
        books
      }
    })
    response.code(200)
    return response
  } else if (reading) {
    // kalo ada query reading
    let books = null
    switch (reading) {
      case '0':
        books = arrayOfBook.filter((iter) => iter.reading === false).map((iter) => {
          return {
            id: iter.id,
            name: iter.name,
            publisher: iter.publisher
          }
        })
        break
      case '1':
        books = arrayOfBook.filter((iter) => iter.reading === true).map((iter) => {
          return {
            id: iter.id,
            name: iter.name,
            publisher: iter.publisher
          }
        })
        break
      default:
        books = arrayOfBook.map((iter) => {
          return {
            id: iter.id,
            name: iter.name,
            publisher: iter.publisher
          }
        })
        break
    }
    const response = h.response({
      status: 'success',
      data: {
        books
      }
    })
    response.code(200)
    return response
  } else if (finished) {
    // kalo ada query finished
    let books = null
    switch (finished) {
      case '0':
        books = arrayOfBook.filter((iter) => iter.finished === false).map((iter) => {
          return {
            id: iter.id,
            name: iter.name,
            publisher: iter.publisher
          }
        })
        break
      case '1':
        books = arrayOfBook.filter((iter) => iter.finished === true).map((iter) => {
          return {
            id: iter.id,
            name: iter.name,
            publisher: iter.publisher
          }
        })
        break
      default:
        books = arrayOfBook.map((iter) => {
          return {
            id: iter.id,
            name: iter.name,
            publisher: iter.publisher
          }
        })
        break
    }
    const response = h.response({
      status: 'success',
      data: {
        books
      }
    })
    response.code(200)
    return response
  } else {
    const books = arrayOfBook.map((iter) => {
      return {
        id: iter.id,
        name: iter.name,
        publisher: iter.publisher
      }
    })
    const response = h.response({
      status: 'success',
      data: {
        books
      }
    })
    response.code(200)
    return response
  }
}

// GET Books dengan ID
exports.getBookByID = (req, h) => {
  const { id } = req.params
  const book = arrayOfBook.filter((iter) => iter.id === id)[0]

  if (!book) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
  } else {
    const response = h.response({
      status: 'success',
      data: {
        book
      }
    })
    response.code(200)
    return response
  }
}

// PUT edit buku dengan ID
exports.editBookByID = (req, h) => {
  const { id } = req.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload
  const updatedAt = new Date().toISOString()
  const index = arrayOfBook.findIndex((iter) => iter.id === id)

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  } else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  } else if (index !== -1) {
    const finished = arrayOfBook[index].pageCount === readPage
    arrayOfBook[index] = {
      ...arrayOfBook[index], name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }
}

// DELETE
exports.deleteBookByID = (req, h) => {
  const { id } = req.params
  const index = arrayOfBook.findIndex((iter) => iter.id === id)

  if (index !== -1) {
    arrayOfBook.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }
}
