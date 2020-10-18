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

let authorId;

beforeAll(async () => {
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
  authorId = res.data.createAuthor.id;
  return res;
});

describe('Create Book Mutation', () => {
  it('should not create book with empty name', async () => {
    const createBook = gql`
      mutation {
        createBook(
          data: {
            name: "", 
            pageCount: 100, 
            authorId: ${authorId}
          }
        ) {
          id,
          name,
          pageCount
        }
      }
      `;
    expect(client.mutate({
      mutation: createBook
    })).rejects.toThrow();
  });

  it('should not create book with name as number', async () => {
    const createBook = gql`
      mutation {
        createBook(
          data: {
            name: 1, 
            pageCount: 100, 
            authorId: ${authorId}
          }
        ) {
          id,
          name,
          pageCount
        }
      }
      `;
    expect(client.mutate({
      mutation: createBook
    })).rejects.toThrow();
  });

  it('should not create book with pageCount as string', async () => {
    const createBook = gql`
      mutation {
        createBook(
          data: {
            name: 1, 
            pageCount: "100",
            authorId: ${authorId}      
          }
        ) {
          id,
          name,
          pageCount
        }
      }
      `;
    expect(client.mutate({
      mutation: createBook
    })).rejects.toThrow();
  });

  it('should not create book without author ID', async () => {
    const createBook = gql`
      mutation {
        createBook(
          data: {
            name: 1, 
            pageCount: 100         
          }
        ) {
          id,
          name,
          pageCount
        }
      }
      `;
    expect(client.mutate({
      mutation: createBook
    })).rejects.toThrow();
  });

  it('should create book', async () => {
    const createBook = gql`
      mutation {
        createBook(
          data: {
            name: "Some Book", 
            pageCount: 100, 
            authorId: ${authorId}
          }
        ) {
          id,
          name,
          pageCount
        }
      }
      `;

    const res = await client.mutate({
      mutation: createBook
    });
    expect(res.data.createBook.name).toBe('Some Book');
  });
});

describe('Get books query', () => {
  it('should get books', async () => {
    const getBooks = gql`
      query {
        books{
          id,
          name,
          pageCount,
          authorId
        }
      }
      `;

    const res = await client.query({
      query : getBooks
    });
    expect(res.data.books.length).toBeGreaterThan(0);
  });

  it('should get books with authors', async () => {
    const getBooks = gql`
      query {
        books{
          id,
          name,
          pageCount,
          author {
            id, 
            name
          }
        }
      }
      `;

    const res = await client.query({
      query : getBooks
    });
    expect(res.data.books.length).toBeGreaterThan(0);
    expect(res.data.books[0].author.name).toBeTruthy();
  });
});