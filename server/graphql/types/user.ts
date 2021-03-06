import { gql } from 'apollo-server-express';
import User from '../../models/userModel';
import { Context } from 'config/apolloServer';

export const typeDefs = gql`
  extend type Query {
    user: User
  }

  extend type Mutation {
    createUser(data: UserInput): String
    login(data: UserInput): String
    logout: String
  }

  type User {
    id: Int
    username: String
  }

  input UserInput {
    username: String
    password: String
  }
`;

export const resolvers = {
  Query: {
    user: async (obj, args, ctx: Context, info) => {
      if (!ctx.user) return null;

      const user = await User.query().findById(ctx.user.id);
      if (!user) return null;
      return { id: user.id };
    }
  },

  Mutation: {
    createUser: async (obj, { data }, ctx: Context, info) => {
      const newUser = await User.query().insertAndFetch(data);

      const token = newUser.signToken();
      ctx.res.cookie('user', token);
      return 'Created user and signed in';
    },
    login: async (obj, { data }, ctx: Context, info) => {
      const { username, password, email } = data;
      if (!password || (!username && !email)) {
        throw new Error('You must provide username/email and password');
      }

      const user = await User.login(username, email);
      const isValid = await user.verify(password);

      if (isValid) {
        const token = user.signToken();
        ctx.res.cookie('user', token, { expires: new Date(253402300000000) });
        return 'Signed in';
      } else {
        throw new Error('Incorrect username or password');
      }
    },
    logout: (root, args, ctx: Context) => {
      ctx.res.cookie('user', {}, { expires: new Date(0) });
      return 'Logged out';
    }
  },
  User: {
    id: ({ id }) => id,
    username: async ({ id }, _, ctx: Context) => {
      const user = await ctx.userLoader.load(id);
      if (!user) return null;
      return user.username;
    }
  }
};
