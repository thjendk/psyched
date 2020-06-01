import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import Diagnoses from 'models/diagnoses.model';
import Group from 'models/groups.model';
import DiagnosisParent from 'models/diagnosisParents.model';

export const typeDefs = gql`
  extend type Query {
    diagnoses: [Diagnosis]
  }

  extend type Mutation {
    createDiagnosis(data: DiagnosisInput): Diagnosis
    updateDiagnosis(id: Int, data: DiagnosisInput): Diagnosis
    removeDiagnosis(id: Int): Int
    diagnosisParent(data: DiagnosisParentInput): Diagnosis
  }

  type Diagnosis {
    id: Int
    name: String
    icdCode: String
    description: String
    groups: [Group]
    parents: [Diagnosis]
    children: [Diagnosis]
  }

  input DiagnosisInput {
    name: String
    description: String
    icdCode: String
  }

  input DiagnosisGroupInput {
    diagnosisId: Int
    groupId: Int
  }

  input DiagnosisParentInput {
    id: Int
    parentId: Int
  }
`;

export const resolvers: Resolvers = {
  Query: {
    diagnoses: async () => {
      const diagnoses = await Diagnoses.query();
      return diagnoses.map((d) => ({ id: d.id }));
    }
  },

  Mutation: {
    createDiagnosis: async (root, { data }, ctx) => {
      const diagnosis = await Diagnoses.query().insertAndFetch({
        ...data
      });
      return { id: diagnosis.id };
    },
    updateDiagnosis: async (root, { id, data }, ctx) => {
      const diagnosis = await Diagnoses.query()
        .updateAndFetchById(id, { ...data })
        .skipUndefined();
      return { id: diagnosis.id };
    },
    removeDiagnosis: async (root, { id }) => {
      await Diagnoses.query().deleteById(id);
      return id;
    },
    diagnosisParent: async (root, { data: { id, parentId } }, ctx) => {
      const exists = await DiagnosisParent.query().findOne({ diagnosisId: id, parentId });

      if (exists) {
        await exists.$query().delete();
      } else {
        await DiagnosisParent.query().insert({ diagnosisId: id, parentId });
      }

      return { id };
    }
  },

  Diagnosis: {
    id: ({ id }) => id,
    name: async ({ id }, args, ctx) => {
      const diagnosis = await ctx.diagnosisLoader.load(id);
      return diagnosis.name;
    },
    icdCode: async ({ id }, args, ctx) => {
      const diagnosis = await ctx.diagnosisLoader.load(id);
      return diagnosis.icdCode;
    },
    description: async ({ id }, args, ctx) => {
      const diagnosis = await ctx.diagnosisLoader.load(id);
      return diagnosis.description;
    },
    groups: async ({ id }) => {
      const groups = await Group.query().where({ diagnosisId: id });
      return groups.map((g) => ({ id: g.id }));
    },
    parents: async ({ id }, args, ctx) => {
      const parents = await DiagnosisParent.query().where({ diagnosisId: id });
      return parents.map((p) => ({ id: p.parentId }));
    },
    children: async ({ id }) => {
      const parents = await DiagnosisParent.query().where({ parentId: id });
      return parents.map((p) => ({ id: p.diagnosisId }));
    }
  }
};
