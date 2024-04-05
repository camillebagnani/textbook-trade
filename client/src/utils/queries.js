import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  me {
    _id
    email
    username
    books {
      _id
      title
      authors
      price
      sold
      isbn
      image
      subject {
        _id
        name
      }
    }
    transactions {
      _id
      book {
        _id
        title
      }
      buyerId {
        _id
        username
      }
      purchaseDate
      sellerId {
        _id
        username
      }
    }
  }
}
`;

export const QUERY_ALL_BOOKS = gql`
query allBooks {
  books {
    title
    _id
    authors
    image
    isbn
    price
    sold
    subject {
      _id
      name
    }
  }
}
`

export const SINGLE_BOOK = gql`
query book($id: ID!) {
  book(_id: $id) {
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
`

export const QUERY_ALL_SUBJECTS = gql `
query Subjects {
  subjects {
    _id
    name
  }
}
`
;


export const SINGLE_SUBJECT = gql `
query subject($subject: ID) {
  subject(subject: $subject) {
    _id
    title
    price
    subject {
      _id
      name
    }
    authors
    image
    isbn
    sold
    user {
      _id
      username
    }
  }
}
`