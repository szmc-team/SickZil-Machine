import { ApolloClient, InMemoryCache } from '@apollo/client'
import { resolvers } from './resolvers'

export function configureClient() {
  const cache = new InMemoryCache()
  const client = new ApolloClient({ cache, resolvers })

  return client
}
