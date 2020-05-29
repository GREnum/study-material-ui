import { MigrationInterface, QueryRunner } from "typeorm";

export class StartProjectMigration1509619858952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.insert("setting", { code: "loginStock" });
        queryRunner.insert("setting", { code: "passwordStock" });
        queryRunner.insert("setting", { code: "cartText" });
        queryRunner.insert("setting", { co