import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createDica1707676514111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'dicas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'drink_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'dica',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKDrinkDicaDrinkId',
                        referencedTableName: 'drinks',
                        referencedColumnNames: ['id'],
                        columnNames: ['drink_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('dicas');
    }

}
