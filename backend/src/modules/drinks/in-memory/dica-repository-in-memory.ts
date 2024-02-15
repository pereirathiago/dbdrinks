import { HttpResponse } from "@shared/helpers";
import { IDicaDTO } from "../dtos/i-dica-dto";
import { IDicaRepository } from "../repositories/i-dica-repository";

class DicaRepositoryInMemory implements IDicaRepository {
  create(data: IDicaDTO): Promise<HttpResponse> {
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
  update(data: IDicaDTO): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  multiDelete(ids: string[]): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }

}

export { DicaRepositoryInMemory }