import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1706707853711 implements MigrationInterface {
    name = 'Initial1706707853711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "developer" ("id" SERIAL NOT NULL, "cleAPI" character varying, "entreprise" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying, "notes" character varying, CONSTRAINT "UQ_355a0554b5c8e204d35b2aa95cd" UNIQUE ("cleAPI"), CONSTRAINT "UQ_5ebaa074f112ad8e780e4da723f" UNIQUE ("entreprise"), CONSTRAINT "PK_71b846918f80786eed6bfb68b77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consumer" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "solde" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0b2593f4601955e13f567d2aede" UNIQUE ("email"), CONSTRAINT "PK_85625b4d465d3aa0eb905127822" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "consumer"`);
        await queryRunner.query(`DROP TABLE "developer"`);
    }

}
