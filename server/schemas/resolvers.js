const { User, Book, Transaction, Subject } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          return await User.findOne({ _id: context.user._id })
          .populate('books')
          .populate({
            path: 'transactions',
            populate: {
              path: 'book',
              model: 'book'
            }
          })
          .populate({
            path: 'transactions',
            populate: {
              path: 'sellerId',
              model: 'user'
            }
          })
          .populate({
            path: 'transactions',
            populate: {
              path: 'buyerId',
              model: 'user'
            }
          })
          .populate({
            path: 'books',
            populate: {
              path: 'subject',
              model: 'subject'
            }
          })
          ;
      }
      throw AuthenticationError;
    },
    books: async () => {
      return await Book.find().populate('subject').populate('user')
    },
    book: async (parent, args) => {
      return await Book.findById(args._id).populate('subject').populate('user');
    },
    subjects: async () => {
      return await Subject.find();
    },
    subject: async (parent, {subject}) => {
      return await Book.find({subject: subject}).populate('subject').populate('user');
    },
    transactions: async () => {
      return await Transaction.find()
      .populate({
        path: 'book',
        populate: {
          path: 'book',
          model: 'book'
        }
      })
    }
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
    updateBook: async (parent, { _id, bookData }, context) => {
      if (context.user) {
        const updatedBook = await Book.findOneAndUpdate(
          { _id: _id },
          bookData,
          { new: true }
        );
    
        console.log(updatedBook);
        return updatedBook;
      }
      throw new AuthenticationError;
    },
    addTransaction: async (parent, args, context) => {
      console.log(args)
      if (context.user) {
        const newTransaction = await Transaction.create(
          {
            sellerId: args.sellerId,
            buyerId: context.user._id,
            book: args.book,
            price: args.price
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
        const buyer = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { transactions: newTransaction._id },
          }
        )
        const seller = await User.findOneAndUpdate(
          { _id: args.sellerId },
          {
            $addToSet: { transactions: newTransaction._id },
          }
        )
        return  newTransaction ;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
