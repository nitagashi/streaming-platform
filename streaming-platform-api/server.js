const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Define your GraphQL schema
const typeDefs = gql`
  type Show {
    id: ID!
    name: String!
    description: String!
    percentage: Float
    stars: Int
    image: String
    banner: String
    episodes: [Episode!]
    genres: [Genre!]
    seasons: [Season!]
  }

  type Episode {
    id: ID!
    name: String!
    description: String!
    number: Int
    path: String
    image: String
    subtitlePaths: [Subtitle!]
  }

  type Genre {
    id: ID!
    name: String!
  }

  type Subtitle {
    id: ID!
    language: String!
    path: String!
  }

  type Season {
    id: ID!
    name: String!
    poster_path: String
    season_number: Int
    is_set: Boolean
    episodes: [Episode!]
  }

  type Query {
    shows: [Show!]!
    show(id: ID!): Show
  }
  input ShowInput {
    name: String!
    description: String!
    image: String
    banner: String
  }

  type Mutation {
    createShow(input:ShowInput!): Show!
    addEpisode(showId: ID!, name: String!, description: String!, number: Int!): Episode!
  }
`;

// Define your resolvers to map the GraphQL schema to the database
const resolvers = {
  Query: {
    shows: async () => {
      return prisma.show.findMany({
        include: { episodes: true, genres: true, seasons: true },
      });
    },
    show: async (_, args) => {
      return prisma.show.findUnique({
        where: { id: Number(args.id) },
        include: { episodes: true, genres: true, seasons: true },
      });
    },
  },
  Mutation: {
    createShow: async (_, data) => {
      console.log(data)
      return prisma.show.create({
        data: data.input
      });
    },

    addEpisode: async (_, args) => {
      return prisma.episode.create({
        data: {
          name: args.name,
          description: args.description,
          number: args.number,
          show: {
            connect: { id: Number(args.showId) },
          },
        },
      });
    },
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
