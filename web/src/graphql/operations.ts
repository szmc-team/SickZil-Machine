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
  Blob: Blob
  File: File
}

export type CreateFileEntryInput = {
  file: Scalars['File']
}

export type DeleteFileEntryInput = {
  id: Scalars['ID']
}

export type FileEntry = {
  __typename?: 'FileEntry'
  id: Scalars['ID']
  blob: Scalars['Blob']
  name: Scalars['String']
  url: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createFileEntry: Scalars['ID']
  deleteFileEntry: Scalars['Boolean']
}

export type MutationCreateFileEntryArgs = {
  input: CreateFileEntryInput
}

export type MutationDeleteFileEntryArgs = {
  input: DeleteFileEntryInput
}

export type Query = {
  __typename?: 'Query'
  fileEntry: Maybe<FileEntry>
  fileEntries: Array<FileEntry>
}

export type QueryFileEntryArgs = {
  id: Scalars['ID']
}

export type CreateFileEntryMutationVariables = {
  input: CreateFileEntryInput
}

export type CreateFileEntryMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'createFileEntry'
>

export type DeleteFileEntryMutationVariables = {
  input: DeleteFileEntryInput
}

export type DeleteFileEntryMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteFileEntry'
>

export type FileEntriesQueryVariables = {}

export type FileEntriesQuery = { __typename?: 'Query' } & {
  fileEntries: Array<
    { __typename?: 'FileEntry' } & Pick<
      FileEntry,
      'id' | 'name' | 'blob' | 'url'
    >
  >
}

export type FileEntryQueryVariables = {
  id: Scalars['ID']
}

export type FileEntryQuery = { __typename?: 'Query' } & {
  fileEntry: Maybe<
    { __typename?: 'FileEntry' } & Pick<
      FileEntry,
      'id' | 'name' | 'blob' | 'url'
    >
  >
}

export const CreateFileEntryDocument = gql`
  mutation createFileEntry($input: CreateFileEntryInput!) {
    createFileEntry(input: $input) @client
  }
`
export type CreateFileEntryMutationFn = ApolloReactCommon.MutationFunction<
  CreateFileEntryMutation,
  CreateFileEntryMutationVariables
>

/**
 * __useCreateFileEntryMutation__
 *
 * To run a mutation, you first call `useCreateFileEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileEntryMutation, { data, loading, error }] = useCreateFileEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFileEntryMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateFileEntryMutation,
    CreateFileEntryMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateFileEntryMutation,
    CreateFileEntryMutationVariables
  >(CreateFileEntryDocument, baseOptions)
}
export type CreateFileEntryMutationHookResult = ReturnType<
  typeof useCreateFileEntryMutation
>
export type CreateFileEntryMutationResult = ApolloReactCommon.MutationResult<
  CreateFileEntryMutation
>
export type CreateFileEntryMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateFileEntryMutation,
  CreateFileEntryMutationVariables
>
export const DeleteFileEntryDocument = gql`
  mutation deleteFileEntry($input: DeleteFileEntryInput!) {
    deleteFileEntry(input: $input) @client
  }
`
export type DeleteFileEntryMutationFn = ApolloReactCommon.MutationFunction<
  DeleteFileEntryMutation,
  DeleteFileEntryMutationVariables
>

/**
 * __useDeleteFileEntryMutation__
 *
 * To run a mutation, you first call `useDeleteFileEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileEntryMutation, { data, loading, error }] = useDeleteFileEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteFileEntryMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteFileEntryMutation,
    DeleteFileEntryMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteFileEntryMutation,
    DeleteFileEntryMutationVariables
  >(DeleteFileEntryDocument, baseOptions)
}
export type DeleteFileEntryMutationHookResult = ReturnType<
  typeof useDeleteFileEntryMutation
>
export type DeleteFileEntryMutationResult = ApolloReactCommon.MutationResult<
  DeleteFileEntryMutation
>
export type DeleteFileEntryMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteFileEntryMutation,
  DeleteFileEntryMutationVariables
>
export const FileEntriesDocument = gql`
  query fileEntries {
    fileEntries @client {
      id
      name
      blob
      url
    }
  }
`

/**
 * __useFileEntriesQuery__
 *
 * To run a query within a React component, call `useFileEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFileEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFileEntriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFileEntriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FileEntriesQuery,
    FileEntriesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<FileEntriesQuery, FileEntriesQueryVariables>(
    FileEntriesDocument,
    baseOptions
  )
}
export function useFileEntriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FileEntriesQuery,
    FileEntriesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FileEntriesQuery,
    FileEntriesQueryVariables
  >(FileEntriesDocument, baseOptions)
}
export type FileEntriesQueryHookResult = ReturnType<typeof useFileEntriesQuery>
export type FileEntriesLazyQueryHookResult = ReturnType<
  typeof useFileEntriesLazyQuery
>
export type FileEntriesQueryResult = ApolloReactCommon.QueryResult<
  FileEntriesQuery,
  FileEntriesQueryVariables
>
export const FileEntryDocument = gql`
  query fileEntry($id: ID!) {
    fileEntry(id: $id) @client {
      id
      name
      blob
      url
    }
  }
`

/**
 * __useFileEntryQuery__
 *
 * To run a query within a React component, call `useFileEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFileEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFileEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFileEntryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FileEntryQuery,
    FileEntryQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<FileEntryQuery, FileEntryQueryVariables>(
    FileEntryDocument,
    baseOptions
  )
}
export function useFileEntryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FileEntryQuery,
    FileEntryQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<FileEntryQuery, FileEntryQueryVariables>(
    FileEntryDocument,
    baseOptions
  )
}
export type FileEntryQueryHookResult = ReturnType<typeof useFileEntryQuery>
export type FileEntryLazyQueryHookResult = ReturnType<
  typeof useFileEntryLazyQuery
>
export type FileEntryQueryResult = ApolloReactCommon.QueryResult<
  FileEntryQuery,
  FileEntryQueryVariables
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
