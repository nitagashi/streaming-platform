const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
    genres: [GenreShow]
    seasons: [Season!]
  }

  type Episode {
    id: ID!
    name: String!
    description: String!
    number: Int!
    path: String
    image: String
  }

  type GenreShow {
    showId: ID!
    genreId: ID!
    genre: Genre!
  }

  type Genre {
    id: ID!
    name: String!
  }

  type Season {
    id: ID!
    name: String!
    poster_path: String
    season_number: Int!
    is_set: Boolean
    episodes: [Episode!]!
    showId: Int!
  }
  
  input GenreInput {
    id: ID!
  }
  
  input ShowInput {
    name: String!
    description: String!
    image: String
    banner: String
    genres: [GenreInput!]!
  }

  input EpisodeInput {
    name: String!
    description: String!
    number: Int!
    path: String
    image: String
  }

  input SeasonInput {
    name: String!
    poster_path: String
    season_number: Int!
    is_set: Boolean
    episodes: [EpisodeInput!]!
    showId: Int!
  }
  
  type SearchResult {
    results: [Show]
    total_results: Int
    total_pages: Int
  }

  type Query {
    shows: [Show!]!
    show(id: ID!): Show
    genres: [Genre]
    seasons(id: ID!): [Season!]
    season(id: ID!): Season!
    searchShows(query: String!, page: Int!): SearchResult
  }

  type Mutation {
    createShow(input:ShowInput!): Show!
    createSeason(input:SeasonInput!): Season!
    addEpisode(showId: ID!, name: String!, description: String!, number: Int!): Episode!
  }
`;

const resolvers = {
  Query: {
    shows: async () => {
      return prisma.show.findMany({
        include: { seasons: true },
      });
    },
    show: async (_, args) => {
      const data = await prisma.show.findUnique({
        where: { id: Number(args.id) },
        include: {
          genres: {
            include:{
              genre:true
            }
          },
        },
      });
      console.log(data.genres)
      return prisma.show.findUnique({
        where: { id: Number(args.id) },
        include: {
          genres: {
            include:{
              genre: true
            }
          },
        },
      });
    },
    genres: async () => {
      console.log(await prisma.genre.findMany())
      return prisma.genre.findMany();
    },
    seasons: async (_, args) => {
      console.log('Fetching season with ID:', args.id);
      const seasons = await prisma.season.findMany({
        where: { showId: Number(args.id) },
        include: { episodes: true },
      });
      console.log('Fetched seasons:', seasons);
      return seasons;
    },
    season: async (_, args) => {
      const seasons = await prisma.season.findMany({
        where: { id: Number(args.id) },
        include: { episodes: true },
      });
      return seasons;
    },
    searchShows: async (_, { query, page }) => {
      const itemsPerPage = 20;
      const skip = (page - 1) * itemsPerPage;

      try {
        const results = await prisma.show.findMany({
          where: {
            OR: [
              { name: { contains: query} },
            ],
          },
          include: { seasons: true },
          skip,
          take: itemsPerPage,
        });

        const total_results = await prisma.show.count({
          where: {
            OR: [
              { name: { contains: query} },
            ],
          },
        });

        const total_pages = Math.ceil(total_results / itemsPerPage);

        return {
          results,
          total_results,
          total_pages,
        };
      } catch (error) {
        throw new Error('Error fetching shows: ' + error.message);
      }
    },
  },
  Mutation: {
    createShow: async (_, data) => {
      const { input } = data
      return prisma.show.create({
        data: {
          name: input.name,
          description: input.description,
          image: input.image,
          banner: input.banner,
          genres: {
            create: input.genres.map((genre) => ({
              genre: {
                connect: { id: Number(genre.id) }
              }
            }))
          }
        }
      });
      
    },
    createSeason: async (_, data) => {
      const { input } = data
      return prisma.season.create({
        data: {
          name: input.name,
          poster_path: input.poster_path,
          season_number: input.season_number,
          showId: input.showId,
          is_set: input.is_set,
          episodes: {
            create: [
              ...input.episodes
            ]
          },
        }
      });
    },
    addEpisode: async (_, args) => {
      return prisma.episode.create({
        data: {
          name: args.name,
          description: args.description,
          number: args.number,
        },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});