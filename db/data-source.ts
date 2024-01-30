import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432, // Votre port PostgreSQL
  username: 'fideligio-user',
  password: '1234',
  database: 'fideligio',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migrations',
  // synchronize: true, // À n'utiliser qu'en développement pour synchroniser automatiquement le schéma avec la base de données
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
