import { HttpResponse } from "@shared/helpers";
import { IGrupoDTO } from "../dtos/i-grupo-dto";
import { IGrupoRepository } from "../repositories/i-grupo-repository";

class GrupoRepositoryInMemory implements IGrupoRepository {
  create(data: IGrupoDTO): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  list(search: string, page: number, rowsPerPage: number, order: string, filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  select(filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  idSelect(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  count(search: string, filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  update(data: IGrupoDTO): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  multiDelete(ids: string[]): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }

}

export { GrupoRepositoryInMemory }