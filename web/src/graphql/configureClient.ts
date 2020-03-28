import { ApolloClient, InMemoryCache } from '@apollo/client'
import { configureResolvers } from './resolvers'
import { configureFileManager } from '../core/file-manager'

export async function configureClient() {
  const fileManager = await configureFileManager(1024 * 1024)
  const resolvers = configureResolvers({ fileManager })
  const cache = new InMemoryCache()
  const client = new ApolloClient({ cache, resolvers })

  return client
}
