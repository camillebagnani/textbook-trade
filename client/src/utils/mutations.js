import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_BOOK = gql`
mutation addBook($bookData: BookInput!) {
  addBook(bookData: $bookData) {
    _id
    authors
    image
    isbn
    price
    sold
    title
    user {
      _id
      username
    }
    subject {
      _id
      name
    }
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($_id: ID!) {
    removeBook(_id: $_id) {
      _id
      title
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation updateBook($bookData: BookInput!) {
    updateBook(bookData: $bookData) {
      _id
      authors
      image
      isbn
      price
      title
      user {
        _id
        username
      }
      subject {
        _id
        name
      }
    }
  }
  `;

export const ADD_TRANSACTION = gql`
mutation addTransaction($sellerId: ID!, $book: ID!) {
  addTransaction(sellerId: $sellerId, book: $book) {
    _id
    purchaseDate
    buyerId {
      _id
      username
    }
    sellerId {
      _id
      username
    }
    book {
      _id
      title
    }
  }
}
`;
