import { ApolloClient, InMemoryCache } from '@apollo/client'
import { configureResolvers } from './resolvers'
import { FileManager } from '../core/file-manager'

export function configureClient() {
  const fileManager = new FileManager()
  const resolvers = configureResolvers({ fileManager })
  const cache = new InMemoryCache()

  return new ApolloClient({ cache, resolvers })
}
