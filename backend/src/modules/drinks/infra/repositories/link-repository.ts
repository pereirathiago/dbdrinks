import { ILinkRepository } from "@modules/drinks/repositories/i-link-repository";
import { HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers";
import { Brackets, Repository, getRepository } from "typeorm";
import { Link } from "../entities/link";
import { ILinkDTO } from "@modules/drinks/dtos/i-link-dto";
import { AppError } from "@shared/errors/app-error";

class LinkRepository implements ILinkRepository {
  private repository: Repository<Link>

  constructor() {
    this.repository = getRepository(Link)
  }


  // create
  async create({
    drinkId,
    link,
  }: ILinkDTO): Promise<HttpResponse> {
    const linkC = this.repository.create({
      drinkId,
      link,
    })

    const result = await this.repository.save(linkC)
      .then(linkResult => {
        return ok(linkResult)
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
      "link",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('dic')
        .select([
          'dic.id as "id"',
          'dic.link as "link"',
          'dic.drinkId as "drinkId"',
          'dri.nome as "drinkNome"',
        ])
        .leftJoin('drinks', 'dri', 'dri.id = dic.drinkId')

      if (filter) {
        query = query
          .where(filter)
      }

      const links = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(dic.link AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(dri.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('dic.link', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(links)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select(filter: string): Promise<HttpResponse> {
    try {
      const link = await this.repository.createQueryBuilder('dic')
        .select([
          'dic.id as "value"',
          'dic.link as "label"',
        ])
        .where('dic.link ilike :filter', { filter: `${filter}%` })
        .addOrderBy('dic.link')
        .getRawMany()

      return ok(link)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const links = await this.repository.createQueryBuilder('dic')
        .select([
          'dic.id as "value"',
          'dic.link as "label"',
        ])
        .where('dic.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(links)
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

      const link = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(dic.link AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(dri.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: link.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const links = await this.repository.createQueryBuilder('dic')
        .select([
          'dic.id as "id"',
          'dic.link as "link"',
          'dic.drinkId as "drinkId"',
          'dri.nome as "drinkNome"',
        ])
        .leftJoin('drinks', 'dri', 'dri.id = dic.drinkId')
        .where('dic.id = :id', { id })
        .getRawOne()

      if (typeof links === 'undefined') {
        return noContent()
      }

      return ok(links)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update({
    id,
    drinkId,
    link,
  }: ILinkDTO): Promise<HttpResponse> {
    const links = await this.repository.findOne(id)

    if (!links) {
      return notFound()
    }

    const newlink = this.repository.create({
      id,
      drinkId,
      link,
    })

    try {
      await this.repository.save(newlink)

      return ok(newlink)
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

export { LinkRepository }