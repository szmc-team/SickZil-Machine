import { ApolloClient, InMemoryCache } from '@apollo/client'
import { configureResolvers } from './resolvers'
import { configureFileManager } from '../core/file-manager'

export function configureClient() {
  const fileManager = configureFileManager()
  const resolvers = configureResolvers({ fileManager })
  const cache = new InMemoryCache()

  return new ApolloClient({ cache, resolvers })
}
