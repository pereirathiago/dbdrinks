import { IGrupoRepository } from "@modules/drinks/repositories/i-grupo-repository";
import { HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers";
import { Brackets, Repository, getRepository } from "typeorm";
import { Grupo } from "../entities/grupo";
import { IGrupoDTO } from "@modules/drinks/dtos/i-grupo-dto";
import { AppError } from "@shared/errors/app-error";

class GrupoRepository implements IGrupoRepository {
  private repository: Repository<Grupo>

  constructor() {
    this.repository = getRepository(Grupo)
  }


  // create
  async create({
    nome,
    descricao,
  }: IGrupoDTO): Promise<HttpResponse> {
    const grupo = this.repository.create({
      nome,
      descricao,
    })

    const result = await this.repository.save(grupo)
      .then(grupoResult => {
        return ok(grupoResult)
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
      let query = this.repository.createQueryBuilder('gru')
        .select([
          'gru.id as "id"',
          'gru.nome as "nome"',
          'gru.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const grupos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(gru.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('gru.nome', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(grupos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select(filter: string): Promise<HttpResponse> {
    try {
      const grupo = await this.repository.createQueryBuilder('gru')
        .select([
          'gru.id as "value"',
          'gru.nome as "label"',
        ])
        .where('gru.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('gru.nome')
        .getRawMany()

      return ok(grupo)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const grupos = await this.repository.createQueryBuilder('gru')
        .select([
          'gru.id as "value"',
          'gru.nome as "label"',
        ])
        .where('gru.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(grupos)
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
      let query = this.repository.createQueryBuilder('gru')
        .select([
          'gru.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const grupo = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(gru.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: grupo.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const grupos = await this.repository.createQueryBuilder('gru')
        .select([
          'gru.id as "id"',
          'gru.nome as "nome"',
          'gru.descricao as "descricao"',
        ])
        .where('gru.id = :id', { id })
        .getRawOne()

      if (typeof grupos === 'undefined') {
        return noContent()
      }

      return ok(grupos)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update({
    id,
    nome,
    descricao,
  }: IGrupoDTO): Promise<HttpResponse> {
    const grupos = await this.repository.findOne(id)

    if (!grupos) {
      return notFound()
    }

    const newgrupo = this.repository.create({
      id,
      nome,
      descricao,
    })

    try {
      await this.repository.save(newgrupo)

      return ok(newgrupo)
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

export { GrupoRepository }