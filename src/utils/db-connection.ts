import { Container, Token } from 'typedi';
import { createConnection, Connection } from 'typeorm';

const ConnectionToken = new Token<Connection>();

const initDatabaseConnection =
    async () => {
        // DB settings are set from ormconfig.json by default
        const connection = await createConnection();
        console.info('Database connection established');
        Container.set(ConnectionToken, connection);
    };

export {
    initDatabaseConnection,
    ConnectionToken
};