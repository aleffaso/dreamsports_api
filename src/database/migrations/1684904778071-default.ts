import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1684904778071 implements MigrationInterface {
    name = 'Default1684904778071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "href" character varying NOT NULL, "src" character varying NOT NULL, "slug" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "colors" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sizes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_09ffc681886e25eb5ce3b319fab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "src" character varying NOT NULL, "main" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "rate" integer, "price" integer NOT NULL, "info" character varying NOT NULL, "description" character varying NOT NULL, "specifications" character varying NOT NULL, "inventory" integer NOT NULL, "slug" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "admin" boolean, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expiresIn" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "fullName" character varying, "phoneNumber" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "zipCode" character varying NOT NULL, "streetAddress" character varying NOT NULL, "numberAddress" character varying, "referenceAddress" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_categories_categories" ("productsId" uuid NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_8fd95511a998d598ff66d500933" PRIMARY KEY ("productsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_40e7da0284a5389344605de8da" ON "products_categories_categories" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e1d833224b5be535323207473f" ON "products_categories_categories" ("categoriesId") `);
        await queryRunner.query(`CREATE TABLE "products_brands_brands" ("productsId" uuid NOT NULL, "brandsId" integer NOT NULL, CONSTRAINT "PK_7846238d09bbf2b264160415827" PRIMARY KEY ("productsId", "brandsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c6eac4a9e3e005eb9d23df3786" ON "products_brands_brands" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bed1dd845ca9f15a07cf656b9" ON "products_brands_brands" ("brandsId") `);
        await queryRunner.query(`CREATE TABLE "products_colors_colors" ("productsId" uuid NOT NULL, "colorsId" integer NOT NULL, CONSTRAINT "PK_4a65be4f135cf89ed96ff568d24" PRIMARY KEY ("productsId", "colorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6fb2fb028d941cdf524c915f90" ON "products_colors_colors" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c2d8b6cd911f827638d49486e5" ON "products_colors_colors" ("colorsId") `);
        await queryRunner.query(`CREATE TABLE "products_sizes_sizes" ("productsId" uuid NOT NULL, "sizesId" integer NOT NULL, CONSTRAINT "PK_20480f058320e42168b1916b130" PRIMARY KEY ("productsId", "sizesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0801efda070836503c4d2fe861" ON "products_sizes_sizes" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ed24d3dcac72d9085e194354b4" ON "products_sizes_sizes" ("sizesId") `);
        await queryRunner.query(`CREATE TABLE "products_images_images" ("productsId" uuid NOT NULL, "imagesId" integer NOT NULL, CONSTRAINT "PK_6026db3396a9853484699de9365" PRIMARY KEY ("productsId", "imagesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7ee38a4cd167c44d94cb0be917" ON "products_images_images" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_57fbf176c86e29281369d65f3b" ON "products_images_images" ("imagesId") `);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_40e7da0284a5389344605de8dab" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_e1d833224b5be535323207473f1" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_brands_brands" ADD CONSTRAINT "FK_c6eac4a9e3e005eb9d23df37863" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_brands_brands" ADD CONSTRAINT "FK_2bed1dd845ca9f15a07cf656b9c" FOREIGN KEY ("brandsId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD CONSTRAINT "FK_6fb2fb028d941cdf524c915f90c" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD CONSTRAINT "FK_c2d8b6cd911f827638d49486e5e" FOREIGN KEY ("colorsId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD CONSTRAINT "FK_0801efda070836503c4d2fe8610" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD CONSTRAINT "FK_ed24d3dcac72d9085e194354b4e" FOREIGN KEY ("sizesId") REFERENCES "sizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_images_images" ADD CONSTRAINT "FK_7ee38a4cd167c44d94cb0be917a" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_images_images" ADD CONSTRAINT "FK_57fbf176c86e29281369d65f3b2" FOREIGN KEY ("imagesId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_images_images" DROP CONSTRAINT "FK_57fbf176c86e29281369d65f3b2"`);
        await queryRunner.query(`ALTER TABLE "products_images_images" DROP CONSTRAINT "FK_7ee38a4cd167c44d94cb0be917a"`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP CONSTRAINT "FK_ed24d3dcac72d9085e194354b4e"`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP CONSTRAINT "FK_0801efda070836503c4d2fe8610"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP CONSTRAINT "FK_c2d8b6cd911f827638d49486e5e"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP CONSTRAINT "FK_6fb2fb028d941cdf524c915f90c"`);
        await queryRunner.query(`ALTER TABLE "products_brands_brands" DROP CONSTRAINT "FK_2bed1dd845ca9f15a07cf656b9c"`);
        await queryRunner.query(`ALTER TABLE "products_brands_brands" DROP CONSTRAINT "FK_c6eac4a9e3e005eb9d23df37863"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_e1d833224b5be535323207473f1"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_40e7da0284a5389344605de8dab"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_57fbf176c86e29281369d65f3b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ee38a4cd167c44d94cb0be917"`);
        await queryRunner.query(`DROP TABLE "products_images_images"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed24d3dcac72d9085e194354b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0801efda070836503c4d2fe861"`);
        await queryRunner.query(`DROP TABLE "products_sizes_sizes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2d8b6cd911f827638d49486e5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6fb2fb028d941cdf524c915f90"`);
        await queryRunner.query(`DROP TABLE "products_colors_colors"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2bed1dd845ca9f15a07cf656b9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c6eac4a9e3e005eb9d23df3786"`);
        await queryRunner.query(`DROP TABLE "products_brands_brands"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1d833224b5be535323207473f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_40e7da0284a5389344605de8da"`);
        await queryRunner.query(`DROP TABLE "products_categories_categories"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "sizes"`);
        await queryRunner.query(`DROP TABLE "colors"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
