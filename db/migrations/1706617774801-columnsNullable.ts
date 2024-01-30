import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnsNullable1706617774801 implements MigrationInterface {
    name = 'ColumnsNullable1706617774801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "developer" ALTER COLUMN "cleAPI" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "developer" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "developer" ALTER COLUMN "notes" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "developer" ALTER COLUMN "notes" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "developer" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "developer" ALTER COLUMN "cleAPI" SET NOT NULL`);
    }

}
