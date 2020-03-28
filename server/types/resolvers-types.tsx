import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from 'config/apolloServer';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  symptoms?: Maybe<Array<Maybe<Symptom>>>;
  parents?: Maybe<Array<Maybe<Diagnosis>>>;
  children?: Maybe<Array<Maybe<Diagnosis>>>;
};

export type DiagnosisInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  icdCode?: Maybe<Scalars['String']>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Partial<Scalars['String']>>,
  User: ResolverTypeWrapper<Partial<User>>,
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>,
  Diagnosis: ResolverTypeWrapper<Partial<Diagnosis>>,
  Symptom: ResolverTypeWrapper<Partial<Symptom>>,
  Mutation: ResolverTypeWrapper<{}>,
  UserInput: ResolverTypeWrapper<Partial<UserInput>>,
  DiagnosisInput: ResolverTypeWrapper<Partial<DiagnosisInput>>,
  SymptomInput: ResolverTypeWrapper<Partial<SymptomInput>>,
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>,
  CacheControlScope: ResolverTypeWrapper<Partial<CacheControlScope>>,
  Upload: ResolverTypeWrapper<Partial<Scalars['Upload']>>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Partial<Scalars['String']>,
  User: Partial<User>,
  Int: Partial<Scalars['Int']>,
  Diagnosis: Partial<Diagnosis>,
  Symptom: Partial<Symptom>,
  Mutation: {},
  UserInput: Partial<UserInput>,
  DiagnosisInput: Partial<DiagnosisInput>,
  SymptomInput: Partial<SymptomInput>,
  Boolean: Partial<Scalars['Boolean']>,
  CacheControlScope: Partial<CacheControlScope>,
  Upload: Partial<Scalars['Upload']>,
}>;

export type DiagnosisResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Diagnosis'] = ResolversParentTypes['Diagnosis']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  icdCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  symptoms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Symptom']>>>, ParentType, ContextType>,
  parents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Diagnosis']>>>, ParentType, ContextType>,
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['Diagnosis']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, never>>,
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLoginArgs, never>>,
  logout?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createDiagnosis?: Resolver<Maybe<ResolversTypes['Diagnosis']>, ParentType, ContextType, RequireFields<MutationCreateDiagnosisArgs, never>>,
  updateDiagnosis?: Resolver<Maybe<ResolversTypes['Diagnosis']>, ParentType, ContextType, RequireFields<MutationUpdateDiagnosisArgs, never>>,
  removeDiagnosis?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveDiagnosisArgs, never>>,
  addDiagnosisParent?: Resolver<Maybe<ResolversTypes['Diagnosis']>, ParentType, ContextType, RequireFields<MutationAddDiagnosisParentArgs, never>>,
  removeDiagnosisParent?: Resolver<Maybe<ResolversTypes['Diagnosis']>, ParentType, ContextType, RequireFields<MutationRemoveDiagnosisParentArgs, never>>,
  addSymptomToDiagnosis?: Resolver<Maybe<ResolversTypes['Diagnosis']>, ParentType, ContextType, RequireFields<MutationAddSymptomToDiagnosisArgs, never>>,
  removeSymptomFromDiagnosis?: Resolver<Maybe<ResolversTypes['Diagnosis']>, ParentType, ContextType, RequireFields<MutationRemoveSymptomFromDiagnosisArgs, never>>,
  createSymptom?: Resolver<Maybe<ResolversTypes['Symptom']>, ParentType, ContextType, RequireFields<MutationCreateSymptomArgs, never>>,
  updateSymptom?: Resolver<Maybe<ResolversTypes['Symptom']>, ParentType, ContextType, RequireFields<MutationUpdateSymptomArgs, never>>,
  removeSymptom?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveSymptomArgs, never>>,
  addSymptomChild?: Resolver<Maybe<ResolversTypes['Symptom']>, ParentType, ContextType, RequireFields<MutationAddSymptomChildArgs, never>>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  diagnoses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Diagnosis']>>>, ParentType, ContextType>,
  symptoms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Symptom']>>>, ParentType, ContextType>,
}>;

export type SymptomResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Symptom'] = ResolversParentTypes['Symptom']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  parents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Symptom']>>>, ParentType, ContextType>,
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['Symptom']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Diagnosis?: DiagnosisResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Symptom?: SymptomResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
