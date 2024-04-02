const typeDefs = `
type Book {
    _id: ID
    title: String
    authors: [String]
    subject: String
    isbn: String
    image: String
    price: Float
    user: User
    sold: Boolean
}

type User {
    _id: ID
    username: String
    email: String 
    password: String
    transactions: [Transaction]
    books: [Book]
}

type Subject {
    _id: ID
    name: String
    books: [Book]
}

type Transaction {
    _id: ID
    purchaseDate: String
    sellerId: User
    buyerId: User
    book: Book
}

type Auth {
    token: ID
    user: User
}

input BookInput {
    _id: ID
    title: String
    authors: [String]
    subject: String
    isbn: String
    image: String
    price: Float
    user: User
    sold: Boolean
}

type Query {
    books: [Book]
    book(_id: ID!): Book
    subjects: [Subject]
    subject(name: String!): Subject
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(bookData: BookInput!): Book
    addTransaction(purchaseDate: String!, sellerId: ID!, buyerId: ID!, book: ID!): Transaction
    removeBook(_id: ID!): Book
    updateBook(_id: ID!, sold: Boolean, price: Float): Book
}
`;

module.exports = typeDefs;
