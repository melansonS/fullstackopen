import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    bookCount
    born
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $genres: [String!]!, $author: String!){
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres,
  ) {
    title
    author
  }
}
`
