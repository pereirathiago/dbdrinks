import { HttpResponse } from '@shared/helpers'
import { ITermoUsoDTO } from '../dtos/i-termo-uso-dto'

interface ITermoUsoRepository {
  // create
  create(data: ITermoUsoDTO): Promise<HttpResponse>

  // list
  list(
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter?: string
  ): Promise<HttpResponse>

  // count
  count(search: string, filter?: string): Promise<HttpResponse>

  // getById
  getById(id: string): Promise<HttpResponse>

  // getByEmail
  getByEmail(email: string): Promise<HttpResponse>
}

export { ITermoUsoRepository }
