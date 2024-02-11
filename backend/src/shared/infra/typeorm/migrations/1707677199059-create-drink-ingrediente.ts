import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createDrinkIngrediente1707677199059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'drink_ingredientes',
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
                        name: 'ingrediente_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'quantidade',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'tipo_medida',
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
                        name: 'FKDrinkIngredienteDrinkId',
                        referencedTableName: 'drinks',
                        referencedColumnNames: ['id'],
                        columnNames: ['drink_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    },
                    {
                        name: 'FKDrinkIngredienteIngredienteId',
                        referencedTableName: 'ingredientes',
                        referencedColumnNames: ['id'],
                        columnNames: ['ingrediente_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('drink_ingredientes');
    }

}
