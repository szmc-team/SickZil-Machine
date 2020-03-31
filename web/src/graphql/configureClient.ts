import { ApolloClient, InMemoryCache } from '@apollo/client'
import { configureResolvers } from './resolvers'
import { FileManager } from '../core/file-manager'

export function configureClient() {
  const cache = new InMemoryCache()
  const fileManager = new FileManager()
  const resolvers = configureResolvers({ fileManager })

  return new ApolloClient({ cache, resolvers })
}
