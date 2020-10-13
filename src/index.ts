import "reflect-metadata";
import * as dotenv from 'dotenv';
import {initDatabaseConnection} from "./utils/db-connection";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server";
import {AuthorResolver} from "./resolvers/author-resolver";
import {BookResolver} from "./resolvers/book-resolver";
import {ApolloServerLoaderPlugin} from "type-graphql-dataloader";
import {getConnection} from "typeorm";

dotenv.config();

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
        playground: true,
        plugins: [
            ApolloServerLoaderPlugin({
                typeormGetConnection: getConnection,
            }),
        ],
    });

    const { url } = await server.listen(Number(process.env.APOLLO_PORT || 3000));
    console.log(`GraphQL Server Started: ${url}`);
})();
