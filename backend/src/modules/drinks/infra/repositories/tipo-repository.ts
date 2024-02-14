import { ITipoRepository } from "@modules/drinks/repositories/i-tipo-repository";
import { HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers";
import { Brackets, Repository, getRepository } from "typeorm";
import { Tipo } from "../entities/tipo";
import { ITipoDTO } from "@modules/drinks/dtos/i-tipo-dto";
import { AppError } from "@shared/errors/app-error";

class TipoRepository implements ITipoRepository {
  private repository: Repository<Tipo>

  constructor() {
    this.repository = getRepository(Tipo)
  }


  // create
  async create({
    nome,
    descricao,
  }: ITipoDTO): Promise<HttpResponse> {
    const tipo = this.repository.create({
      nome,
      descricao,
    })

    const result = await this.repository.save(tipo)
      .then(tipoResult => {
        return ok(tipoResult)
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
      let query = this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
          'tip.nome as "nome"',
          'tip.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const tipos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(tip.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('tip.nome', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(tipos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select(filter: string): Promise<HttpResponse> {
    try {
      const tipo = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "value"',
          'tip.nome as "label"',
        ])
        .where('tip.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('tip.nome')
        .getRawMany()

      return ok(tipo)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const tipos = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "value"',
          'tip.nome as "label"',
        ])
        .where('tip.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(tipos)
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
      let query = this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const tipo = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(tip.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: tipo.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const tipos = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
          'tip.nome as "nome"',
          'tip.descricao as "descricao"',
        ])
        .where('tip.id = :id', { id })
        .getRawOne()

      if (typeof tipos === 'undefined') {
        return noContent()
      }

      return ok(tipos)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update({
    id,
    nome,
    descricao,
  }: ITipoDTO): Promise<HttpResponse> {
    const tipos = await this.repository.findOne(id)

    if (!tipos) {
      return notFound()
    }

    const newtipo = this.repository.create({
      id,
      nome,
      descricao,
    })

    try {
      await this.repository.save(newtipo)

      return ok(newtipo)
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

export { TipoRepository }