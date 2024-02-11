import { Brackets, getRepository, Repository } from 'typeorm'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'
import { ITermoUsoRepository } from '@modules/security/repositories/i-termo-uso-repository'
import { TermoUso } from '../entities/termo-uso'
import { ITermoUsoDTO } from '@modules/security/dtos/i-termo-uso-dto'

class TermoUsoRepository implements ITermoUsoRepository {
  private repository: Repository<TermoUso>

  constructor() {
    this.repository = getRepository(TermoUso)
  }


  // create
  async create({
    userId,
    ip,
    modeloDispositivo,
    horaAceito
  }: ITermoUsoDTO): Promise<HttpResponse> {
    const termoUso = this.repository.create({
      userId,
      ip,
      modeloDispositivo,
      horaAceito
    })

    const result = await this.repository.save(termoUso)
      .then(termoUsoResult => {
        return ok(termoUsoResult)
      })
      .catch(error => {
        return serverError(error)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
  ): Promise<HttpResponse> {
    let columnName: string
    let columnDirection: 'ASC' | 'DESC'

    if ((typeof(order) === 'undefined') || (order === "")) {
      columnName = 'nome'
      columnDirection = 'ASC'
    } else {
      columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
      columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
    }

    const referenceArray = [
      "userNome"
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('ter')
        .select([
          'ter.id as "id"',
          'ter.ip as "ip"',
          'a.id as "userId"',
          'a.name as "userNome"'
        ])
        .leftJoin('ter.userId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const termosUsoAceitos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.name AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(ter.ip AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.name', columnOrder[0])
        .addOrderBy('ter.ip', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(termosUsoAceitos)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count(
    search: string,
    filter?: string
  ): Promise<HttpResponse> {
    try {
      const termoUsoAceitos = await this.repository.createQueryBuilder('ter')
        .select([
          'ter.id as "id"',
        ])
        .getRawMany()

      return ok({ count: termoUsoAceitos.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // getById
  async getById(id: string): Promise<HttpResponse> {
    try {
      const termoUsoAceito = await this.repository.findOne(id)

      if (typeof termoUsoAceito === 'undefined') {
        return noContent()
      }

      return ok(termoUsoAceito)
    } catch (err) {
      return serverError(err)
    }
  }

  // getByEmail
  async getByEmail (email: string): Promise<HttpResponse> {
    try {
      const termoUsoAceito = await this.repository.createQueryBuilder('ter')
        .select([
          'ter.id as "id"',
          'ter.userId as "userId"',
          'use.name as "userNome"',
          'use.login as "userEmail"',
          'ter.modeloDispositivo as "modeloDispositivo"',
          'ter.horaAceito as "horaAceitada"'
        ])
        .leftJoin('users', 'use', 'ter.userId = use.id')
        .where('use.login = :email', { email })
        .getRawMany()

      if (typeof termoUsoAceito === 'undefined') {
        return noContent()
      }

      return ok(termoUsoAceito)
    } catch (err) {
      return serverError(err)
    }
  }

}

export { TermoUsoRepository }
