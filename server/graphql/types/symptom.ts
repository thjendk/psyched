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
    symptomParent(data: SymptomParentInput): Symptom
  }

  type Symptom {
    id: Int
    name: String
    description: String
    parent: Symptom
    children: [Symptom]
  }

  input SymptomInput {
    name: String
    description: String
  }

  input SymptomParentInput {
    id: Int
    parentId: Int
  }
`;

export const resolvers: Resolvers = {
  Query: {
    symptoms: async () => {
      const symptoms = await Symptoms.query();
      return symptoms.map((s) => ({ id: s.id }));
    }
  },

  Mutation: {
    createSymptom: async (root, { data }, ctx) => {
      const symptom = await Symptoms.query().insertAndFetch({ ...data });
      return { id: symptom.id };
    },
    updateSymptom: async (root, { id, data }, ctx) => {
      const symptom = await Symptoms.query()
        .updateAndFetchById(id, { ...data })
        .skipUndefined();
      return { id: symptom.id };
    },
    removeSymptom: async (root, { id }) => {
      await Symptoms.query().deleteById(id);
      return id;
    },
    symptomParent: async (root, { data: { id, parentId } }, ctx) => {
      const exists = await Symptoms.query().findOne({ id, parentId });

      if (exists) {
        await exists.$query().delete();
      } else {
        await Symptoms.query()
          .findById(id)
          .update({ parentId });
      }

      return { id };
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
    },
    parent: async ({ id }, args, ctx) => {
      const symptom = await ctx.symptomLoader.load(id);
      if (!symptom.parentId) return null;
      return { id: symptom.parentId };
    },
    children: async ({ id }) => {
      const parents = await Symptoms.query().where({ parentId: id });
      return parents.map((p) => ({ id: p.id }));
    }
  }
};
