import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import Diagnoses from 'models/diagnoses.model';
import DiagnosisSymptoms from 'models/diagnosisSymptoms.model';

export const typeDefs = gql`
  extend type Query {
    diagnoses: [Diagnosis]
  }

  type Diagnosis {
    id: Int
    name: String
    description: String
    symptoms: [Symptom]
  }
`;

export const resolvers: Resolvers = {
  Query: {
    diagnoses: async () => {
      const diagnoses = await Diagnoses.query();
      return diagnoses.map((d) => ({ id: d.diagnosisId }));
    }
  },

  Diagnosis: {
    id: ({ id }) => id,
    name: async ({ id }, args, ctx) => {
      const diagnosis = await ctx.diagnosisLoader.load(id);
      return diagnosis.name;
    },
    description: async ({ id }, args, ctx) => {
      const diagnosis = await ctx.diagnosisLoader.load(id);
      return diagnosis.description;
    },
    symptoms: async ({ id }) => {
      const joins = await DiagnosisSymptoms.query().where({ diagnosisId: id });
      return joins.map((j) => ({ id: j.symptomId }));
    }
  }
};
