import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type RootQuery {
    luckyNumber : Int
  }

  schema {
    query : RootQuery
  }
`

const resolvers = {
  RootQuery : {
    luckyNumber : () => Math.floor(Math.random() * 100) + 1
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

createApolloServer({
  schema
});
