import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createDrink1707675436923 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'drinks',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'tipo_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'copo_taca_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'destilado_principal_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'categoria_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
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
                        name: 'FKTipoDrinkTipoId',
                        referencedTableName: 'tipos',
                        referencedColumnNames: ['id'],
                        columnNames: ['tipo_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    },
                    {
                        name: 'FKCopoTacaDrinkCopoTacaId',
                        referencedTableName: 'copos_tacas',
                        referencedColumnNames: ['id'],
                        columnNames: ['copo_taca_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    },
                    {
                        name: 'FKDestiladoPrincipalDrinkDestiladoPrincipalId',
                        referencedTableName: 'destilados_principais',
                        referencedColumnNames: ['id'],
                        columnNames: ['destilado_principal_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    },
                    {
                        name: 'FKCategoriaDrinkCategoriaId',
                        referencedTableName: 'categorias',
                        referencedColumnNames: ['id'],
                        columnNames: ['categoria_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('drinks');
    }

}
