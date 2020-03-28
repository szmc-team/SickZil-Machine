import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  File: File
}

export type CreateFileInput = {
  file: Scalars['File']
}

export type Mutation = {
  __typename?: 'Mutation'
  createFile: Scalars['ID']
}

export type MutationCreateFileArgs = {
  input: CreateFileInput
}

export type Query = {
  __typename?: 'Query'
  file: Maybe<Scalars['File']>
}

export type QueryFileArgs = {
  id: Scalars['ID']
}

export type CreateFileMutationVariables = {
  input: CreateFileInput
}

export type CreateFileMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'createFile'
>

export type FileQueryVariables = {
  id: Scalars['ID']
}

export type FileQuery = { __typename?: 'Query' } & Pick<Query, 'file'>

export const CreateFileDocument = gql`
  mutation createFile($input: CreateFileInput!) {
    createFile(input: $input) @client
  }
`
export type CreateFileMutationFn = ApolloReactCommon.MutationFunction<
  CreateFileMutation,
  CreateFileMutationVariables
>

/**
 * __useCreateFileMutation__
 *
 * To run a mutation, you first call `useCreateFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileMutation, { data, loading, error }] = useCreateFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFileMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateFileMutation,
    CreateFileMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateFileMutation,
    CreateFileMutationVariables
  >(CreateFileDocument, baseOptions)
}
export type CreateFileMutationHookResult = ReturnType<
  typeof useCreateFileMutation
>
export type CreateFileMutationResult = ApolloReactCommon.MutationResult<
  CreateFileMutation
>
export type CreateFileMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateFileMutation,
  CreateFileMutationVariables
>
export const FileDocument = gql`
  query file($id: ID!) {
    file(id: $id) @client
  }
`

/**
 * __useFileQuery__
 *
 * To run a query within a React component, call `useFileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFileQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FileQuery, FileQueryVariables>
) {
  return ApolloReactHooks.useQuery<FileQuery, FileQueryVariables>(
    FileDocument,
    baseOptions
  )
}
export function useFileLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FileQuery,
    FileQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<FileQuery, FileQueryVariables>(
    FileDocument,
    baseOptions
  )
}
export type FileQueryHookResult = ReturnType<typeof useFileQuery>
export type FileLazyQueryHookResult = ReturnType<typeof useFileLazyQuery>
export type FileQueryResult = ApolloReactCommon.QueryResult<
  FileQuery,
  FileQueryVariables
>

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string
      name: string
      possibleTypes: {
        name: string
      }[]
    }[]
  }
}
const result: IntrospectionResultData = {
  __schema: {
    types: [],
  },
}
export default result
