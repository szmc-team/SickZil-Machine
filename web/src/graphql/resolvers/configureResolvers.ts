import { fileEntryResolver } from './fileEntry'
import { ResolverContext } from '../types'

const resolvers = [fileEntryResolver]

export const configureResolvers = (ctx: ResolverContext) =>
  resolvers.map(resolver =>
    Object.fromEntries(
      Object.entries<any>(resolver).map(([name, resolverObject]) => [
        name,
        Object.fromEntries(
          Object.entries<any>(resolverObject).map(([name, resolverFn]) => [
            name,
            (root: any, args: any, context: any, info: any) =>
              resolverFn(root, args, { ...context, ...ctx }, info),
          ])
        ),
      ])
    )
  )
