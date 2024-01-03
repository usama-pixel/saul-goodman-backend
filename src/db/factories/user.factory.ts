import { UserRoles } from '../../auth/entities/user-roles.entity';
import { define } from "typeorm-seeding";

define(UserRoles, () => {
    const user = new UserRoles();
    user.types = 'user';
    return user;
})