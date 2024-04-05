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
  mutation addUser($userName: String!, $email: String!, $password: String!) {
    addUser(userName: $userName, email: $email, password: $password) {
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
  mutation updateBook($_id: ID!, $sold: Boolean, $price: Float) {
    updateBook(_id: $_id, sold: $sold, price: $price) {
      _id
      title
      price
      sold
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
