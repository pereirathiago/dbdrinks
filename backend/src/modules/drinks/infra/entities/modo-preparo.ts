import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid'
import { Drink } from "./drink";


@Entity('modo_preparo')
class ModoPreparo {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Drink,{ nullable: true, eager: true })
  @JoinColumn({ name: 'drink_id', referencedColumnName: 'id' })
  drinkId?: string

  @Column({ name: 'passo', nullable: true })
  passo?: number

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

export { ModoPreparo }