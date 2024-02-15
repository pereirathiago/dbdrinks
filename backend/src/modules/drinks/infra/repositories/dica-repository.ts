import { IDicaRepository } from "@modules/drinks/repositories/i-dica-repository";
import { HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers";
import { Brackets, Repository, getRepository } from "typeorm";
import { Dica } from "../entities/dica";
import { IDicaDTO } from "@modules/drinks/dtos/i-dica-dto";
import { AppError } from "@shared/errors/app-error";

class DicaRepository implements IDicaRepository {
  private repository: Repository<Dica>

  constructor() {
    this.repository = getRepository(Dica)
  }


  // create
  async create({
    drinkId,
    dica,
  }: IDicaDTO): Promise<HttpResponse> {
    const dicaC = this.repository.create({
      drinkId,
      dica,
    })

    const result = await this.repository.save(dicaC)
      .then(dicaResult => {
        return ok(dicaResult)
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
      "dica",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('dic')
        .select([
          'dic.id as "id"',
          'dic.dica as "dica"',
          'dic.drinkId as "drinkId"',
          'dri.nome as "drinkNome"',
        ])
        .leftJoin('drinks', 'dri', 'dri.id = dic.drinkId')

      if (filter) {
        query = query
          .where(filter)
      }

      const dicas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(dic.dica AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(dri.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('dic.dica', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(dicas)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select(filter: string): Promise<HttpResponse> {
    try {
      const dica = await this.repository.createQueryBuilder('dic')
        .select([
          'dic.id as "value"',
          'dic.dica as "label"',
        ])
        .where('dic.dica ilike :filter', { filter: `${filter}%` })
        .addOrderBy('dic.dica')
        .getRawMany()

      return ok(dica)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const dicas = await this.repository.createQueryBuilder('dic')
        .select([
          'dic.id as "value"',
          'dic.dica as "label"',
        ])
        .where('dic.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(dicas)
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
      let query = this.repository.createQueryBuilder('dic')
        .select([
          'dic.id as "id"',
        ])
        .leftJoin('drinks', 'dri', 'dri.id = dic.drinkId')

      if (filter) {
        query = query
          .where(filter)
      }

      const dica = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(dic.dica AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(dri.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: dica.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const dicas = await this.repository.createQueryBuilder('dic')
        .select([
          'dic.id as "id"',
          'dic.dica as "dica"',
          'dic.drinkId as "drinkId"',
          'dri.nome as "drinkNome"',
        ])
        .leftJoin('drinks', 'dri', 'dri.id = dic.drinkId')
        .where('dic.id = :id', { id })
        .getRawOne()

      if (typeof dicas === 'undefined') {
        return noContent()
      }

      return ok(dicas)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update({
    id,
    drinkId,
    dica,
  }: IDicaDTO): Promise<HttpResponse> {
    const dicas = await this.repository.findOne(id)

    if (!dicas) {
      return notFound()
    }

    const newdica = this.repository.create({
      id,
      drinkId,
      dica,
    })

    try {
      await this.repository.save(newdica)

      return ok(newdica)
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

export { DicaRepository }