const { User, Book, Transaction, Subject } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
        //populate transactions and books?
      }
      throw AuthenticationError;
    },
    books: async () => {
      return await Book.find();
    },
    book: async (parent, args) => {
      return await Book.findById(args._id);
    },
    subjects: async () => {
      return await Subject.find();
    },
    subject: async (parent, args) => {
      //const params = {};

      // if (args) {
      //   params.subject = args;
      // }
      return await Subject.findById(args._id).populate("book");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const newBook = await Book.create(bookData);
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { books: newBook._id },
          },
          {
            new: true,
          }
        );
        const subject = await Subject.findOneAndUpdate(
          { name: newBook.subject },
          {
            $addToSet: { books: newBook._id },
          },
          {
            new: true,
          }
        );
        return newBook;
      }
      throw AuthenticationError;
    },
    removeBook: async (parent, args, context) => {
      const oldId = args._id;
      const oldBook = await Book.findOne({ _id: oldId });
      if (context.user) {
        const book = await Book.findOneAndDelete({ _id: args._id });
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { books: oldId },
          }
        );
        const subject = await Subject.findOneAndUpdate(
          { name: oldBook.subject },
          {
            $pull: { books: oldId },
          }
        );

        return { book, user };
      }
      throw AuthenticationError;
    },
    updateBook: async (parent, args, context) => {
      if (context.user) {
        return await Book.findOneAndUpdate(
          { _id: args._id },
          args,

          {
            new: true,
          }
        );
      }
      throw AuthenticationError;
    },
    addTransaction: async (parent, args, context) => {
      if (context.user) {
        const newTransaction = await Transaction.create(
          {
            sellerId: args.sellerId,
            buyerId: context.user._id,
            book: args.book,
          }
        );
        console.log(newTransaction);
        const book = await Book.findOneAndUpdate(
          { _id: args.book },
          { sold: true },
          {
            new: true,
          }
        );
        return { newTransaction, book };
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
