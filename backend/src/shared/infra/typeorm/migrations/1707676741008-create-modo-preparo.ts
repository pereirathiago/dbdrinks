import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createModoPreparo1707676741008 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'modo_preparo',
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
                        name: 'passo',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'descricao',
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
                        name: 'FKDrinkModoPreparoDrinkId',
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
        await queryRunner.dropTable('modo_preparo');
    }

}
