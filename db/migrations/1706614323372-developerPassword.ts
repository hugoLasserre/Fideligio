import { MigrationInterface, QueryRunner } from "typeorm";

export class DeveloperPassword1706614323372 implements MigrationInterface {
    name = 'DeveloperPassword1706614323372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "developer" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "password" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "developer" DROP COLUMN "password"`);
    }

}
