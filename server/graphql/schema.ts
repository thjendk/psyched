import { gql } from 'apollo-server-express';
import { typeDefs as User, resolvers as UserResolvers } from './types/user';
import { typeDefs as Diagnosis, resolvers as DiagnosisResolvers } from './types/diagnosis';
import { typeDefs as Symptom, resolvers as SymptomResolvers } from './types/symptom';
import { groupTypeDefs, groupResolvers } from './types/group.type';

const Query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [Query, User, Diagnosis, Symptom, groupTypeDefs];
export const resolvers = [UserResolvers, DiagnosisResolvers, SymptomResolvers, groupResolvers];
