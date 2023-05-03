import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1683084079386 implements MigrationInterface {
    name = 'Default1683084079386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "colors" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "colors" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sizes" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sizes" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "images" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "images" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "sizes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "sizes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "created_at"`);
    }

}
