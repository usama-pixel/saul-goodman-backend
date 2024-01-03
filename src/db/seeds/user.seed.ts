import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { UserRoles } from '../../auth/entities/user-roles.entity';

export default class UserSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(UserRoles)().createMany(1);
    }
}