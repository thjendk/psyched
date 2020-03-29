import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import Diagnoses from 'models/diagnoses.model';
import DiagnosisSymptoms from 'models/diagnosisSymptoms.model';
import DiagnosisParent from 'models/diagnosesParents.model';

export const typeDefs = gql`
  extend type Query {
    diagnoses: [Diagnosis]
  }

  extend type Mutation {
    createDiagnosis(data: DiagnosisInput): Diagnosis
    updateDiagnosis(id: Int, data: DiagnosisInput): Diagnosis
    removeDiagnosis(id: Int): Int
    addDiagnosisParent(id: Int, parentId: Int): Diagnosis
    removeDiagnosisParent(id: Int, parentId: Int): Diagnosis
    addSymptomToDiagnosis(diagnosisId: Int, symptomId: Int): Diagnosis
    updateDiagnosisSymptom(diagnosisId: Int, symptomId: Int, point: Int): Diagnosis
    removeSymptomFromDiagnosis(diagnosisId: Int, symptomId: Int): Diagnosis
  }

  type Diagnosis {
    id: Int
    name: String
    icdCode: String
    description: String
    symptoms: [DiagnosisSymptom]
    parents: [Diagnosis]
    children: [Diagnosis]
  }

  input DiagnosisInput {
    name: String
    description: String
    icdCode: String
  }

  type DiagnosisSymptom {
    point: Int
    symptom: Symptom
  }
`;

export const resolvers: Resolvers = {
  Query: {
    diagnoses: async () => {
      const diagnoses = await Diagnoses.query();
      return diagnoses.map((d) => ({ id: d.diagnosisId }));
    }
  },

  Mutation: {
    createDiagnosis: async (root, { data }, ctx) => {
      const diagnosis = await Diagnoses.query().insertAndFetch({
        ...data,
        userId: ctx.user.userId
      });
      return { id: diagnosis.diagnosisId };
    },
    updateDiagnosis: async (root, { id, data }, ctx) => {
      const diagnosis = await Diagnoses.query()
        .updateAndFetchById(id, { ...data, userId: ctx.user.userId })
        .skipUndefined();
      return { id: diagnosis.diagnosisId };
    },
    removeDiagnosis: async (root, { id }) => {
      await Diagnoses.query().deleteById(id);
      return id;
    },
    addSymptomToDiagnosis: async (root, { symptomId, diagnosisId }, ctx) => {
      await DiagnosisSymptoms.query().insert({ symptomId, diagnosisId, userId: ctx.user.userId });
      return { id: diagnosisId };
    },
    updateDiagnosisSymptom: async (root, { diagnosisId, symptomId, point }) => {
      await DiagnosisSymptoms.query()
        .where({ diagnosisId, symptomId })
        .update({ point });
      return { id: diagnosisId };
    },
    removeSymptomFromDiagnosis: async (root, { symptomId, diagnosisId }) => {
      await DiagnosisSymptoms.query()
        .where({ symptomId, diagnosisId })
        .delete();
      return { id: diagnosisId };
    },
    addDiagnosisParent: async (root, { id, parentId }, ctx) => {
      await DiagnosisParent.query().insert({ diagnosisId: id, parentId, userId: ctx.user.userId });
      return { id };
    },
    removeDiagnosisParent: async (root, { id, parentId }, ctx) => {
      await DiagnosisParent.query()
        .where({ diagnosisId: id, parentId, userId: ctx.user.userId })
        .delete();
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
    symptoms: async ({ id }) => {
      const joins = await DiagnosisSymptoms.query().where({ diagnosisId: id });
      return joins.map((j) => ({ symptom: { id: j.symptomId }, point: j.point }));
    },
    parents: async ({ id }) => {
      const parents = await DiagnosisParent.query().where({ diagnosisId: id });
      return parents.map((p) => ({ id: p.parentId }));
    },
    children: async ({ id }) => {
      const parents = await DiagnosisParent.query().where({ parentId: id });
      return parents.map((p) => ({ id: p.diagnosisId }));
    }
  }
};
