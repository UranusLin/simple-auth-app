import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'auth-db.sqlite3',
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
