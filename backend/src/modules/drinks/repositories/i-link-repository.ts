import { HttpResponse } from "@shared/helpers";
import { ILinkDTO } from "../dtos/i-link-dto";

interface ILinkRepository {
  // create
  create(data: ILinkDTO): Promise<HttpResponse>

  // list
  list(
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
  ): Promise<HttpResponse>
 
  // select
  select(filter: string): Promise<HttpResponse>

  // id select
  idSelect(id: string): Promise<HttpResponse>

  // count
  count(search: string, filter: string): Promise<HttpResponse>

  // get
  get(id: string): Promise<HttpResponse>

  // update
  update(data: ILinkDTO): Promise<HttpResponse>

  // delete
  delete(id: string): Promise<HttpResponse>

  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse>
}

export { ILinkRepository }