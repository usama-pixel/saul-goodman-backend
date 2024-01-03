import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

export function createDataSourceOptions(configService: ConfigService): DataSourceOptions {
    console.log('check',configService.get('DB_PASSWORD'))
    return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'law',
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/db/migrations/*.js'],
    }
    // return {
    //     type: 'postgres',
    //     host: configService.get('DB_HOST'),
    //     port: +configService.get('DB_PORT'),
    //     username: configService.get('DB_USER'),
    //     password: configService.get('DB_PASSWORD'),
    //     entities: ['dist/**/*.entity.js'],
    //     migrations: ['dist/db/migrations/*.js'],
    // }
}
// console.log()
// export const dataSourceOptions: DataSourceOptions = {
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: +process.env.DB_PORT,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD+"",
//     entities: ['dist/**/*.entity.js'],
//     migrations: ['dist/db/migrations/*.js'],
// }


const dataSource = new DataSource(createDataSourceOptions(new ConfigService()))
export default dataSource