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
  mutation addBook($bookInput: BookInput) {
    addBook(bookInput: $bookInput) {
      _id
      title
      authors
      subject
      isbn
      image
      price
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
  mutation addTransaction($purchaseDate: String!, $sellerId: ID!, $buyerId: ID!) {
    addTransaction(purchaseDate: $purchaseDate, sellerId: $sellerId, buyerId: $buyerId) {
      _id
      purchaseDate
      sellerId
      BuyerId
    }
  }
`;
