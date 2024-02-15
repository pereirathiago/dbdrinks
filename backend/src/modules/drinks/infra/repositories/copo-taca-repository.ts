import { ICopoTacaRepository } from "@modules/drinks/repositories/i-copo-taca-repository";
import { HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers";
import { Brackets, Repository, getRepository } from "typeorm";
import { CopoTaca } from "../entities/copo-taca";
import { ICopoTacaDTO } from "@modules/drinks/dtos/i-copo-taca-dto";
import { AppError } from "@shared/errors/app-error";

class CopoTacaRepository implements ICopoTacaRepository {
  private repository: Repository<CopoTaca>

  constructor() {
    this.repository = getRepository(CopoTaca)
  }


  // create
  async create({
    nome,
    descricao,
  }: ICopoTacaDTO): Promise<HttpResponse> {
    const copoTaca = this.repository.create({
      nome,
      descricao,
    })

    const result = await this.repository.save(copoTaca)
      .then(copoTacaResult => {
        return ok(copoTacaResult)
      })
      .catch(error => {
        return serverError(error)
      })

    return result
  }


  // list
  async list(
    search: string, 
    page: number, 
    rowsPerPage: number, 
    order: string,
    filter: string
  ): Promise<HttpResponse> {
    let columnName: string
    let columnDirection: 'ASC' | 'DESC'

    if ((typeof (order) === 'undefined') || (order === "")) {
      columnName = 'nome'
      columnDirection = 'ASC'
    } else {
      columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
      columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
    }

    const referenceArray = [
      "nome",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('cop')
        .select([
          'cop.id as "id"',
          'cop.nome as "nome"',
          'cop.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const coposTacas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cop.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('cop.nome', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(coposTacas)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select(filter: string): Promise<HttpResponse> {
    try {
      const copoTaca = await this.repository.createQueryBuilder('cop')
        .select([
          'cop.id as "value"',
          'cop.nome as "label"',
        ])
        .where('cop.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('cop.nome')
        .getRawMany()

      return ok(copoTaca)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const coposTacas = await this.repository.createQueryBuilder('cop')
        .select([
          'cop.id as "value"',
          'cop.nome as "label"',
        ])
        .where('cop.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(coposTacas)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count(
    search: string,
    filter: string
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('cop')
        .select([
          'cop.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const copoTaca = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cop.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: copoTaca.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const coposTacas = await this.repository.createQueryBuilder('cop')
        .select([
          'cop.id as "id"',
          'cop.nome as "nome"',
          'cop.descricao as "descricao"',
        ])
        .where('cop.id = :id', { id })
        .getRawOne()

      if (typeof coposTacas === 'undefined') {
        return noContent()
      }

      return ok(coposTacas)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update({
    id,
    nome,
    descricao,
  }: ICopoTacaDTO): Promise<HttpResponse> {
    const coposTacas = await this.repository.findOne(id)

    if (!coposTacas) {
      return notFound()
    }

    const newcopoTaca = this.repository.create({
      id,
      nome,
      descricao,
    })

    try {
      await this.repository.save(newcopoTaca)

      return ok(newcopoTaca)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete(id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete(id)

      return noContent()
    } catch (err) {
      if (err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }


  // multi delete
  async multiDelete(ids: string[]): Promise<HttpResponse> {
    try {
      await this.repository.delete(ids)

      return noContent()
    } catch (err) {
      if (err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }

}

export { CopoTacaRepository }