import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLink1707677051491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'links',
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
                        name: 'link',
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
                        name: 'FKDrinkLinkDrinkId',
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
        await queryRunner.dropTable('links');
    }

}
