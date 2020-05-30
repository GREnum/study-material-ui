import { MigrationInterface, QueryRunner } from "typeorm";

export class StartProjectMigration1509619858952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.insert("setting", { code: "loginStock" });
        queryRunner.insert("setting", { code: "passwordStock" });
        queryRunner.insert("setting", { code: "cartText" });
        queryRunner.insert("setting", { code: "productText" });
        queryRunner.insert("setting", { code: "orderComment" });
        queryRunner.insert("user", { name: "admin", password: "74913f5cd5f61ec0bcfdb775414c2fb3d161b620", isAdmin: true });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
