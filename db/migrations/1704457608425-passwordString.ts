import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordString1704457608425 implements MigrationInterface {
    name = 'PasswordString1704457608425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "password" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "password" character varying NOT NULL`);
    }

}
