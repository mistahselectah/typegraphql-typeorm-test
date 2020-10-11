import "reflect-metadata";
import {initDatabaseConnection} from "./utils/db-connection";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server";
import {AuthorResolver} from "./resolvers/author-resolver";
import {BookResolver} from "./resolvers/book-resolver";

/*createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const author = new Author();
    author.name = "Timbersaw";
    await connection.manager.save(author);
    console.log("Saved a new user with id: " + author.id);

    console.log("Loading users from the database...");
    const authors = await connection.manager.find(Author);
    console.log("Loaded users: ", authors);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));*/

(async () => {

    await initDatabaseConnection();

    const schema = await buildSchema({
        resolvers: [
            AuthorResolver,
            BookResolver
        ]
    });

    const server = new ApolloServer({
        schema,
        playground: true
    });

    const { url } = await server.listen(3000);
    console.log(`GraphQL Server Started: ${url}`);
})();
