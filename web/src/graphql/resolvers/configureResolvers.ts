import { fileEntryResolver } from './fileEntry'

const resolvers = [fileEntryResolver]

export const configureResolvers = (ctx: any) =>
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
