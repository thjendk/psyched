import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import Symptoms from 'models/symptoms.model';

export const typeDefs = gql`
  extend type Query {
    symptoms: [Symptom]
  }

  type Symptom {
    id: Int
    name: String
    description: String
  }
`;

export const resolvers: Resolvers = {
  Query: {
    symptoms: async () => {
      const symptoms = await Symptoms.query();
      return symptoms.map((s) => ({ id: s.symptomId }));
    }
  },

  Symptom: {
    id: ({ id }) => id,
    name: async ({ id }, args, ctx) => {
      const symptom = await ctx.symptomLoader.load(id);
      return symptom.name;
    },
    description: async ({ id }, args, ctx) => {
      const symptom = await ctx.symptomLoader.load(id);
      return symptom.description;
    }
  }
};
