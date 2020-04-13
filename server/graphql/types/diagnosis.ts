import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import Diagnoses from 'models/diagnoses.model';
import DiagnosisSymptoms from 'models/diagnosisSymptoms.model';
import DiagnosisParent from 'models/diagnosesParents.model';
import DiagnosisExcluding from 'models/diagnosesExcluding.model';
import DiagnosisIncluding from 'models/diagnosesIncluding.model';

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
    toggleHideDiagnosisSymptom(diagnosisId: Int, symptomId: Int): Diagnosis
    addExcludingDiagnosisToDiagnosis(diagnosisId: Int, excludingId: Int): Diagnosis
    removeExcludingDiagnosisFromDiagnosis(diagnosisId: Int, excludingId: Int): Diagnosis
    addIncludingDiagnosisToDiagnosis(diagnosisId: Int, includingId: Int): Diagnosis
    removeIncludingDiagnosisFromDiagnosis(diagnosisId: Int, includingId: Int): Diagnosis
  }

  type Diagnosis {
    id: Int
    name: String
    icdCode: String
    description: String
    symptoms: [DiagnosisSymptom]
    parents: [Diagnosis]
    children: [Diagnosis]
    excluding: [Diagnosis]
    including: [Diagnosis]
  }

  input DiagnosisInput {
    name: String
    description: String
    icdCode: String
  }

  type DiagnosisSymptom {
    symptom: Symptom
    point: Int
    hidden: Boolean
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
      const exists = await DiagnosisSymptoms.query().findOne({ symptomId, diagnosisId });
      if (exists) {
        await exists.$query().update({ hidden: 0, userId: ctx.user.userId });
      } else {
        await DiagnosisSymptoms.query().insert({ symptomId, diagnosisId, userId: ctx.user.userId });
      }
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
    toggleHideDiagnosisSymptom: async (root, { diagnosisId, symptomId }) => {
      const join = await DiagnosisSymptoms.query().findOne({ symptomId, diagnosisId });
      if (!join) {
        await DiagnosisSymptoms.query().insert({ diagnosisId, symptomId, hidden: 1 });
      } else {
        await join.$query().update({ hidden: join.hidden ? 0 : 1 });
      }
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
    },
    addExcludingDiagnosisToDiagnosis: async (root, { diagnosisId, excludingId }) => {
      await DiagnosisExcluding.query().insert({ diagnosisId, excludingId });
      return { id: diagnosisId };
    },
    removeExcludingDiagnosisFromDiagnosis: async (root, { diagnosisId, excludingId }) => {
      await DiagnosisExcluding.query()
        .where({ diagnosisId, excludingId })
        .delete();
      return { id: diagnosisId };
    },
    addIncludingDiagnosisToDiagnosis: async (root, { diagnosisId, includingId }) => {
      await DiagnosisIncluding.query().insert({ diagnosisId, includingId });
      return { id: diagnosisId };
    },
    removeIncludingDiagnosisFromDiagnosis: async (root, { diagnosisId, includingId }) => {
      await DiagnosisIncluding.query()
        .where({ diagnosisId, includingId })
        .delete();
      return { id: diagnosisId };
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
      return joins.map((j) => ({
        symptom: { id: j.symptomId },
        point: j.point,
        hidden: !!j.hidden
      }));
    },
    parents: async ({ id }) => {
      const parents = await DiagnosisParent.query().where({ diagnosisId: id });
      return parents.map((p) => ({ id: p.parentId }));
    },
    children: async ({ id }) => {
      const parents = await DiagnosisParent.query().where({ parentId: id });
      return parents.map((p) => ({ id: p.diagnosisId }));
    },
    excluding: async ({ id }) => {
      const excluding = await DiagnosisExcluding.query().where({ diagnosisId: id });
      return excluding.map((d) => ({ id: d.excludingId }));
    },
    including: async ({ id }) => {
      const including = await DiagnosisIncluding.query().where({ diagnosisId: id });
      return including.map((d) => ({ id: d.includingId }));
    }
  }
};
