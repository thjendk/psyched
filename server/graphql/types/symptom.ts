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
    createSymptom: async (root, { data }) => {
      const symptom = await Symptoms.query().insertAndFetch(data);
      return { id: symptom.symptomId };
    },
    updateSymptom: async (root, { id, data }) => {
      const symptom = await Symptoms.query()
        .updateAndFetchById(id, data)
        .skipUndefined();
      return { id: symptom.symptomId };
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
