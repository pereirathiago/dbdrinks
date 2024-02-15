import { IDestiladoPrincipalRepository } from "@modules/drinks/repositories/i-destilado-principal-repository";
import { HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers";
import { Brackets, Repository, getRepository } from "typeorm";
import { DestiladoPrincipal } from "../entities/destilado-principal";
import { IDestiladoPrincipalDTO } from "@modules/drinks/dtos/i-destilado-principal-dto";
import { AppError } from "@shared/errors/app-error";

class DestiladoPrincipalRepository implements IDestiladoPrincipalRepository {
  private repository: Repository<DestiladoPrincipal>

  constructor() {
    this.repository = getRepository(DestiladoPrincipal)
  }


  // create
  async create({
    nome,
    descricao,
  }: IDestiladoPrincipalDTO): Promise<HttpResponse> {
    const destiladoPrincipal = this.repository.create({
      nome,
      descricao,
    })

    const result = await this.repository.save(destiladoPrincipal)
      .then(destiladoPrincipalResult => {
        return ok(destiladoPrincipalResult)
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
      let query = this.repository.createQueryBuilder('des')
        .select([
          'des.id as "id"',
          'des.nome as "nome"',
          'des.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const destiladosPrincipais = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(des.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('des.nome', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(destiladosPrincipais)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select(filter: string): Promise<HttpResponse> {
    try {
      const destiladoPrincipal = await this.repository.createQueryBuilder('des')
        .select([
          'des.id as "value"',
          'des.nome as "label"',
        ])
        .where('des.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('des.nome')
        .getRawMany()

      return ok(destiladoPrincipal)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const destiladosPrincipais = await this.repository.createQueryBuilder('des')
        .select([
          'des.id as "value"',
          'des.nome as "label"',
        ])
        .where('des.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(destiladosPrincipais)
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
      let query = this.repository.createQueryBuilder('des')
        .select([
          'des.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const destiladoPrincipal = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(des.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: destiladoPrincipal.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const destiladosPrincipais = await this.repository.createQueryBuilder('des')
        .select([
          'des.id as "id"',
          'des.nome as "nome"',
          'des.descricao as "descricao"',
        ])
        .where('des.id = :id', { id })
        .getRawOne()

      if (typeof destiladosPrincipais === 'undefined') {
        return noContent()
      }

      return ok(destiladosPrincipais)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update({
    id,
    nome,
    descricao,
  }: IDestiladoPrincipalDTO): Promise<HttpResponse> {
    const destiladosPrincipais = await this.repository.findOne(id)

    if (!destiladosPrincipais) {
      return notFound()
    }

    const newdestiladoPrincipal = this.repository.create({
      id,
      nome,
      descricao,
    })

    try {
      await this.repository.save(newdestiladoPrincipal)

      return ok(newdestiladoPrincipal)
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

export { DestiladoPrincipalRepository }