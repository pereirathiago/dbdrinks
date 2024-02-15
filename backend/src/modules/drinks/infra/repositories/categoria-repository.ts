import { ICategoriaRepository } from "@modules/drinks/repositories/i-categoria-repository";
import { HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers";
import { Brackets, Repository, getRepository } from "typeorm";
import { Categoria } from "../entities/categoria";
import { ICategoriaDTO } from "@modules/drinks/dtos/i-categoria-dto";
import { AppError } from "@shared/errors/app-error";

class CategoriaRepository implements ICategoriaRepository {
  private repository: Repository<Categoria>

  constructor() {
    this.repository = getRepository(Categoria)
  }


  // create
  async create({
    nome,
    descricao,
  }: ICategoriaDTO): Promise<HttpResponse> {
    const categoria = this.repository.create({
      nome,
      descricao,
    })

    const result = await this.repository.save(categoria)
      .then(categoriaResult => {
        return ok(categoriaResult)
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
      let query = this.repository.createQueryBuilder('cat')
        .select([
          'cat.id as "id"',
          'cat.nome as "nome"',
          'cat.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const categorias = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cat.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('cat.nome', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(categorias)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select(filter: string): Promise<HttpResponse> {
    try {
      const categoria = await this.repository.createQueryBuilder('cat')
        .select([
          'cat.id as "value"',
          'cat.nome as "label"',
        ])
        .where('cat.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('cat.nome')
        .getRawMany()

      return ok(categoria)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const categorias = await this.repository.createQueryBuilder('cat')
        .select([
          'cat.id as "value"',
          'cat.nome as "label"',
        ])
        .where('cat.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(categorias)
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
      let query = this.repository.createQueryBuilder('cat')
        .select([
          'cat.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const categoria = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cat.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: categoria.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const categorias = await this.repository.createQueryBuilder('cat')
        .select([
          'cat.id as "id"',
          'cat.nome as "nome"',
          'cat.descricao as "descricao"',
        ])
        .where('cat.id = :id', { id })
        .getRawOne()

      if (typeof categorias === 'undefined') {
        return noContent()
      }

      return ok(categorias)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update({
    id,
    nome,
    descricao,
  }: ICategoriaDTO): Promise<HttpResponse> {
    const categorias = await this.repository.findOne(id)

    if (!categorias) {
      return notFound()
    }

    const newcategoria = this.repository.create({
      id,
      nome,
      descricao,
    })

    try {
      await this.repository.save(newcategoria)

      return ok(newcategoria)
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

export { CategoriaRepository }