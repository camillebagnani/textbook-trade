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
`