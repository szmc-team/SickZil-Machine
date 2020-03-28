import * as Mutation from './Mutation'
import * as Query from './Query'

const resolvers = { Mutation, Query }

export function configureResolvers(ctx: any) {
  return Object.fromEntries(
    Object.entries(resolvers).map(([name, resolverObject]) => [
      name,
      Object.fromEntries(
        Object.entries(resolverObject).map(([name, resolverFn]) => [
          name,
          (root: any, args: any, context: any, info: any) =>
            resolverFn(root, args, { ...context, ...ctx }, info),
        ])
      ),
    ])
  )
}
