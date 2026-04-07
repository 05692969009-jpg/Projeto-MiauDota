import Knex from 'knex';

export const db = Knex({
  client: 'mysql2',
  connection: {
    host: "",
    user: "",
    password: "",
    database:"",
  },
});