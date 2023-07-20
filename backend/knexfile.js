/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// module.exports = {

//     development: {
//       client: 'pg',
//       connection: {
//         host: '127.0.0.1',
//         password: 'docker',
//         user: 'postgres',
//         port: 5432,
//         database: 'zcrudappdb'
//       }
//     }
  
//   };

  module.exports = {

    development: {
      client: 'pg',
      connection: process.env.DB_CONNECTION_STRING
    }
  
  };