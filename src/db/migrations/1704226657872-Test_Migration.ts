import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1704226657872 implements MigrationInterface {
    name = 'TestMigration1704226657872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "check" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "check"`);
    }

}
