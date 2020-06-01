import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Diagnosis = {
   __typename?: 'Diagnosis';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  icdCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Maybe<Group>>>;
  parents?: Maybe<Array<Maybe<Diagnosis>>>;
  children?: Maybe<Array<Maybe<Diagnosis>>>;
};

export type DiagnosisGroupInput = {
  diagnosisId?: Maybe<Scalars['Int']>;
  groupId?: Maybe<Scalars['Int']>;
};

export type DiagnosisInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  icdCode?: Maybe<Scalars['String']>;
};

export type DiagnosisParentInput = {
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
};

export type Group = {
   __typename?: 'Group';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  diagnosis?: Maybe<Diagnosis>;
  parent?: Maybe<Group>;
  children?: Maybe<Array<Maybe<Group>>>;
  symptoms?: Maybe<Array<Maybe<Symptom>>>;
};

export type GroupInput = {
  name?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  diagnosisId?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createUser?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  logout?: Maybe<Scalars['String']>;
  createDiagnosis?: Maybe<Diagnosis>;
  updateDiagnosis?: Maybe<Diagnosis>;
  removeDiagnosis?: Maybe<Scalars['Int']>;
  diagnosisParent?: Maybe<Diagnosis>;
  createSymptom?: Maybe<Symptom>;
  updateSymptom?: Maybe<Symptom>;
  removeSymptom?: Maybe<Scalars['Int']>;
  symptomParent?: Maybe<Symptom>;
  addOrRemoveGroup?: Maybe<Diagnosis>;
  symptomGroup?: Maybe<Group>;
};


export type MutationCreateUserArgs = {
  data?: Maybe<UserInput>;
};


export type MutationLoginArgs = {
  data?: Maybe<UserInput>;
};


export type MutationCreateDiagnosisArgs = {
  data?: Maybe<DiagnosisInput>;
};


export type MutationUpdateDiagnosisArgs = {
  id?: Maybe<Scalars['Int']>;
  data?: Maybe<DiagnosisInput>;
};


export type MutationRemoveDiagnosisArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationDiagnosisParentArgs = {
  data?: Maybe<DiagnosisParentInput>;
};


export type MutationCreateSymptomArgs = {
  data?: Maybe<SymptomInput>;
};


export type MutationUpdateSymptomArgs = {
  id?: Maybe<Scalars['Int']>;
  data?: Maybe<SymptomInput>;
};


export type MutationRemoveSymptomArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationSymptomParentArgs = {
  data?: Maybe<SymptomParentInput>;
};


export type MutationAddOrRemoveGroupArgs = {
  data?: Maybe<GroupInput>;
};


export type MutationSymptomGroupArgs = {
  data?: Maybe<SymptomGroupInput>;
};

export type Query = {
   __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  diagnoses?: Maybe<Array<Maybe<Diagnosis>>>;
  symptoms?: Maybe<Array<Maybe<Symptom>>>;
  groups?: Maybe<Array<Maybe<Group>>>;
};

export type Symptom = {
   __typename?: 'Symptom';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  parent?: Maybe<Symptom>;
  children?: Maybe<Array<Maybe<Symptom>>>;
};

export type SymptomGroupInput = {
  groupId?: Maybe<Scalars['Int']>;
  symptomId?: Maybe<Scalars['Int']>;
};

export type SymptomInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type SymptomParentInput = {
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
};


export type User = {
   __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type UserInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


