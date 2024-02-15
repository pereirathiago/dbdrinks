import { IDrinkRepository } from "@modules/drinks/repositories/i-drink-repository";
import { HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers";
import { Brackets, Repository, getRepository } from "typeorm";
import { Drink } from "../entities/drink";
import { IDrinkDTO } from "@modules/drinks/dtos/i-drink-dto";
import { AppError } from "@shared/errors/app-error";

class DrinkRepository implements IDrinkRepository {
  private repository: Repository<Drink>

  constructor() {
    this.repository = getRepository(Drink)
  }


  // create
  async create({
    tipoId,
    categoriaId,
    copoTacaId,
    destiladoPrincipalId,
    grupoId,
    nome,
    descricao,
  }: IDrinkDTO): Promise<HttpResponse> {
    const drink = this.repository.create({
      nome,
      descricao,
      categoriaId,
      copoTacaId,
      destiladoPrincipalId,
      tipoId,
      grupoId,
    })

    const result = await this.repository.save(drink)
      .then(drinkResult => {
        return ok(drinkResult)
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
      let query = this.repository.createQueryBuilder('dri')
        .select([
          'dri.id as "id"',
          'dri.nome as "nome"',
          'dri.descricao as "descricao"',
          'dri.tipoId as "tipoId"',
          'tip.nome as "tipoNome"',
          'dri.categoriaId as "categoriaId"',
          'cat.nome as "categoriaNome"',
          'dri.copoTacaId as "copoTacaId"',
          'cop.nome as "copoTacaNome"',
          'dri.destiladoPrincipalId as "destiladoPrincipalId"',
          'des.nome as "destiladoPrincipalNome"',
          'dri.grupoId as "grupoId"',
          'gru.nome as "grupoNome"',
        ])
        .leftJoin('tipos', 'tip', 'tip.id = dri.tipoId')
        .leftJoin('categorias', 'cat', 'cat.id = dri.categoriaId')
        .leftJoin('copos_tacas', 'cop', 'cop.id = dri.copoTacaId')
        .leftJoin('destilados_principais', 'des', 'des.id = dri.destiladoPrincipalId')
        .leftJoin('grupos', 'gru', 'gru.id = dri.grupoId')

      if (filter) {
        query = query
          .where(filter)
      }

      const drinks = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(dri.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('dri.nome', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(drinks)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select(filter: string): Promise<HttpResponse> {
    try {
      const drink = await this.repository.createQueryBuilder('dri')
        .select([
          'dri.id as "value"',
          'dri.nome as "label"',
        ])
        .where('dri.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('dri.nome')
        .getRawMany()

      return ok(drink)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const drinks = await this.repository.createQueryBuilder('dri')
        .select([
          'dri.id as "value"',
          'dri.nome as "label"',
        ])
        .where('dri.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(drinks)
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
      let query = this.repository.createQueryBuilder('dri')
        .select([
          'dri.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const drink = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(dri.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: drink.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const drinks = await this.repository.createQueryBuilder('dri')
        .select([
          'dri.id as "id"',
          'dri.nome as "nome"',
          'dri.descricao as "descricao"',
          'dri.tipoId as "tipoId"',
          'tip.nome as "tipoNome"',
          'dri.categoriaId as "categoriaId"',
          'cat.nome as "categoriaNome"',
          'dri.copoTacaId as "copoTacaId"',
          'cop.nome as "copoTacaNome"',
          'dri.destiladoPrincipalId as "destiladoPrincipalId"',
          'des.nome as "destiladoPrincipalNome"',
          'dri.grupoId as "grupoId"',
          'gru.nome as "grupoNome"',
        ])
        .leftJoin('tipos', 'tip', 'tip.id = dri.tipoId')
        .leftJoin('categorias', 'cat', 'cat.id = dri.categoriaId')
        .leftJoin('copos_tacas', 'cop', 'cop.id = dri.copoTacaId')
        .leftJoin('destilados_principais', 'des', 'des.id = dri.destiladoPrincipalId')
        .leftJoin('grupos', 'gru', 'gru.id = dri.grupoId')
        .where('dri.id = :id', { id })
        .getRawOne()

      if (typeof drinks === 'undefined') {
        return noContent()
      }

      return ok(drinks)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update({
    id,
    tipoId,
    categoriaId,
    copoTacaId,
    destiladoPrincipalId,
    grupoId,
    nome,
    descricao,
  }: IDrinkDTO): Promise<HttpResponse> {
    const drinks = await this.repository.findOne(id)

    if (!drinks) {
      return notFound()
    }

    const newdrink = this.repository.create({
      id,
      tipoId,
      categoriaId,
      copoTacaId,
      destiladoPrincipalId,
      grupoId,
      nome,
      descricao,
    })

    try {
      await this.repository.save(newdrink)

      return ok(newdrink)
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

export { DrinkRepository }