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
      return await Book.find()
    },
    book: async (parent, args) => {
      return await Book.findById(args.id)
    },
    subjects: async () => {
      return await Subject.find()
    },
    subject: async (parent, args) => {
      const params = {};

      if (subject) {
        params.subject = subject;
      }
      return await Subject.find(params).populate('book')
    },

  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user)
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
        return newBook;
      }
      throw AuthenticationError;
    },
    removeBook: async (parent, args, context) => {
      const oldId = args._id
      if (context.user) {
        const book = await Book.findOneAndDelete(
          { _id: args._id }
        );
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { books: { oldId } },
          },
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
        const newTransaction = await Transaction.create({ args })
        const book = await Book.findOneAndUpdate(
          { _id: args._id },
          { sold: true },
          {
            new: true,
          }
        );
        return { newTransaction, book }
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
