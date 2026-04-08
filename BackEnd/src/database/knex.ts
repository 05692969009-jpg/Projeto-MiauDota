import Knex from 'knex';

export const db = Knex({
  client: 'mysql2',
  connection: {
    host: "localhost",
    user: "root",
    password: "senacrs",
    database:"miadb",
  },
});