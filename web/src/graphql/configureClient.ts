import { ApolloClient, InMemoryCache } from '@apollo/client'
import { resolvers } from './resolvers'

export function configureClient() {
  const cache = new InMemoryCache()
  return new ApolloClient({ cache, resolvers })
}
