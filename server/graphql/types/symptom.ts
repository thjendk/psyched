import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import Symptoms from 'models/symptoms.model';

export const typeDefs = gql`
  extend type Query {
    symptoms: [Symptom]
  }

  extend type Mutation {
    createSymptom(data: SymptomInput): Symptom
    updateSymptom(id: Int, data: SymptomInput): Symptom
    removeSymptom(id: Int): Int
  }

  type Symptom {
    id: Int
    name: String
    description: String
  }

  input SymptomInput {
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

  Mutation: {
    createSymptom: async (root, { data }, ctx) => {
      const symptom = await Symptoms.query().insertAndFetch({ ...data, userId: ctx.user.userId });
      return { id: symptom.symptomId };
    },
    updateSymptom: async (root, { id, data }, ctx) => {
      const symptom = await Symptoms.query()
        .updateAndFetchById(id, { ...data, userId: ctx.user.userId })
        .skipUndefined();
      return { id: symptom.symptomId };
    },
    removeSymptom: async (root, { id }) => {
      await Symptoms.query().deleteById(id);
      return id;
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
