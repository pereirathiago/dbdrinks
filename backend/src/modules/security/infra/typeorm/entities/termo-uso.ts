import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from './user'

@Entity('termo_uso')
class TermoUso {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'ip', nullable: true })
  ip?: string

  @Column({ name: 'modelo_dispositivo', nullable: true })
  modeloDispositivo?: string

  @CreateDateColumn({ name: 'hora_aceito', nullable: true })
  horaAceito?: Date

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId?: string

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

export { TermoUso }
