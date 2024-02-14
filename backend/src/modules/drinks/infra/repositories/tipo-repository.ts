import { ITipoRepository } from "@modules/drinks/repositories/i-tipo-repository";
import { HttpResponse, ok, serverError } from "@shared/helpers";
import { Brackets, Repository, getRepository } from "typeorm";
import { Tipo } from "../entities/tipo";
import { ITipoDTO } from "@modules/drinks/dtos/i-tipo-dto";

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
  select(filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // id select
  idSelect(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // count
  count(search: string, filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // get
  get(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // update
  update(data: ITipoDTO): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // delete
  delete(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }

}

export { TipoRepository }