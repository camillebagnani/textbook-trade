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
      return {token, user};
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


    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedBooks: bookData },
          },
          {
            new: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { savedBooks: { bookId } },
          },
          {
            new: true,
          }
        );
      }
      throw AuthenticationError;
    },





  },
};

module.exports = resolvers;
