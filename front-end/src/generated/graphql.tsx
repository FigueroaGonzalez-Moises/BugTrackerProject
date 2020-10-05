import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getUsers?: Maybe<Array<UserData>>;
  getUser?: Maybe<User>;
  getProjectData: Array<ProjectData>;
  getProjectDataById: Array<ProjectData>;
  getProjectTickets: Array<ProjectTickets>;
  getProjectUsersById: Array<ProjectUsers>;
  getUserProjects?: Maybe<Array<UserProjects>>;
  getTickets: Array<TicketData>;
  getTicketDataById: Array<TicketData>;
  getUserTickets: Array<UserTicketsPlus>;
  getTicketProject: Array<ProjectsTickets>;
  getComments: Array<Comments>;
  getHistory: Array<History>;
};


export type QueryGetProjectDataByIdArgs = {
  projectid: Scalars['String'];
};


export type QueryGetProjectTicketsArgs = {
  id: Scalars['String'];
};


export type QueryGetProjectUsersByIdArgs = {
  projectid: Scalars['String'];
};


export type QueryGetTicketDataByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetTicketProjectArgs = {
  ticketid: Scalars['String'];
};


export type QueryGetCommentsArgs = {
  parentid: Scalars['Float'];
};


export type QueryGetHistoryArgs = {
  parentid: Scalars['Float'];
};

export type UserData = {
  __typename?: 'UserData';
  id: Scalars['Int'];
  email: Scalars['String'];
  role: Scalars['String'];
  username: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  username: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type ProjectData = {
  __typename?: 'ProjectData';
  projectid?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ProjectTickets = {
  __typename?: 'projectTickets';
  ticketid: Scalars['Int'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  submitter: Scalars['String'];
  developer: Scalars['String'];
  status: Scalars['String'];
};

export type ProjectUsers = {
  __typename?: 'projectUsers';
  id: Scalars['Int'];
  email: Scalars['String'];
  role: Scalars['String'];
  username: Scalars['String'];
};

export type UserProjects = {
  __typename?: 'UserProjects';
  id: Scalars['Int'];
  projectid: Scalars['Int'];
  userid: Scalars['Int'];
};

export type TicketData = {
  __typename?: 'TicketData';
  ticketid: Scalars['Int'];
  priority?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  submitter: Scalars['String'];
  developer: Scalars['String'];
  status: Scalars['String'];
  belongsto: Scalars['String'];
};

export type UserTicketsPlus = {
  __typename?: 'UserTicketsPlus';
  ticketid?: Maybe<Scalars['Int']>;
  userid?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  priority?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type ProjectsTickets = {
  __typename?: 'ProjectsTickets';
  id: Scalars['Int'];
  ticketid: Scalars['Int'];
  projectid: Scalars['Int'];
};

export type Comments = {
  __typename?: 'Comments';
  commentid: Scalars['Int'];
  comment: Scalars['String'];
  parentid: Scalars['Int'];
  commenterid: Scalars['Int'];
  commenter: Scalars['String'];
  createdAt: Scalars['String'];
};

export type History = {
  __typename?: 'History';
  id: Scalars['Int'];
  parentid: Scalars['Int'];
  propertyChanged: Scalars['String'];
  oldValue: Scalars['String'];
  newValue: Scalars['String'];
  dateChanged: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateRole: Scalars['Boolean'];
  login: AuthResponse;
  register: AuthResponse;
  logout: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  demoLogin: AuthResponse;
  addProject: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  setProjectDesc: Scalars['Boolean'];
  setProjectTitle: Scalars['Boolean'];
  removeProjectUser: Scalars['Boolean'];
  addProjectUser: Scalars['Boolean'];
  createTicket: Scalars['Boolean'];
  setTicketType: Scalars['Boolean'];
  setTicketStatus: Scalars['Boolean'];
  setTicketDesc: Scalars['Boolean'];
  setTicketTitle: Scalars['Boolean'];
  setTicketPriority: Scalars['Boolean'];
  setTicketDeveloper: Scalars['Boolean'];
  deleteTicket: Scalars['Boolean'];
  setTicketProject: Scalars['Boolean'];
  addComment: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  updateComment: Scalars['Boolean'];
  addTicketHistory: Scalars['Boolean'];
};


export type MutationUpdateRoleArgs = {
  id: Scalars['String'];
  role: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  lastname: Scalars['String'];
  firstname: Scalars['String'];
  username: Scalars['String'];
  role: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  userid: Scalars['String'];
};


export type MutationDemoLoginArgs = {
  role: Scalars['String'];
};


export type MutationAddProjectArgs = {
  users: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  projectid: Scalars['String'];
};


export type MutationSetProjectDescArgs = {
  projectid: Scalars['String'];
  description: Scalars['String'];
};


export type MutationSetProjectTitleArgs = {
  projectid: Scalars['String'];
  title: Scalars['String'];
};


export type MutationRemoveProjectUserArgs = {
  userid: Scalars['String'];
  projectid: Scalars['String'];
};


export type MutationAddProjectUserArgs = {
  userid: Scalars['String'];
  projectid: Scalars['String'];
};


export type MutationCreateTicketArgs = {
  belongsTo: Scalars['String'];
  status: Scalars['String'];
  developer: Scalars['String'];
  submitter: Scalars['String'];
  type: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  priority: Scalars['String'];
};


export type MutationSetTicketTypeArgs = {
  type: Scalars['String'];
  ticketid: Scalars['String'];
};


export type MutationSetTicketStatusArgs = {
  status: Scalars['String'];
  ticketid: Scalars['String'];
};


export type MutationSetTicketDescArgs = {
  desc: Scalars['String'];
  ticketid: Scalars['String'];
};


export type MutationSetTicketTitleArgs = {
  title: Scalars['String'];
  ticketid: Scalars['String'];
};


export type MutationSetTicketPriorityArgs = {
  priority: Scalars['String'];
  ticketid: Scalars['String'];
};


export type MutationSetTicketDeveloperArgs = {
  developer: Scalars['String'];
  ticketid: Scalars['String'];
};


export type MutationDeleteTicketArgs = {
  ticketid: Scalars['String'];
};


export type MutationSetTicketProjectArgs = {
  projectid: Scalars['String'];
  ticketid: Scalars['String'];
};


export type MutationAddCommentArgs = {
  parentid: Scalars['Float'];
  comment: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentid: Scalars['Float'];
};


export type MutationUpdateCommentArgs = {
  updatedMessage: Scalars['String'];
  commentid: Scalars['Float'];
};


export type MutationAddTicketHistoryArgs = {
  oldValue: Scalars['String'];
  newValue: Scalars['String'];
  propertyChanged: Scalars['String'];
  parentid: Scalars['Float'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type AddCommentMutationVariables = Exact<{
  comment: Scalars['String'];
  parentid: Scalars['Float'];
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addComment'>
);

export type AddProjectMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  users: Scalars['String'];
}>;


export type AddProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addProject'>
);

export type AddProjectUserMutationVariables = Exact<{
  projectid: Scalars['String'];
  userid: Scalars['String'];
}>;


export type AddProjectUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addProjectUser'>
);

export type AddTicketHistoryMutationVariables = Exact<{
  parentid: Scalars['Float'];
  propertyChanged: Scalars['String'];
  newValue: Scalars['String'];
  oldValue: Scalars['String'];
}>;


export type AddTicketHistoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addTicketHistory'>
);

export type CreateTicketMutationVariables = Exact<{
  priority: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  submitter: Scalars['String'];
  developer: Scalars['String'];
  status: Scalars['String'];
  belongsTo: Scalars['String'];
}>;


export type CreateTicketMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createTicket'>
);

export type DeleteCommentMutationVariables = Exact<{
  commentid: Scalars['Float'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeleteProjectMutationVariables = Exact<{
  projectid: Scalars['String'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProject'>
);

export type DeleteTicketMutationVariables = Exact<{
  ticketid: Scalars['String'];
}>;


export type DeleteTicketMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTicket'>
);

export type DeleteUserMutationVariables = Exact<{
  userid: Scalars['String'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type DemoLoginMutationVariables = Exact<{
  role: Scalars['String'];
}>;


export type DemoLoginMutation = (
  { __typename?: 'Mutation' }
  & { demoLogin: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken' | 'refreshToken'>
  ) }
);

export type GetCommentsQueryVariables = Exact<{
  parentid: Scalars['Float'];
}>;


export type GetCommentsQuery = (
  { __typename?: 'Query' }
  & { getComments: Array<(
    { __typename?: 'Comments' }
    & Pick<Comments, 'commentid' | 'comment' | 'commenter' | 'createdAt'>
  )> }
);

export type GetHistoryQueryVariables = Exact<{
  parentid: Scalars['Float'];
}>;


export type GetHistoryQuery = (
  { __typename?: 'Query' }
  & { getHistory: Array<(
    { __typename?: 'History' }
    & Pick<History, 'id' | 'propertyChanged' | 'oldValue' | 'newValue' | 'dateChanged'>
  )> }
);

export type GetProjectDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectDataQuery = (
  { __typename?: 'Query' }
  & { getProjectData: Array<(
    { __typename?: 'ProjectData' }
    & Pick<ProjectData, 'title' | 'description' | 'projectid'>
  )> }
);

export type GetProjectDataByIdQueryVariables = Exact<{
  projectid: Scalars['String'];
}>;


export type GetProjectDataByIdQuery = (
  { __typename?: 'Query' }
  & { getProjectDataById: Array<(
    { __typename?: 'ProjectData' }
    & Pick<ProjectData, 'title' | 'projectid' | 'description'>
  )> }
);

export type GetProjectUsersByIdQueryVariables = Exact<{
  projectid: Scalars['String'];
}>;


export type GetProjectUsersByIdQuery = (
  { __typename?: 'Query' }
  & { getProjectUsersById: Array<(
    { __typename?: 'projectUsers' }
    & Pick<ProjectUsers, 'id' | 'email' | 'role' | 'username'>
  )> }
);

export type GetTicketDataByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTicketDataByIdQuery = (
  { __typename?: 'Query' }
  & { getTicketDataById: Array<(
    { __typename?: 'TicketData' }
    & Pick<TicketData, 'ticketid' | 'priority' | 'title' | 'description' | 'type' | 'submitter' | 'developer' | 'status' | 'belongsto'>
  )> }
);

export type GetTicketProjectQueryVariables = Exact<{
  ticketid: Scalars['String'];
}>;


export type GetTicketProjectQuery = (
  { __typename?: 'Query' }
  & { getTicketProject: Array<(
    { __typename?: 'ProjectsTickets' }
    & Pick<ProjectsTickets, 'ticketid' | 'projectid'>
  )> }
);

export type GetTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTicketsQuery = (
  { __typename?: 'Query' }
  & { getTickets: Array<(
    { __typename?: 'TicketData' }
    & Pick<TicketData, 'ticketid' | 'priority' | 'title' | 'description' | 'type' | 'submitter' | 'developer' | 'status' | 'belongsto'>
  )> }
);

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'role' | 'username' | 'firstname' | 'lastname'>
  )> }
);

export type GetUserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProjectsQuery = (
  { __typename?: 'Query' }
  & { getUserProjects?: Maybe<Array<(
    { __typename?: 'UserProjects' }
    & Pick<UserProjects, 'projectid' | 'userid' | 'id'>
  )>> }
);

export type GetUserTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTicketsQuery = (
  { __typename?: 'Query' }
  & { getUserTickets: Array<(
    { __typename?: 'UserTicketsPlus' }
    & Pick<UserTicketsPlus, 'ticketid' | 'userid' | 'id' | 'priority' | 'type' | 'status'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken' | 'refreshToken'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type GetProjectTicketsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProjectTicketsQuery = (
  { __typename?: 'Query' }
  & { getProjectTickets: Array<(
    { __typename?: 'projectTickets' }
    & Pick<ProjectTickets, 'ticketid' | 'title' | 'description' | 'submitter' | 'developer' | 'status'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  role: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken' | 'refreshToken'>
  ) }
);

export type RemoveProjectUserMutationVariables = Exact<{
  userid: Scalars['String'];
  projectid: Scalars['String'];
}>;


export type RemoveProjectUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeProjectUser'>
);

export type SetProjectDescMutationVariables = Exact<{
  projectid: Scalars['String'];
  description: Scalars['String'];
}>;


export type SetProjectDescMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setProjectDesc'>
);

export type SetProjectTitleMutationVariables = Exact<{
  projectid: Scalars['String'];
  title: Scalars['String'];
}>;


export type SetProjectTitleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setProjectTitle'>
);

export type SetTicketDescMutationVariables = Exact<{
  ticketid: Scalars['String'];
  desc: Scalars['String'];
}>;


export type SetTicketDescMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTicketDesc'>
);

export type SetTicketDeveloperMutationVariables = Exact<{
  ticketid: Scalars['String'];
  developer: Scalars['String'];
}>;


export type SetTicketDeveloperMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTicketDeveloper'>
);

export type SetTicketPriorityMutationVariables = Exact<{
  ticketid: Scalars['String'];
  priority: Scalars['String'];
}>;


export type SetTicketPriorityMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTicketPriority'>
);

export type SetTicketProjectMutationVariables = Exact<{
  ticketid: Scalars['String'];
  projectid: Scalars['String'];
}>;


export type SetTicketProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTicketProject'>
);

export type SetTicketStatusMutationVariables = Exact<{
  ticketid: Scalars['String'];
  status: Scalars['String'];
}>;


export type SetTicketStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTicketStatus'>
);

export type SetTicketTitleMutationVariables = Exact<{
  ticketid: Scalars['String'];
  title: Scalars['String'];
}>;


export type SetTicketTitleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTicketTitle'>
);

export type SetTicketTypeMutationVariables = Exact<{
  ticketid: Scalars['String'];
  type: Scalars['String'];
}>;


export type SetTicketTypeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTicketType'>
);

export type UpdateCommentMutationVariables = Exact<{
  commentid: Scalars['Float'];
  updatedMessage: Scalars['String'];
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateComment'>
);

export type UpdateRoleMutationVariables = Exact<{
  role: Scalars['String'];
  id: Scalars['String'];
}>;


export type UpdateRoleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateRole'>
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers?: Maybe<Array<(
    { __typename?: 'UserData' }
    & Pick<UserData, 'id' | 'email' | 'role' | 'username' | 'firstname' | 'lastname'>
  )>> }
);


export const AddCommentDocument = gql`
    mutation addComment($comment: String!, $parentid: Float!) {
  addComment(comment: $comment, parentid: $parentid)
}
    `;
export type AddCommentMutationFn = ApolloReactCommon.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      parentid: // value for 'parentid'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, baseOptions);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = ApolloReactCommon.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const AddProjectDocument = gql`
    mutation addProject($title: String!, $description: String!, $users: String!) {
  addProject(title: $title, description: $description, users: $users)
}
    `;
export type AddProjectMutationFn = ApolloReactCommon.MutationFunction<AddProjectMutation, AddProjectMutationVariables>;

/**
 * __useAddProjectMutation__
 *
 * To run a mutation, you first call `useAddProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectMutation, { data, loading, error }] = useAddProjectMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      users: // value for 'users'
 *   },
 * });
 */
export function useAddProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>) {
        return ApolloReactHooks.useMutation<AddProjectMutation, AddProjectMutationVariables>(AddProjectDocument, baseOptions);
      }
export type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export type AddProjectMutationResult = ApolloReactCommon.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export const AddProjectUserDocument = gql`
    mutation addProjectUser($projectid: String!, $userid: String!) {
  addProjectUser(projectid: $projectid, userid: $userid)
}
    `;
export type AddProjectUserMutationFn = ApolloReactCommon.MutationFunction<AddProjectUserMutation, AddProjectUserMutationVariables>;

/**
 * __useAddProjectUserMutation__
 *
 * To run a mutation, you first call `useAddProjectUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectUserMutation, { data, loading, error }] = useAddProjectUserMutation({
 *   variables: {
 *      projectid: // value for 'projectid'
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useAddProjectUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddProjectUserMutation, AddProjectUserMutationVariables>) {
        return ApolloReactHooks.useMutation<AddProjectUserMutation, AddProjectUserMutationVariables>(AddProjectUserDocument, baseOptions);
      }
export type AddProjectUserMutationHookResult = ReturnType<typeof useAddProjectUserMutation>;
export type AddProjectUserMutationResult = ApolloReactCommon.MutationResult<AddProjectUserMutation>;
export type AddProjectUserMutationOptions = ApolloReactCommon.BaseMutationOptions<AddProjectUserMutation, AddProjectUserMutationVariables>;
export const AddTicketHistoryDocument = gql`
    mutation addTicketHistory($parentid: Float!, $propertyChanged: String!, $newValue: String!, $oldValue: String!) {
  addTicketHistory(parentid: $parentid, propertyChanged: $propertyChanged, newValue: $newValue, oldValue: $oldValue)
}
    `;
export type AddTicketHistoryMutationFn = ApolloReactCommon.MutationFunction<AddTicketHistoryMutation, AddTicketHistoryMutationVariables>;

/**
 * __useAddTicketHistoryMutation__
 *
 * To run a mutation, you first call `useAddTicketHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTicketHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTicketHistoryMutation, { data, loading, error }] = useAddTicketHistoryMutation({
 *   variables: {
 *      parentid: // value for 'parentid'
 *      propertyChanged: // value for 'propertyChanged'
 *      newValue: // value for 'newValue'
 *      oldValue: // value for 'oldValue'
 *   },
 * });
 */
export function useAddTicketHistoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTicketHistoryMutation, AddTicketHistoryMutationVariables>) {
        return ApolloReactHooks.useMutation<AddTicketHistoryMutation, AddTicketHistoryMutationVariables>(AddTicketHistoryDocument, baseOptions);
      }
export type AddTicketHistoryMutationHookResult = ReturnType<typeof useAddTicketHistoryMutation>;
export type AddTicketHistoryMutationResult = ApolloReactCommon.MutationResult<AddTicketHistoryMutation>;
export type AddTicketHistoryMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTicketHistoryMutation, AddTicketHistoryMutationVariables>;
export const CreateTicketDocument = gql`
    mutation createTicket($priority: String!, $title: String!, $description: String!, $type: String!, $submitter: String!, $developer: String!, $status: String!, $belongsTo: String!) {
  createTicket(priority: $priority, title: $title, description: $description, type: $type, submitter: $submitter, developer: $developer, status: $status, belongsTo: $belongsTo)
}
    `;
export type CreateTicketMutationFn = ApolloReactCommon.MutationFunction<CreateTicketMutation, CreateTicketMutationVariables>;

/**
 * __useCreateTicketMutation__
 *
 * To run a mutation, you first call `useCreateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTicketMutation, { data, loading, error }] = useCreateTicketMutation({
 *   variables: {
 *      priority: // value for 'priority'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      type: // value for 'type'
 *      submitter: // value for 'submitter'
 *      developer: // value for 'developer'
 *      status: // value for 'status'
 *      belongsTo: // value for 'belongsTo'
 *   },
 * });
 */
export function useCreateTicketMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTicketMutation, CreateTicketMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTicketMutation, CreateTicketMutationVariables>(CreateTicketDocument, baseOptions);
      }
export type CreateTicketMutationHookResult = ReturnType<typeof useCreateTicketMutation>;
export type CreateTicketMutationResult = ApolloReactCommon.MutationResult<CreateTicketMutation>;
export type CreateTicketMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTicketMutation, CreateTicketMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($commentid: Float!) {
  deleteComment(commentid: $commentid)
}
    `;
export type DeleteCommentMutationFn = ApolloReactCommon.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentid: // value for 'commentid'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = ApolloReactCommon.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($projectid: String!) {
  deleteProject(projectid: $projectid)
}
    `;
export type DeleteProjectMutationFn = ApolloReactCommon.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectid: // value for 'projectid'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, baseOptions);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = ApolloReactCommon.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const DeleteTicketDocument = gql`
    mutation deleteTicket($ticketid: String!) {
  deleteTicket(ticketid: $ticketid)
}
    `;
export type DeleteTicketMutationFn = ApolloReactCommon.MutationFunction<DeleteTicketMutation, DeleteTicketMutationVariables>;

/**
 * __useDeleteTicketMutation__
 *
 * To run a mutation, you first call `useDeleteTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTicketMutation, { data, loading, error }] = useDeleteTicketMutation({
 *   variables: {
 *      ticketid: // value for 'ticketid'
 *   },
 * });
 */
export function useDeleteTicketMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTicketMutation, DeleteTicketMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTicketMutation, DeleteTicketMutationVariables>(DeleteTicketDocument, baseOptions);
      }
export type DeleteTicketMutationHookResult = ReturnType<typeof useDeleteTicketMutation>;
export type DeleteTicketMutationResult = ApolloReactCommon.MutationResult<DeleteTicketMutation>;
export type DeleteTicketMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTicketMutation, DeleteTicketMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($userid: String!) {
  deleteUser(userid: $userid)
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const DemoLoginDocument = gql`
    mutation demoLogin($role: String!) {
  demoLogin(role: $role) {
    accessToken
    refreshToken
  }
}
    `;
export type DemoLoginMutationFn = ApolloReactCommon.MutationFunction<DemoLoginMutation, DemoLoginMutationVariables>;

/**
 * __useDemoLoginMutation__
 *
 * To run a mutation, you first call `useDemoLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDemoLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [demoLoginMutation, { data, loading, error }] = useDemoLoginMutation({
 *   variables: {
 *      role: // value for 'role'
 *   },
 * });
 */
export function useDemoLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DemoLoginMutation, DemoLoginMutationVariables>) {
        return ApolloReactHooks.useMutation<DemoLoginMutation, DemoLoginMutationVariables>(DemoLoginDocument, baseOptions);
      }
export type DemoLoginMutationHookResult = ReturnType<typeof useDemoLoginMutation>;
export type DemoLoginMutationResult = ApolloReactCommon.MutationResult<DemoLoginMutation>;
export type DemoLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<DemoLoginMutation, DemoLoginMutationVariables>;
export const GetCommentsDocument = gql`
    query getComments($parentid: Float!) {
  getComments(parentid: $parentid) {
    commentid
    comment
    commenter
    createdAt
  }
}
    `;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      parentid: // value for 'parentid'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, baseOptions);
      }
export function useGetCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, baseOptions);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = ApolloReactCommon.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const GetHistoryDocument = gql`
    query getHistory($parentid: Float!) {
  getHistory(parentid: $parentid) {
    id
    propertyChanged
    oldValue
    newValue
    dateChanged
  }
}
    `;

/**
 * __useGetHistoryQuery__
 *
 * To run a query within a React component, call `useGetHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHistoryQuery({
 *   variables: {
 *      parentid: // value for 'parentid'
 *   },
 * });
 */
export function useGetHistoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetHistoryQuery, GetHistoryQueryVariables>) {
        return ApolloReactHooks.useQuery<GetHistoryQuery, GetHistoryQueryVariables>(GetHistoryDocument, baseOptions);
      }
export function useGetHistoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetHistoryQuery, GetHistoryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetHistoryQuery, GetHistoryQueryVariables>(GetHistoryDocument, baseOptions);
        }
export type GetHistoryQueryHookResult = ReturnType<typeof useGetHistoryQuery>;
export type GetHistoryLazyQueryHookResult = ReturnType<typeof useGetHistoryLazyQuery>;
export type GetHistoryQueryResult = ApolloReactCommon.QueryResult<GetHistoryQuery, GetHistoryQueryVariables>;
export const GetProjectDataDocument = gql`
    query getProjectData {
  getProjectData {
    title
    description
    projectid
  }
}
    `;

/**
 * __useGetProjectDataQuery__
 *
 * To run a query within a React component, call `useGetProjectDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProjectDataQuery, GetProjectDataQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProjectDataQuery, GetProjectDataQueryVariables>(GetProjectDataDocument, baseOptions);
      }
export function useGetProjectDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProjectDataQuery, GetProjectDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProjectDataQuery, GetProjectDataQueryVariables>(GetProjectDataDocument, baseOptions);
        }
export type GetProjectDataQueryHookResult = ReturnType<typeof useGetProjectDataQuery>;
export type GetProjectDataLazyQueryHookResult = ReturnType<typeof useGetProjectDataLazyQuery>;
export type GetProjectDataQueryResult = ApolloReactCommon.QueryResult<GetProjectDataQuery, GetProjectDataQueryVariables>;
export const GetProjectDataByIdDocument = gql`
    query getProjectDataById($projectid: String!) {
  getProjectDataById(projectid: $projectid) {
    title
    projectid
    description
  }
}
    `;

/**
 * __useGetProjectDataByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectDataByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDataByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDataByIdQuery({
 *   variables: {
 *      projectid: // value for 'projectid'
 *   },
 * });
 */
export function useGetProjectDataByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProjectDataByIdQuery, GetProjectDataByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProjectDataByIdQuery, GetProjectDataByIdQueryVariables>(GetProjectDataByIdDocument, baseOptions);
      }
export function useGetProjectDataByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProjectDataByIdQuery, GetProjectDataByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProjectDataByIdQuery, GetProjectDataByIdQueryVariables>(GetProjectDataByIdDocument, baseOptions);
        }
export type GetProjectDataByIdQueryHookResult = ReturnType<typeof useGetProjectDataByIdQuery>;
export type GetProjectDataByIdLazyQueryHookResult = ReturnType<typeof useGetProjectDataByIdLazyQuery>;
export type GetProjectDataByIdQueryResult = ApolloReactCommon.QueryResult<GetProjectDataByIdQuery, GetProjectDataByIdQueryVariables>;
export const GetProjectUsersByIdDocument = gql`
    query getProjectUsersById($projectid: String!) {
  getProjectUsersById(projectid: $projectid) {
    id
    email
    role
    username
  }
}
    `;

/**
 * __useGetProjectUsersByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectUsersByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectUsersByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectUsersByIdQuery({
 *   variables: {
 *      projectid: // value for 'projectid'
 *   },
 * });
 */
export function useGetProjectUsersByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProjectUsersByIdQuery, GetProjectUsersByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProjectUsersByIdQuery, GetProjectUsersByIdQueryVariables>(GetProjectUsersByIdDocument, baseOptions);
      }
export function useGetProjectUsersByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProjectUsersByIdQuery, GetProjectUsersByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProjectUsersByIdQuery, GetProjectUsersByIdQueryVariables>(GetProjectUsersByIdDocument, baseOptions);
        }
export type GetProjectUsersByIdQueryHookResult = ReturnType<typeof useGetProjectUsersByIdQuery>;
export type GetProjectUsersByIdLazyQueryHookResult = ReturnType<typeof useGetProjectUsersByIdLazyQuery>;
export type GetProjectUsersByIdQueryResult = ApolloReactCommon.QueryResult<GetProjectUsersByIdQuery, GetProjectUsersByIdQueryVariables>;
export const GetTicketDataByIdDocument = gql`
    query getTicketDataById($id: String!) {
  getTicketDataById(id: $id) {
    ticketid
    priority
    title
    description
    type
    submitter
    developer
    status
    belongsto
  }
}
    `;

/**
 * __useGetTicketDataByIdQuery__
 *
 * To run a query within a React component, call `useGetTicketDataByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketDataByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketDataByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTicketDataByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTicketDataByIdQuery, GetTicketDataByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTicketDataByIdQuery, GetTicketDataByIdQueryVariables>(GetTicketDataByIdDocument, baseOptions);
      }
export function useGetTicketDataByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTicketDataByIdQuery, GetTicketDataByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTicketDataByIdQuery, GetTicketDataByIdQueryVariables>(GetTicketDataByIdDocument, baseOptions);
        }
export type GetTicketDataByIdQueryHookResult = ReturnType<typeof useGetTicketDataByIdQuery>;
export type GetTicketDataByIdLazyQueryHookResult = ReturnType<typeof useGetTicketDataByIdLazyQuery>;
export type GetTicketDataByIdQueryResult = ApolloReactCommon.QueryResult<GetTicketDataByIdQuery, GetTicketDataByIdQueryVariables>;
export const GetTicketProjectDocument = gql`
    query getTicketProject($ticketid: String!) {
  getTicketProject(ticketid: $ticketid) {
    ticketid
    projectid
  }
}
    `;

/**
 * __useGetTicketProjectQuery__
 *
 * To run a query within a React component, call `useGetTicketProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketProjectQuery({
 *   variables: {
 *      ticketid: // value for 'ticketid'
 *   },
 * });
 */
export function useGetTicketProjectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTicketProjectQuery, GetTicketProjectQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTicketProjectQuery, GetTicketProjectQueryVariables>(GetTicketProjectDocument, baseOptions);
      }
export function useGetTicketProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTicketProjectQuery, GetTicketProjectQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTicketProjectQuery, GetTicketProjectQueryVariables>(GetTicketProjectDocument, baseOptions);
        }
export type GetTicketProjectQueryHookResult = ReturnType<typeof useGetTicketProjectQuery>;
export type GetTicketProjectLazyQueryHookResult = ReturnType<typeof useGetTicketProjectLazyQuery>;
export type GetTicketProjectQueryResult = ApolloReactCommon.QueryResult<GetTicketProjectQuery, GetTicketProjectQueryVariables>;
export const GetTicketsDocument = gql`
    query getTickets {
  getTickets {
    ticketid
    priority
    title
    description
    type
    submitter
    developer
    status
    belongsto
  }
}
    `;

/**
 * __useGetTicketsQuery__
 *
 * To run a query within a React component, call `useGetTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTicketsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTicketsQuery, GetTicketsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTicketsQuery, GetTicketsQueryVariables>(GetTicketsDocument, baseOptions);
      }
export function useGetTicketsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTicketsQuery, GetTicketsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTicketsQuery, GetTicketsQueryVariables>(GetTicketsDocument, baseOptions);
        }
export type GetTicketsQueryHookResult = ReturnType<typeof useGetTicketsQuery>;
export type GetTicketsLazyQueryHookResult = ReturnType<typeof useGetTicketsLazyQuery>;
export type GetTicketsQueryResult = ApolloReactCommon.QueryResult<GetTicketsQuery, GetTicketsQueryVariables>;
export const GetUserDocument = gql`
    query getUser {
  getUser {
    id
    email
    role
    username
    firstname
    lastname
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserProjectsDocument = gql`
    query getUserProjects {
  getUserProjects {
    projectid
    userid
    id
  }
}
    `;

/**
 * __useGetUserProjectsQuery__
 *
 * To run a query within a React component, call `useGetUserProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, baseOptions);
      }
export function useGetUserProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, baseOptions);
        }
export type GetUserProjectsQueryHookResult = ReturnType<typeof useGetUserProjectsQuery>;
export type GetUserProjectsLazyQueryHookResult = ReturnType<typeof useGetUserProjectsLazyQuery>;
export type GetUserProjectsQueryResult = ApolloReactCommon.QueryResult<GetUserProjectsQuery, GetUserProjectsQueryVariables>;
export const GetUserTicketsDocument = gql`
    query getUserTickets {
  getUserTickets {
    ticketid
    userid
    id
    priority
    type
    status
  }
}
    `;

/**
 * __useGetUserTicketsQuery__
 *
 * To run a query within a React component, call `useGetUserTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTicketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserTicketsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserTicketsQuery, GetUserTicketsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserTicketsQuery, GetUserTicketsQueryVariables>(GetUserTicketsDocument, baseOptions);
      }
export function useGetUserTicketsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserTicketsQuery, GetUserTicketsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserTicketsQuery, GetUserTicketsQueryVariables>(GetUserTicketsDocument, baseOptions);
        }
export type GetUserTicketsQueryHookResult = ReturnType<typeof useGetUserTicketsQuery>;
export type GetUserTicketsLazyQueryHookResult = ReturnType<typeof useGetUserTicketsLazyQuery>;
export type GetUserTicketsQueryResult = ApolloReactCommon.QueryResult<GetUserTicketsQuery, GetUserTicketsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const GetProjectTicketsDocument = gql`
    query getProjectTickets($id: String!) {
  getProjectTickets(id: $id) {
    ticketid
    title
    description
    submitter
    developer
    status
  }
}
    `;

/**
 * __useGetProjectTicketsQuery__
 *
 * To run a query within a React component, call `useGetProjectTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectTicketsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectTicketsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProjectTicketsQuery, GetProjectTicketsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProjectTicketsQuery, GetProjectTicketsQueryVariables>(GetProjectTicketsDocument, baseOptions);
      }
export function useGetProjectTicketsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProjectTicketsQuery, GetProjectTicketsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProjectTicketsQuery, GetProjectTicketsQueryVariables>(GetProjectTicketsDocument, baseOptions);
        }
export type GetProjectTicketsQueryHookResult = ReturnType<typeof useGetProjectTicketsQuery>;
export type GetProjectTicketsLazyQueryHookResult = ReturnType<typeof useGetProjectTicketsLazyQuery>;
export type GetProjectTicketsQueryResult = ApolloReactCommon.QueryResult<GetProjectTicketsQuery, GetProjectTicketsQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $username: String!, $role: String!, $firstname: String!, $lastname: String!) {
  register(email: $email, password: $password, username: $username, role: $role, firstname: $firstname, lastname: $lastname) {
    accessToken
    refreshToken
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *      role: // value for 'role'
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveProjectUserDocument = gql`
    mutation removeProjectUser($userid: String!, $projectid: String!) {
  removeProjectUser(userid: $userid, projectid: $projectid)
}
    `;
export type RemoveProjectUserMutationFn = ApolloReactCommon.MutationFunction<RemoveProjectUserMutation, RemoveProjectUserMutationVariables>;

/**
 * __useRemoveProjectUserMutation__
 *
 * To run a mutation, you first call `useRemoveProjectUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectUserMutation, { data, loading, error }] = useRemoveProjectUserMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      projectid: // value for 'projectid'
 *   },
 * });
 */
export function useRemoveProjectUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveProjectUserMutation, RemoveProjectUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveProjectUserMutation, RemoveProjectUserMutationVariables>(RemoveProjectUserDocument, baseOptions);
      }
export type RemoveProjectUserMutationHookResult = ReturnType<typeof useRemoveProjectUserMutation>;
export type RemoveProjectUserMutationResult = ApolloReactCommon.MutationResult<RemoveProjectUserMutation>;
export type RemoveProjectUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveProjectUserMutation, RemoveProjectUserMutationVariables>;
export const SetProjectDescDocument = gql`
    mutation setProjectDesc($projectid: String!, $description: String!) {
  setProjectDesc(projectid: $projectid, description: $description)
}
    `;
export type SetProjectDescMutationFn = ApolloReactCommon.MutationFunction<SetProjectDescMutation, SetProjectDescMutationVariables>;

/**
 * __useSetProjectDescMutation__
 *
 * To run a mutation, you first call `useSetProjectDescMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetProjectDescMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setProjectDescMutation, { data, loading, error }] = useSetProjectDescMutation({
 *   variables: {
 *      projectid: // value for 'projectid'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useSetProjectDescMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetProjectDescMutation, SetProjectDescMutationVariables>) {
        return ApolloReactHooks.useMutation<SetProjectDescMutation, SetProjectDescMutationVariables>(SetProjectDescDocument, baseOptions);
      }
export type SetProjectDescMutationHookResult = ReturnType<typeof useSetProjectDescMutation>;
export type SetProjectDescMutationResult = ApolloReactCommon.MutationResult<SetProjectDescMutation>;
export type SetProjectDescMutationOptions = ApolloReactCommon.BaseMutationOptions<SetProjectDescMutation, SetProjectDescMutationVariables>;
export const SetProjectTitleDocument = gql`
    mutation setProjectTitle($projectid: String!, $title: String!) {
  setProjectTitle(projectid: $projectid, title: $title)
}
    `;
export type SetProjectTitleMutationFn = ApolloReactCommon.MutationFunction<SetProjectTitleMutation, SetProjectTitleMutationVariables>;

/**
 * __useSetProjectTitleMutation__
 *
 * To run a mutation, you first call `useSetProjectTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetProjectTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setProjectTitleMutation, { data, loading, error }] = useSetProjectTitleMutation({
 *   variables: {
 *      projectid: // value for 'projectid'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useSetProjectTitleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetProjectTitleMutation, SetProjectTitleMutationVariables>) {
        return ApolloReactHooks.useMutation<SetProjectTitleMutation, SetProjectTitleMutationVariables>(SetProjectTitleDocument, baseOptions);
      }
export type SetProjectTitleMutationHookResult = ReturnType<typeof useSetProjectTitleMutation>;
export type SetProjectTitleMutationResult = ApolloReactCommon.MutationResult<SetProjectTitleMutation>;
export type SetProjectTitleMutationOptions = ApolloReactCommon.BaseMutationOptions<SetProjectTitleMutation, SetProjectTitleMutationVariables>;
export const SetTicketDescDocument = gql`
    mutation setTicketDesc($ticketid: String!, $desc: String!) {
  setTicketDesc(ticketid: $ticketid, desc: $desc)
}
    `;
export type SetTicketDescMutationFn = ApolloReactCommon.MutationFunction<SetTicketDescMutation, SetTicketDescMutationVariables>;

/**
 * __useSetTicketDescMutation__
 *
 * To run a mutation, you first call `useSetTicketDescMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTicketDescMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTicketDescMutation, { data, loading, error }] = useSetTicketDescMutation({
 *   variables: {
 *      ticketid: // value for 'ticketid'
 *      desc: // value for 'desc'
 *   },
 * });
 */
export function useSetTicketDescMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTicketDescMutation, SetTicketDescMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTicketDescMutation, SetTicketDescMutationVariables>(SetTicketDescDocument, baseOptions);
      }
export type SetTicketDescMutationHookResult = ReturnType<typeof useSetTicketDescMutation>;
export type SetTicketDescMutationResult = ApolloReactCommon.MutationResult<SetTicketDescMutation>;
export type SetTicketDescMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTicketDescMutation, SetTicketDescMutationVariables>;
export const SetTicketDeveloperDocument = gql`
    mutation setTicketDeveloper($ticketid: String!, $developer: String!) {
  setTicketDeveloper(ticketid: $ticketid, developer: $developer)
}
    `;
export type SetTicketDeveloperMutationFn = ApolloReactCommon.MutationFunction<SetTicketDeveloperMutation, SetTicketDeveloperMutationVariables>;

/**
 * __useSetTicketDeveloperMutation__
 *
 * To run a mutation, you first call `useSetTicketDeveloperMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTicketDeveloperMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTicketDeveloperMutation, { data, loading, error }] = useSetTicketDeveloperMutation({
 *   variables: {
 *      ticketid: // value for 'ticketid'
 *      developer: // value for 'developer'
 *   },
 * });
 */
export function useSetTicketDeveloperMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTicketDeveloperMutation, SetTicketDeveloperMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTicketDeveloperMutation, SetTicketDeveloperMutationVariables>(SetTicketDeveloperDocument, baseOptions);
      }
export type SetTicketDeveloperMutationHookResult = ReturnType<typeof useSetTicketDeveloperMutation>;
export type SetTicketDeveloperMutationResult = ApolloReactCommon.MutationResult<SetTicketDeveloperMutation>;
export type SetTicketDeveloperMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTicketDeveloperMutation, SetTicketDeveloperMutationVariables>;
export const SetTicketPriorityDocument = gql`
    mutation setTicketPriority($ticketid: String!, $priority: String!) {
  setTicketPriority(ticketid: $ticketid, priority: $priority)
}
    `;
export type SetTicketPriorityMutationFn = ApolloReactCommon.MutationFunction<SetTicketPriorityMutation, SetTicketPriorityMutationVariables>;

/**
 * __useSetTicketPriorityMutation__
 *
 * To run a mutation, you first call `useSetTicketPriorityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTicketPriorityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTicketPriorityMutation, { data, loading, error }] = useSetTicketPriorityMutation({
 *   variables: {
 *      ticketid: // value for 'ticketid'
 *      priority: // value for 'priority'
 *   },
 * });
 */
export function useSetTicketPriorityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTicketPriorityMutation, SetTicketPriorityMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTicketPriorityMutation, SetTicketPriorityMutationVariables>(SetTicketPriorityDocument, baseOptions);
      }
export type SetTicketPriorityMutationHookResult = ReturnType<typeof useSetTicketPriorityMutation>;
export type SetTicketPriorityMutationResult = ApolloReactCommon.MutationResult<SetTicketPriorityMutation>;
export type SetTicketPriorityMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTicketPriorityMutation, SetTicketPriorityMutationVariables>;
export const SetTicketProjectDocument = gql`
    mutation setTicketProject($ticketid: String!, $projectid: String!) {
  setTicketProject(ticketid: $ticketid, projectid: $projectid)
}
    `;
export type SetTicketProjectMutationFn = ApolloReactCommon.MutationFunction<SetTicketProjectMutation, SetTicketProjectMutationVariables>;

/**
 * __useSetTicketProjectMutation__
 *
 * To run a mutation, you first call `useSetTicketProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTicketProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTicketProjectMutation, { data, loading, error }] = useSetTicketProjectMutation({
 *   variables: {
 *      ticketid: // value for 'ticketid'
 *      projectid: // value for 'projectid'
 *   },
 * });
 */
export function useSetTicketProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTicketProjectMutation, SetTicketProjectMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTicketProjectMutation, SetTicketProjectMutationVariables>(SetTicketProjectDocument, baseOptions);
      }
export type SetTicketProjectMutationHookResult = ReturnType<typeof useSetTicketProjectMutation>;
export type SetTicketProjectMutationResult = ApolloReactCommon.MutationResult<SetTicketProjectMutation>;
export type SetTicketProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTicketProjectMutation, SetTicketProjectMutationVariables>;
export const SetTicketStatusDocument = gql`
    mutation setTicketStatus($ticketid: String!, $status: String!) {
  setTicketStatus(ticketid: $ticketid, status: $status)
}
    `;
export type SetTicketStatusMutationFn = ApolloReactCommon.MutationFunction<SetTicketStatusMutation, SetTicketStatusMutationVariables>;

/**
 * __useSetTicketStatusMutation__
 *
 * To run a mutation, you first call `useSetTicketStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTicketStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTicketStatusMutation, { data, loading, error }] = useSetTicketStatusMutation({
 *   variables: {
 *      ticketid: // value for 'ticketid'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useSetTicketStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTicketStatusMutation, SetTicketStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTicketStatusMutation, SetTicketStatusMutationVariables>(SetTicketStatusDocument, baseOptions);
      }
export type SetTicketStatusMutationHookResult = ReturnType<typeof useSetTicketStatusMutation>;
export type SetTicketStatusMutationResult = ApolloReactCommon.MutationResult<SetTicketStatusMutation>;
export type SetTicketStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTicketStatusMutation, SetTicketStatusMutationVariables>;
export const SetTicketTitleDocument = gql`
    mutation setTicketTitle($ticketid: String!, $title: String!) {
  setTicketTitle(ticketid: $ticketid, title: $title)
}
    `;
export type SetTicketTitleMutationFn = ApolloReactCommon.MutationFunction<SetTicketTitleMutation, SetTicketTitleMutationVariables>;

/**
 * __useSetTicketTitleMutation__
 *
 * To run a mutation, you first call `useSetTicketTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTicketTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTicketTitleMutation, { data, loading, error }] = useSetTicketTitleMutation({
 *   variables: {
 *      ticketid: // value for 'ticketid'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useSetTicketTitleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTicketTitleMutation, SetTicketTitleMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTicketTitleMutation, SetTicketTitleMutationVariables>(SetTicketTitleDocument, baseOptions);
      }
export type SetTicketTitleMutationHookResult = ReturnType<typeof useSetTicketTitleMutation>;
export type SetTicketTitleMutationResult = ApolloReactCommon.MutationResult<SetTicketTitleMutation>;
export type SetTicketTitleMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTicketTitleMutation, SetTicketTitleMutationVariables>;
export const SetTicketTypeDocument = gql`
    mutation setTicketType($ticketid: String!, $type: String!) {
  setTicketType(ticketid: $ticketid, type: $type)
}
    `;
export type SetTicketTypeMutationFn = ApolloReactCommon.MutationFunction<SetTicketTypeMutation, SetTicketTypeMutationVariables>;

/**
 * __useSetTicketTypeMutation__
 *
 * To run a mutation, you first call `useSetTicketTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTicketTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTicketTypeMutation, { data, loading, error }] = useSetTicketTypeMutation({
 *   variables: {
 *      ticketid: // value for 'ticketid'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSetTicketTypeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTicketTypeMutation, SetTicketTypeMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTicketTypeMutation, SetTicketTypeMutationVariables>(SetTicketTypeDocument, baseOptions);
      }
export type SetTicketTypeMutationHookResult = ReturnType<typeof useSetTicketTypeMutation>;
export type SetTicketTypeMutationResult = ApolloReactCommon.MutationResult<SetTicketTypeMutation>;
export type SetTicketTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTicketTypeMutation, SetTicketTypeMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation updateComment($commentid: Float!, $updatedMessage: String!) {
  updateComment(commentid: $commentid, updatedMessage: $updatedMessage)
}
    `;
export type UpdateCommentMutationFn = ApolloReactCommon.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      commentid: // value for 'commentid'
 *      updatedMessage: // value for 'updatedMessage'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, baseOptions);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = ApolloReactCommon.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation updateRole($role: String!, $id: String!) {
  updateRole(role: $role, id: $id)
}
    `;
export type UpdateRoleMutationFn = ApolloReactCommon.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      role: // value for 'role'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, baseOptions);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = ApolloReactCommon.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const GetUsersDocument = gql`
    query getUsers {
  getUsers {
    id
    email
    role
    username
    firstname
    lastname
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<GetUsersQuery, GetUsersQueryVariables>;