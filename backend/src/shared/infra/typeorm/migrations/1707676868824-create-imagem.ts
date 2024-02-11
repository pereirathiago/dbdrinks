import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImagem1707676868824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'drink_imagens',
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
                  name: 'imagem_nome',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'imagem_alt',
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
                    name: 'FKDrinkDrinkImagemDrinkId',
                    referencedTableName: 'drinks',
                    referencedColumnNames: ['id'],
                    columnNames: ['drink_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                }
              ],
            })
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('drink_imagens');
    }

}
