import { Pool } from 'pg'

export default new Pool({
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.dbport
});