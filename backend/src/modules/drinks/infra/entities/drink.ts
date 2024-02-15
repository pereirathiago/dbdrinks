import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid'
import { Tipo } from "./tipo";
import { CopoTaca } from "./copo-taca";
import { DestiladoPrincipal } from "./destilado-principal";
import { Categoria } from "./categoria";
import { Grupo } from "./grupo";


@Entity('drinks')
class Drink {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Tipo,{ nullable: true, eager: true })
  @JoinColumn({ name: 'tipo_id', referencedColumnName: 'id' })
  tipoId?: string

  @ManyToOne(() => CopoTaca,{ nullable: true, eager: true })
  @JoinColumn({ name: 'copo_taca_id', referencedColumnName: 'id' })
  copoTacaId?: string

  @ManyToOne(() => DestiladoPrincipal,{ nullable: true, eager: true })
  @JoinColumn({ name: 'destilado_principal_id', referencedColumnName: 'id' })
  destiladoPrincipalId?: string

  @ManyToOne(() => Categoria,{ nullable: true, eager: true })
  @JoinColumn({ name: 'categoria_id', referencedColumnName: 'id' })
  categoriaId?: string

  @ManyToOne(() => Grupo,{ nullable: true, eager: true })
  @JoinColumn({ name: 'grupo_id', referencedColumnName: 'id' })
  grupoId?: string

  @Column({ name: 'nome', nullable: true })
  nome?: string

  @Column({ name: 'descricao', nullable: true })
  descricao?: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Drink }