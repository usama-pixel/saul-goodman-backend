import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration21704227188762 implements MigrationInterface {
    name = 'TestMigration21704227188762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "check"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "check" boolean DEFAULT false`);
    }

}
