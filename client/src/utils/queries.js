import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  me {
    _id
    username
    books {
      authors
      image
      isbn
      price
      sold
      subject
      title
    }
    transactions {
      book {
        authors
        image
        isbn
        price
        sold
        subject
        title
      }
      purchaseDate
      sellerId {
        _id
        username
      }
      buyerId {
        _id
        username
      }
    }
  }
}
`;

export const QUERY_ALL_BOOKS = gql`
query books {
  books {
    authors
    image
    isbn
    price
    sold
    subject
    title
    user {
      username
    }
  }
}`

export const QUERY_ALL_SUBJECTS = gql `
query subjects {
  subjects {
    name
    books {
      authors
      image
      isbn
      price
      sold
      subject
      title
      user {
        username
      }
    }
  }
}`
;

export const SINGLE_BOOK = gql`
query book($id: ID!) {
  book(_id: $id) {
    authors
    image
    isbn
    price
    sold
    subject
    title
    user {
      username
    }
  }
}
`
export const SINGLE_SUBJECT = gql `
query subject($name: String!) {
  subject(name: $name) {
    name
    books {
      authors
      image
      isbn
      price
      sold
      subject
      title
      user {
        username
      }
    }
  }
}
`