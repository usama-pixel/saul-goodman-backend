module.exports = {
    type: 'postgres',
    host: 'localhost',
    database: 'law',
    username: 'postgres',
    password: '123',
    port: 5432,
    entities: ['dist/**/*.entity.js'],
    seeds: [`src/db/seeds/**/*{.ts,.js}`],
    factories: [`src/db/factories/**/*{.ts,.js}`],
}