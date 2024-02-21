import { IModoPreparoRepository } from "@modules/drinks/repositories/i-modo-preparo-repository";
import { HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers";
import { Brackets, Repository, getRepository } from "typeorm";
import { ModoPreparo } from "../entities/modo-preparo";
import { IModoPreparoDTO } from "@modules/drinks/dtos/i-modo-preparo-dto";
import { AppError } from "@shared/errors/app-error";

class ModoPreparoRepository implements IModoPreparoRepository {
  private repository: Repository<ModoPreparo>

  constructor() {
    this.repository = getRepository(ModoPreparo)
  }


  // create
  async create({
    drinkId,
    descricao,
    passo,
  }: IModoPreparoDTO): Promise<HttpResponse> {
    const modoPreparoC = this.repository.create({
      drinkId,
      descricao,
      passo,
    })

    const result = await this.repository.save(modoPreparoC)
      .then(modoPreparoResult => {
        return ok(modoPreparoResult)
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
      "passo",
      "descricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('mod')
        .select([
          'mod.id as "id"',
          'mod.descricao as "descricao"',
          'mod.passo as "passo"',
          'mod.drinkId as "drinkId"',
          'dri.nome as "drinkNome"',
        ])
        .leftJoin('drinks', 'dri', 'dri.id = mod.drinkId')

      if (filter) {
        query = query
          .where(filter)
      }

      const modoPreparos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(mod.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(dri.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('mod.passo', columnOrder[0])
        .addOrderBy('mod.descricao', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(modoPreparos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select(filter: string): Promise<HttpResponse> {
    try {
      const modoPreparo = await this.repository.createQueryBuilder('mod')
        .select([
          'mod.id as "value"',
          'mod.descricao as "label"',
        ])
        .where('mod.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('mod.descricao')
        .getRawMany()

      return ok(modoPreparo)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const modoPreparos = await this.repository.createQueryBuilder('mod')
        .select([
          'mod.id as "value"',
          'mod.descricao as "label"',
        ])
        .where('mod.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(modoPreparos)
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
      let query = this.repository.createQueryBuilder('mod')
        .select([
          'mod.id as "id"',
        ])
        .leftJoin('drinks', 'dri', 'dri.id = mod.drinkId')

      if (filter) {
        query = query
          .where(filter)
      }

      const modoPreparo = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(mod.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(dri.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: modoPreparo.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const modoPreparos = await this.repository.createQueryBuilder('mod')
        .select([
          'mod.id as "id"',
          'mod.descricao as "descricao"',
          'mod.passo as "passo"',
          'mod.drinkId as "drinkId"',
          'dri.nome as "drinkNome"',
        ])
        .leftJoin('drinks', 'dri', 'dri.id = mod.drinkId')
        .where('mod.id = :id', { id })
        .getRawOne()

      if (typeof modoPreparos === 'undefined') {
        return noContent()
      }

      return ok(modoPreparos)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update({
    id,
    drinkId,
    descricao,
    passo,
  }: IModoPreparoDTO): Promise<HttpResponse> {
    const modoPreparos = await this.repository.findOne(id)

    if (!modoPreparos) {
      return notFound()
    }

    const newModoPreparo = this.repository.create({
      id,
      drinkId,
      descricao,
      passo,
    })

    try {
      await this.repository.save(newModoPreparo)

      return ok(newModoPreparo)
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

export { ModoPreparoRepository }