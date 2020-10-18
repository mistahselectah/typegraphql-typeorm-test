const ApolloClient = require('apollo-boost').ApolloClient;
const createHttpLink = require('apollo-link-http').createHttpLink;
const InMemoryCache = require('apollo-boost').InMemoryCache;
const gql = require('graphql-tag');
const fetch = require('node-fetch');
const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:3000', fetch: fetch  }),
  cache: new InMemoryCache(),
  onError: (error) => { console.error(error) },
});

describe('Create Author Mutation', () => {
  it('should not create author with empty name', async () => {
    const createAuthor = gql`
      mutation {
        createAuthor(
          data: {
            name: "",
          }
        ) {
          id,
          name
        }
      }
      `;
    expect(client.mutate({
      mutation: createAuthor
    })).rejects.toThrow();
  });

  it('should not create author with name as number', async () => {
    const createAuthor = gql`
      mutation {
        createAuthor(
          data: {
            name: 1,
          }
        ) {
          id,
          name
        }
      }
      `;
    expect(client.mutate({
      mutation: createAuthor
    })).rejects.toThrow();
  });

  it('should create author', async () => {
    const createAuthor = gql`
      mutation {
        createAuthor(
          data: {
            name: "Some Author",
          }
        ) {
          id,
          name
        }
      }
      `;

    const res = await client.mutate({
      mutation: createAuthor
    });
    expect(res.data.createAuthor.name).toBe('Some Author');
  });
});