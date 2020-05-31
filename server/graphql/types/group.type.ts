import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import Group from 'models/groups.model';
import SymptomGroup from 'models/symptomGroups.model';

export const groupTypeDefs = gql`
  extend type Query {
    groups: [Group]
  }

  extend type Mutation {
    addOrRemoveGroup(data: GroupInput): Diagnosis
    symptomGroup(data: SymptomGroupInput): Diagnosis
  }

  type Group {
    id: Int
    name: String
    index: Int
    diagnosis: Diagnosis
    parent: Group
    children: [Group]
    symptoms: [Symptom]
  }

  input GroupInput {
    name: String
    index: Int
    diagnosisId: Int
    parentId: Int
  }

  input SymptomGroupInput {
    groupId: Int
    symptomId: Int
  }
`;

export const groupResolvers: Resolvers = {
  Query: {
    groups: async () => {
      const groups = await Group.query();
      return groups.map((g) => ({ id: g.id }));
    }
  },

  Mutation: {
    addOrRemoveGroup: async (root, { data }, ctx) => {
      const exists = await Group.query().findOne(data);
      if (exists) {
        await exists.$query().delete();
      } else {
        await Group.query().insert(data);
      }

      return { id: data.diagnosisId };
    }
  },

  Group: {
    id: ({ id }) => id,
    name: async ({ id }, args, ctx) => {
      const group = await ctx.groupLoader.load(id);
      return group.name;
    },
    index: async ({ id }, args, ctx) => {
      const group = await ctx.groupLoader.load(id);
      return group.index;
    },
    diagnosis: async ({ id }, args, ctx) => {
      const group = await ctx.groupLoader.load(id);
      return { id: group.diagnosisId };
    },
    parent: async ({ id }, args, ctx) => {
      const group = await ctx.groupLoader.load(id);
      if (!group.parentId) return null;
      return { id: group.parentId };
    },
    children: async ({ id }, args, ctx) => {
      const groups = await Group.query().where({ parentId: id });
      return groups.map((g) => ({ id: g.id }));
    },
    symptoms: async ({ id }, args, ctx) => {
      const symptoms = await SymptomGroup.query().where({ groupId: id });
      return symptoms.map((s) => ({ id: s.symptomId }));
    }
  }
};
