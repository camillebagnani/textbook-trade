const typeDefs = `
type Book {
    _id: ID
    title: String
    authors: String
    subject: Subject
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
    price:Float
}

type Auth {
    token: ID
    user: User
}

input BookInput {
    _id: ID
    title: String
    authors: String
    subject: String
    isbn: String
    image: String
    price: Float
    user: String
    sold: Boolean
}

type Query {
    books: [Book]
    book(_id: ID!): Book
    subjects: [Subject]
    subject(subject: ID): [Book]
    me: User
    transactions: [Transaction]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(bookData: BookInput!): Book
    addTransaction(sellerId: ID!, buyerId: ID, book: ID!, price: Float): Transaction
    removeBook(_id: ID!): Book
    updateBook(_id: ID!, bookData: BookInput): Book
}
`;

module.exports = typeDefs;
