import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1704457179139 implements MigrationInterface {
    name = 'NewMigration1704457179139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "password" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "password" character varying NOT NULL`);
    }

}
