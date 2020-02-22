// Update with your config settings.

module.exports = {

  test: {
    client: 'mysql',
    connection: 'mysql://aryuuu:kolokopo@localhost/MatagiTest',
  },
  migrations: {
    directory: __dirname+'/db/migrations'
  },
  seeds: {
    directory: __dirname+'/db/seeds/test'
  },

  development: {
    client: 'mysql',
    connection: {
      database: 'MatagiTest',
      user:     'aryuuu',
      password: 'kolokopo'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },

  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URLs,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }

};
