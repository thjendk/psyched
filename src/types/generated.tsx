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
  symptoms?: Maybe<Array<Maybe<DiagnosisSymptom>>>;
  parents?: Maybe<Array<Maybe<Diagnosis>>>;
  children?: Maybe<Array<Maybe<Diagnosis>>>;
};

export type DiagnosisInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  icdCode?: Maybe<Scalars['String']>;
};

export type DiagnosisSymptom = {
   __typename?: 'DiagnosisSymptom';
  point?: Maybe<Scalars['Int']>;
  symptom?: Maybe<Symptom>;
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
  addDiagnosisParent?: Maybe<Diagnosis>;
  removeDiagnosisParent?: Maybe<Diagnosis>;
  addSymptomToDiagnosis?: Maybe<Diagnosis>;
  updateDiagnosisSymptom?: Maybe<Diagnosis>;
  removeSymptomFromDiagnosis?: Maybe<Diagnosis>;
  createSymptom?: Maybe<Symptom>;
  updateSymptom?: Maybe<Symptom>;
  removeSymptom?: Maybe<Scalars['Int']>;
  addSymptomChild?: Maybe<Symptom>;
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


export type MutationAddDiagnosisParentArgs = {
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
};


export type MutationRemoveDiagnosisParentArgs = {
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
};


export type MutationAddSymptomToDiagnosisArgs = {
  diagnosisId?: Maybe<Scalars['Int']>;
  symptomId?: Maybe<Scalars['Int']>;
};


export type MutationUpdateDiagnosisSymptomArgs = {
  dianosisId?: Maybe<Scalars['Int']>;
  symptomId?: Maybe<Scalars['Int']>;
};


export type MutationRemoveSymptomFromDiagnosisArgs = {
  diagnosisId?: Maybe<Scalars['Int']>;
  symptomId?: Maybe<Scalars['Int']>;
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


export type MutationAddSymptomChildArgs = {
  id?: Maybe<Scalars['Int']>;
  childId?: Maybe<Scalars['Int']>;
};

export type Query = {
   __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  diagnoses?: Maybe<Array<Maybe<Diagnosis>>>;
  symptoms?: Maybe<Array<Maybe<Symptom>>>;
};

export type Symptom = {
   __typename?: 'Symptom';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  parents?: Maybe<Array<Maybe<Symptom>>>;
  children?: Maybe<Array<Maybe<Symptom>>>;
};

export type SymptomInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};


export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


