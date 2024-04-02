const typeDefs = `

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(title: String!, authors: [String], subject: String, isbn: String, image: String, price: Float): Book
    addTransaction(purchaseDate: String!, sellerId: ID!, buyerId: ID!, book: ID!): Transaction
    removeBook(_id: ID!): Book
    updateBook(_id: ID!, sold: Boolean, price: Float): Book
}

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

type Query {
    books: [Book]
    book(_id: ID!): Book
    subjects: [Subject]
    subject(name: String!): Subject
    me: User
}
`;

module.exports = typeDefs;
